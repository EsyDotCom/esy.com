#!/usr/bin/env node
/**
 * Upload a finished film release (HLS ladder, captions, 4K master) to R2 under
 * films/<slug>/<folder>/<release>/ (folder "film" by default; "social" for the
 * social kit), served at https://images.esy.com/. Files are
 * cached for a year, so every release gets its own folder; point the film's
 * `film.media` at the new one after uploading. Files over 64 MB go up in parts.
 * The .mp4 master is served as a download (Content-Disposition: attachment);
 * --attach=all serves every file outside hls/ that way (images still show in <img>).
 * Usage: node scripts/r2-upload-film-release.mjs --slug=the-letter-with-no-address --release=v1 --dir=<release dir> [--folder=social] [--attach=all] [--dry]
 */

import { readFileSync, existsSync, readdirSync, statSync, openSync, readSync, closeSync } from "fs";
import path from "path";
import { S3Client, PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

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
const slug = String(args.slug || ""), release = String(args.release || ""), dir = path.resolve(String(args.dir || ""));
const folder = String(args.folder || "film"), attachAll = args.attach === "all";
const dry = args.dry === true || args.dry === "true";
if (!slug || !/^v\d+$/.test(release) || !/^[a-z]+$/.test(folder) || !existsSync(dir)) {
  console.error("Usage: node scripts/r2-upload-film-release.mjs --slug=<film> --release=v<N> --dir=<release dir>");
  process.exit(1);
}

const TYPES = { ".m3u8": "application/vnd.apple.mpegurl", ".m4s": "video/iso.segment", ".mp4": "video/mp4", ".vtt": "text/vtt; charset=utf-8", ".srt": "application/x-subrip; charset=utf-8", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".zip": "application/zip" };
const walk = (d) => readdirSync(d).flatMap((n) => { const p = path.join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dir).filter((f) => !path.basename(f).startsWith("."));
const s3 = new S3Client({ region: "auto", endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });
const Bucket = process.env.R2_BUCKET, PART = 64 * 1024 * 1024;

async function putLarge(file, Key, extra) {
  const { UploadId } = await s3.send(new CreateMultipartUploadCommand({ Bucket, Key, ...extra }));
  const size = statSync(file).size, fd = openSync(file, "r"), parts = [];
  try {
    for (let n = 1, off = 0; off < size; n++, off += PART) {
      const len = Math.min(PART, size - off), buf = Buffer.alloc(len); readSync(fd, buf, 0, len, off);
      const { ETag } = await s3.send(new UploadPartCommand({ Bucket, Key, UploadId, PartNumber: n, Body: buf }));
      parts.push({ ETag, PartNumber: n }); process.stdout.write(`  ${Key} ${Math.round((100 * (off + len)) / size)}%\r`);
    }
    await s3.send(new CompleteMultipartUploadCommand({ Bucket, Key, UploadId, MultipartUpload: { Parts: parts } })); console.log();
  } catch (e) { await s3.send(new AbortMultipartUploadCommand({ Bucket, Key, UploadId })); throw e; } finally { closeSync(fd); }
}

let bytes = 0;
for (const f of files) {
  const rel = path.relative(dir, f).split(path.sep).join("/");
  const Key = `films/${slug}/${folder}/${release}/${rel}`, size = statSync(f).size; bytes += size;
  const extra = { ContentType: TYPES[path.extname(f)] || "application/octet-stream" };
  if (!rel.startsWith("hls/") && (attachAll || path.extname(f) === ".mp4")) extra.ContentDisposition = `attachment; filename="${path.basename(f)}"`;
  if (dry) { console.log("dry", Key, extra.ContentType, size); continue; }
  if (size > PART) await putLarge(f, Key, extra);
  else await s3.send(new PutObjectCommand({ Bucket, Key, Body: readFileSync(f), ...extra }));
}
console.log(`${dry ? "Would upload" : "Uploaded"} ${files.length} files, ${(bytes / 1e6).toFixed(1)} MB → https://images.esy.com/films/${slug}/${folder}/${release}/`);
