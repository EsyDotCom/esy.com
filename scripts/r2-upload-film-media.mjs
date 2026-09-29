#!/usr/bin/env node
/**
 * Upload a film's animatic media (timeline.json, f/ stills, v/ clips, a/ sound)
 * to R2 under films/<slug>/animatic/<cut>/, served at https://images.esy.com/.
 * The bucket caches files for a year, so every cut gets its own folder; point
 * the film's `animaticMedia` at the new one after uploading.
 * Usage: node scripts/r2-upload-film-media.mjs --slug=the-letter-with-no-address --cut=v11 [--dry]
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import path from "path";
import mime from "mime-types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const envPath = path.resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [k, ...v] = t.split("=");
    if (k && !process.env[k]) process.env[k] = v.join("=").replace(/^["']|["']$/g, "");
  }
}

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.split("=")).map(([k, v]) => [k.replace(/^--/, ""), v ?? true]));
const slug = String(args.slug || "");
const cut = String(args.cut || "");
const dry = args.dry === true || args.dry === "true";
const root = path.resolve(`public/films/${slug}/animatic`);
if (!slug || !/^v\d+$/.test(cut) || !existsSync(root)) {
  console.error("Usage: node scripts/r2-upload-film-media.mjs --slug=<film> --cut=v<N> (media in public/films/<film>/animatic/)");
  process.exit(1);
}

const walk = (d) => readdirSync(d).flatMap((n) => { const p = path.join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root).filter((f) => !path.basename(f).startsWith("."));
const s3 = new S3Client({ region: "auto", endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });

let bytes = 0;
for (const f of files) {
  const rel = path.relative(root, f).split(path.sep).join("/");
  const key = `films/${slug}/animatic/${cut}/${rel}`;
  const body = readFileSync(f);
  bytes += body.length;
  if (dry) { console.log("dry", key); continue; }
  await s3.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key, Body: body, ContentType: mime.lookup(f) || "application/octet-stream" }));
}
console.log(`${dry ? "Would upload" : "Uploaded"} ${files.length} files, ${(bytes / 1e6).toFixed(1)} MB → https://images.esy.com/films/${slug}/animatic/${cut}/`);
