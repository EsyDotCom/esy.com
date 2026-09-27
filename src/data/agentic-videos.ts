export interface WorkflowStage {
  label: string;
  sublabel: string;
}

// The Agentic Engineer merges the former /research and /learn registries. The
// three research categories remain the primary shelves, but category is a plain
// string so tutorials published from the esy-learn publication (which use
// free-form categories) interleave without a type change.
export interface AgenticVideo {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  durationSeconds: number;
  publishedAt: string;
  muxPlaybackId: string;
  thumbnailUrl?: string;
  transcript?: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
  templateSlug?: string;
  stages?: WorkflowStage[];
}

export const agenticVideos: AgenticVideo[] = [
  // The first image-led article (2026-09-27): no video of its own, so it gets
  // the image-led page (E · Cover Bar) with its generated cover as the
  // background; the video it's about is embedded in the body. Based on the
  // SEOPage case study at seopage.com/rank/how-we-made-our-explainer-video,
  // which it links to. Cover by scripts/generate-article-images.mjs.
  {
    slug: "how-we-made-our-explainer-video-in-code",
    title: "How We Made Our Explainer Video in Code",
    description:
      "SEOPage's 75-second explainer, made in one working session: research before a single frame, the real product as the demo in Remotion, AI voice and sound leveled by measurement, three cuts from one timeline, and the five things that broke.",
    category: "ai-tools",
    categoryLabel: "AI Coding Tools",
    durationSeconds: 0,
    publishedAt: "2026-09-27",
    muxPlaybackId: "",
    thumbnailUrl: "/images/articles/how-we-made-our-explainer-video-in-code/cover-nora-phone.webp",
    transcript: "",
    content: `We needed one video that explains SEOPage to the people it's for: plumbers, roofers, HVAC owners. Seventy-five seconds, with sound that means something in every second of it. We made it in one working session, and we built it in code: the scenes, the camera, the cursor, the captions, and three different cuts from one timeline.

Here's the finished video. Below it is how it was made, and the five things that went wrong on the way.

<div class="ai-embed"><iframe src="https://www.youtube-nocookie.com/embed/gB9rg92S6ZA" title="SEOPage explainer: Why ChatGPT recommends your competitor (and how to fix it)" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

## Research before a single frame

Before writing a line of script, we looked at what the numbers say about short video in a feed:

- Videos under a minute keep about **half** their viewers.
- The first **three seconds** carry up to 47% of an ad's value (Meta and Nielsen).
- **75%** of Meta Reels views now have the sound on. The old "85% watch muted" figure is from 2016.
- People are **80% more likely** to finish a video with captions.

That set the brief: short, a hook in the first seconds, a real soundtrack, and captions everywhere. Then we wrote three proposals instead of one. **A** was a story, "Nora's evening". **B** was product motion with music and no voice. **C** was a founder-led screen recording. We picked A, because a story explains both *why* and *how* to someone who isn't technical, and the other two only manage one of those.

## The script is the homepage

The video follows the SEOPage homepage beat for beat, so the video and the page tell the same story:

| Time | What happens |
|---|---|
| 0\\:00 | An AI assistant names a competitor. |
| 0\\:05 | Nora, the plumber, reacts. |
| 0\\:11 | The stakes: 45% of US consumers now use AI to find a local business (BrightLocal, 2026). |
| 0\\:21 | The four steps of the builder. |
| 0\\:50 | Proof, from our own sites. |
| 0\\:58 | The goal: a phone call that starts with "I found you on ChatGPT". |
| 1\\:04 | The offer, and the end card. |

It stays honest on screen. Nora is labeled as an illustration, the competitor and the AI assistant are generic, and the proof is labeled as our own sites, not client results.

![The first five seconds: an AI assistant recommends someone else's plumbing business](/images/articles/how-we-made-our-explainer-video-in-code/hook.jpg)

## The product is the demo

The video is built in Remotion, a framework that renders video from React components. That matters for a product explainer, because the screens in the video are the real interface, not a mockup of it. A virtual camera pushes into whichever part of the builder the narration is talking about, and an animated cursor clicks the actual fields.

Code also means you can be wrong in measurable ways. In the first render, the pointer missed the fields it was meant to click by about 50 pixels. It looked fine in the preview, and you only see it on a still frame.

![The builder's Score step, with the virtual camera framing the checklist](/images/articles/how-we-made-our-explainer-video-in-code/builder-score.jpg)

## Sound in every second

Everything you hear was generated: the voice from the script, and the effects and score from written descriptions.

- **13 voice lines**, 156 words, from ElevenLabs.
- **33 sound effects**, placed on 86 timed cues.
- A **75-second score**, described by its arc: tense, then hopeful, a drive through the demo, then a resolve.

The files came back at wildly different volumes: from -3 to -45 LUFS (a measure of how loud audio sounds to a listener), a 42 dB spread. Mixing them as they arrived would have buried the voice in places and blasted the effects in others. So we measured every file and leveled each one to the voice before mixing anything. In the final mix, the score sits about 18 dB under the voice whenever someone is speaking. The finished file is -14 LUFS, and its loudest instant peaks at -1 dBTP, just under the point where audio distorts.

## One timeline, three cuts

The same 75 seconds ship three ways:

| Where | Shape | Captions |
|---|---|---|
| YouTube | Wide, 16\\:9 | A separate file, so viewers can turn them on or off. |
| LinkedIn and X | Wide, 16\\:9 | Burned in, because those feeds autoplay muted. |
| Reels, TikTok and Shorts | Tall, 9\\:16 | Burned in, and kept out of the zones the apps cover with their own buttons: the bottom 35% and the top 14%, per Meta. |

The first vertical render put captions right over the text already on screen. The fix was to place captions only where nothing else is written.

<div class="ai-phone"><img src="/images/articles/how-we-made-our-explainer-video-in-code/vertical.jpg" alt="The vertical cut on a phone, with captions placed clear of the on-screen text"></div>

## Pick the thumbnail at phone size

We made three thumbnails and judged them at 170 pixels wide, which is how big they appear in a phone feed:

- **A**: Nora shocked, "AI picked THEM".
- **B**: Nora on the phone, "Get named by ChatGPT".
- **C**: a before-and-after split.

A won. It reads instantly at phone size, and it matches the first five seconds of the video. That matters because YouTube judges a thumbnail by the watch time it leads to, not just the clicks. The thumbnail shows the problem and the title answers it: "Why ChatGPT Recommends Your Competitor (and How to Fix It)".

![The three thumbnails at desktop and phone size](/images/articles/how-we-made-our-explainer-video-in-code/thumbnails-feed.jpg)

## What broke, and how we caught it

Five things went wrong, and most of them hid in the preview:

1. **The pointer missed by about 50 pixels.** Caught on still frames.
2. **A one-second black gap** between the demo and the proof. Caught in the finished file, not the preview.
3. **Audio 42 dB apart.** Caught by measuring, not listening.
4. **Vertical captions over on-screen text.** Caught on a contact sheet of frames.
5. **An API key mix-up**: a key ID where the actual key belonged.

The lesson carries well beyond video. Check the output the way people will actually see it: the finished file, at phone size, in the feed, with the sound on. The preview is where these mistakes hide.

## What we don't know yet

The video went out while this was being written, so the results aren't in. We're watching the thumbnail's click-through rate, how many viewers are still there at three seconds and at the end, which thumbnail wins, and how many people start building a page after watching.

The full case study, with the complete transcript, is on SEOPage: [How we made our explainer video](https://seopage.com/rank/how-we-made-our-explainer-video).`,
    tags: ["remotion", "video", "elevenlabs", "ai-audio", "seopage"],
    relatedSlugs: ["building-multi-agent-workflows-claude-code", "cursor-workflow-patterns-production"],
  },
  // First entry in the models category — fast take on launch day; the deep-dive
  // evaluation is a separate, later video.
  {
    slug: "claude-fable-5-first-impressions",
    title:
      "First Impressions: A Peek into Claude Fable 5 and Claude Mythos Docs",
    description:
      "A launch-day read-through of Anthropic's Claude Fable 5 and Mythos 5 announcement — the first generally available Mythos-class model, its classifier safeguards with Opus 4.8 fallback, pricing, and what the release signals for long-horizon agentic work.",
    category: "models",
    categoryLabel: "Model Research",
    durationSeconds: 911,
    publishedAt: "2026-06-09",
    muxPlaybackId: "V1CRTb02JJzYgaKpwZnlLDK5M58P6CPa00rl5A2u8dekg",
    transcript: "",
    content: `Anthropic shipped Claude Fable 5 and Claude Mythos 5 today, and this video is exactly what it sounds like: a first scroll through the announcement on launch day, reacting to what's actually in it. This is not a deep dive — no benchmarks of my own, no workflow runs yet. It's a read of what Anthropic is claiming, what's structurally new about this release, and what I want to test next.

## What Was Announced

Fable 5 is the first Mythos-class model — Anthropic's new tier above Opus — made generally available. The headline claims: state-of-the-art on nearly every tested benchmark, with the lead growing as tasks get longer and more complex. Mythos 5 is the same underlying model with cyber safeguards lifted, restricted to Project Glasswing partners and, soon, a trusted access program.

The naming footnote is worth a pause: Fable is from the Latin *fabula*, akin to the Greek *mythos*. Same model, two names — the safeguards are the only difference, and that's the most interesting design decision in the whole release.

## The Safeguard Architecture

Instead of refusing flagged requests, Fable 5 falls back: when classifiers detect cybersecurity, biology/chemistry, or distillation-related queries, the response is handled by Claude Opus 4.8 and the user is told it happened. Anthropic says fallback triggers in under 5% of sessions, and that for the other 95%+ Fable 5's performance is effectively Mythos 5's.

Graceful degradation to a still-frontier model is a much better failure mode than a refusal wall — but it makes "which model actually answered me" a real provenance question for anyone building on the API.

## Claims That Stood Out

- **Software engineering:** Stripe reports a codebase-wide migration in a 50-million-line Ruby codebase done in a day versus an estimated two-plus team-months. Cursor calls it state of the art on CursorBench; Cognition says it tops FrontierBench.
- **Vision:** rebuilding a web app's source from screenshots alone, and beating Pokémon FireRed with a minimal vision-only harness where earlier models needed elaborate scaffolding.
- **Memory and long-context:** persistent file-based memory improved its Slay the Spire performance three times more than it did for Opus 4.8 — directly relevant to long-running agentic workflows.
- **Science (Mythos 5):** ~10x acceleration claims in protein design tasks and novel hypotheses preferred ~80% of the time over Opus-class output in blinded comparisons.

## Pricing and Rollout

$10 per million input tokens, $50 per million output — less than half of Mythos Preview. Subscription access is staged: included on paid plans through June 22, then moved to usage credits until capacity allows restoring it. There's also a new 30-day retention requirement on all Mythos-class traffic, which enterprise users will want to read closely.

## What I Want to Test

The claims that matter for Esy are the long-horizon ones: token efficiency at medium effort, memory-assisted multi-step runs, and whether the classifier fallback ever trips on benign workflow-engineering prompts. That's the follow-up deep dive.`,
    tags: [
      "claude-fable-5",
      "anthropic",
      "first-impressions",
      "frontier-models",
      "model-research",
    ],
    relatedSlugs: [
      "chatgpt-images-2-vs-nano-banana-2",
      "building-multi-agent-workflows-claude-code",
      "cursor-workflow-patterns-production",
    ],
  },
  {
    slug: "generate-clip-art-asset-walkthrough",
    title: "How to Run the Generate Clip Art Asset Workflow in Esy",
    description:
      "A 3-minute walkthrough of the Generate Clip Art Asset workflow template — picking a style, writing the prompt, running it, and reviewing the artifact Esy produces from prompt to background-removed, stored asset.",
    category: "workflows",
    categoryLabel: "Workflow Research",
    durationSeconds: 180,
    publishedAt: "2026-06-08",
    muxPlaybackId: "rRhztXLYxf8vxtIM7zMF4BUFSqrsS02nMDLAyEkW02QOU",
    transcript: "",
    // Pipeline stages mirror the canonical MVP template: prompt-to-image,
    // background removal, internal storage, then human review. No research step.
    stages: [
      { label: "Intake", sublabel: "Subject + style + aspect ratio" },
      { label: "Generate", sublabel: "OpenAI or Gemini image" },
      { label: "Clean Up", sublabel: "fal.ai background removal" },
      { label: "Store", sublabel: "Esy R2 artifact" },
      { label: "Review", sublabel: "Artifact detail + cost" },
    ],
    content: `Generate Clip Art Asset is the first real generation workflow in Esy — and it's the simplest place to see the whole platform loop in action. You give it a subject and a style, it produces a transparent-background clip art asset, and Esy keeps the full record: the prompt you wrote, the prompt it actually sent the provider, the model stack, the storage location, and the cost. This walkthrough shows you how to run it end to end in about three minutes.

## What This Template Does

Generate Clip Art Asset is a direct prompt-to-image workflow. There's no research step, no citations, no sources — it takes your intent, resolves a clean clip-art prompt, generates an image, removes the background, and stores the result as an Esy artifact you can review. If you've used clip.art's prompt builder, the intake will feel familiar; the difference is that Esy owns the artifact, the provenance, and the cost from the moment you hit run.

## Step 1: Start a Run

From the dashboard, pick the Generate Clip Art Asset template and start a new run. The intake form asks for what you want, not how to make it:

- **Subject** — what the asset is (a cat, a teacher, a rocket)
- **Action** — what it's doing (standing, waving, sleeping)
- **Style** — the visual treatment (more on this below)
- **Aspect ratio** — usually 1\\:1 for clip art
- **Extras** — any freeform detail you want to add

Esy stores both your original intent and the final resolved prompt it sends the provider. That distinction matters later when you're debugging why an asset came out the way it did.

## Step 2: Pick a Style

The style descriptor is the single biggest lever on the output. The template ships with the clip-art style contract:

- **flat** — flat vector, bold outlines, clean shapes, solid colors
- **outline** — minimal outline, thin clean lines, monochrome
- **cartoon** — bold colors, expressive, friendly
- **sticker** — thick outline, vibrant colors, cute
- **kawaii** — super cute, pastel colors, rounded shapes
- **watercolor**, **chibi**, **pixel**, **vintage**, **3d**, **doodle**

Under the hood, Esy assembles the final prompt as \`{your prompt}. Style: {style descriptor}, clip art, isolated object, transparent background, no background\`. You write the idea; the template handles the clip-art contract.

## Step 3: Run It

When you submit, the run executes the runtime policy:

1. **Generate** — the resolved prompt goes to the image provider (OpenAI or Gemini)
2. **Background removal** — the raw output passes through fal.ai to isolate the subject
3. **Store** — both the raw and processed images land in Esy's R2 storage
4. **Artifact** — Esy creates an artifact record linking the run, the images, the resolved prompt, the model stack, and the cost

You don't manage any of those steps. The template's runtime policy decides the provider chain, quality, and background handling — and records every resolved choice on the run.

## Step 4: Review the Artifact

The artifact detail page is where it comes together. You'll see the generated image, the prompt you wrote next to the prompt Esy actually sent, which model produced it, the storage URL, the review state, and the estimated cost broken down by step. Nothing publishes automatically — this MVP keeps every generation internal until it's reviewed. Publishing to clip.art or anywhere else is a separate, later decision.

## Why It's Built This Way

The point of running everything through a template — even for something as simple as a single clip-art image — is provenance and cost. Every run captures what was asked, what was produced, which providers touched it, and what it cost. That's the foundation the rest of Esy's workflows build on, and Generate Clip Art Asset is the smallest complete example of it.`,
    tags: [
      "clip-art",
      "workflow-template",
      "image-generation",
      "app-esy-com",
      "getting-started",
    ],
    relatedSlugs: [
      "chatgpt-images-2-vs-nano-banana-2",
    ],
  },
  {
    slug: "chatgpt-images-2-vs-nano-banana-2",
    title: "ChatGPT Images 2.0: A Monster Upgrade for Educational Artifacts",
    description:
      "A side-by-side look at ChatGPT Images 2.0 and Nano Banana 2 (Gemini 3.1 Flash Image) across clipart with text, illustrations, infographics, and character reference sheets — and where each fits inside an automated educational artifact pipeline.",
    category: "models",
    categoryLabel: "Model Research",
    durationSeconds: 302,
    publishedAt: "2026-05-09",
    muxPlaybackId: "eP00jTf5EJA01KwF01lVNn3LpzepxPmJ9V00dXY5sGGCIMg",
    transcript: "",
    content: `Two weeks ago, OpenAI released its biggest update of the year — and a real shift forward for AI image generation. Clearly the most significant release since Nano Banana 2 (Gemini 3.1 Flash Image) dropped earlier this year. NB2 set the bar with its powerful editing capabilities and text accuracy, which bumped the quality and detail of educational infographics you could produce — hence their mass circulation on X in recent months. My first impression of ChatGPT Images 2.0 is that it beats NB2 on both fronts. In this piece, we'll compare and explore the differences between each, their pros and cons and how each perform as components within a larger agentic workflow to produce reliable educational artifacts. Using examples such as clipart vectors with text, illustrations, infographics, and character reference sheets for animations we'll dive deep with examples and assess where each is optimal within an automated content generation pipeline.`,
    tags: [
      "chatgpt-images-2",
      "nano-banana-2",
      "gemini",
      "image-generation",
      "agentic-workflows",
    ],
    relatedSlugs: [
      "claude-fable-5-first-impressions",
      "building-multi-agent-workflows-claude-code",
    ],
  },
  {
    slug: "building-multi-agent-workflows-claude-code",
    title: "Building Multi-Agent Workflows with Claude Code",
    description:
      "How I orchestrate 34 specialized agents to produce research artifacts at Esy — the architecture decisions, failure modes, and why single-LLM approaches break down at scale.",
    category: "ai-tools",
    categoryLabel: "AI Coding Tools",
    durationSeconds: 720,
    publishedAt: "2026-02-20",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Building a production workflow engine on top of LLMs sounds straightforward until you try it. A single prompt chain works for demos. It falls apart the moment you need reliable, cited, structured output across dozens of use cases. This is the story of how Esy's multi-agent architecture evolved from a single Claude API call to a 34-agent orchestration system — and what broke along the way.

## The Single-Agent Trap

Most AI coding tools start here: one model, one prompt, one output. It works beautifully for small tasks. But the moment you need an agent to research *and* outline *and* draft *and* cite — the context window becomes the bottleneck. Not because it runs out of tokens, but because the model loses focus. A 4,000-word essay prompt that includes research instructions, style guidelines, and citation rules produces mediocre output across every dimension.

## Why Multi-Agent

The insight is simple: specialization works. An agent dedicated to citation verification doesn't need to know anything about narrative structure. An agent that designs infographic layouts doesn't need to parse DOIs. By decomposing the workflow into discrete stages — Intake, Research, Outline, Draft, Cite & Format — each agent can be small, focused, and testable.

## The Architecture

Each workflow template at Esy maps to a pipeline of agents. The pipeline definition lives in a configuration file — not in code. This means adding a new workflow type (say, a grant proposal) doesn't require engineering work. It requires defining which agents participate and in what order.

## What Broke

Three things consistently broke during development:

1. **Agent handoff serialization** — passing structured data between agents without losing context or introducing hallucinations in the intermediate state
2. **Citation grounding** — ensuring the research agent's sources actually make it into the final artifact without being paraphrased into oblivion
3. **Error recovery** — when agent 4 of 6 fails, you can't just restart the pipeline. The cost (time + API credits) is too high. Partial recovery is essential.

## Lessons

The biggest lesson: treat agents like microservices, not like a conversation. They don't need to know about each other. They read from a shared state, do their job, write back. The orchestrator manages sequencing, retries, and validation between stages.`,
    tags: ["claude-code", "multi-agent", "architecture", "LLM orchestration"],
    relatedSlugs: [
      "cursor-workflow-patterns-production",
    ],
  },
  {
    slug: "cursor-workflow-patterns-production",
    title: "Cursor Workflow Patterns That Actually Ship to Production",
    description:
      "The specific Cursor workflows I use daily to build and ship Esy — from agent-assisted refactoring to test-driven component generation. No demos, only patterns that survived production.",
    category: "ai-tools",
    categoryLabel: "AI Coding Tools",
    durationSeconds: 540,
    publishedAt: "2026-02-15",
    muxPlaybackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs",
    transcript: "",
    content: `Every Cursor tutorial shows the same demo: "look, I typed a comment and it wrote the function." That's table stakes. This video covers the patterns I actually use to ship production code at Esy — patterns that work when the codebase is 50,000+ lines, the components are interconnected, and a wrong edit breaks the build.

## Pattern 1: Context-Bounded Refactoring

The key to using Cursor effectively in a large codebase is limiting the context window to exactly what matters. When refactoring a component, I explicitly include only:
- The component file
- Its direct imports
- The test file (if it exists)
- The type definitions it depends on

Including the entire directory kills output quality. The model starts "improving" code you didn't ask it to touch.

## Pattern 2: Test-First Component Generation

When building a new component, I write the test first — describing the expected behavior, props, and edge cases. Then I feed the test file to Cursor and ask it to implement the component that passes. The test file acts as a specification, not just a safety net.

## Pattern 3: Build-Error-Driven Iteration

After any significant edit, I run the build immediately. Cursor is remarkably good at fixing its own TypeScript errors and Next.js build failures when you feed it the error output. The workflow becomes: edit → build → fix → build → commit.

## What Doesn't Work

- **Asking Cursor to "improve" a file** — too vague, produces noise
- **Multi-file edits in one prompt** — model loses track of changes across files
- **Ignoring the build** — Cursor can write code that looks correct but fails SSR safety checks

## The Meta-Pattern

The overarching pattern: AI coding tools amplify your engineering judgment, they don't replace it. Every Cursor output goes through the same review I'd give a junior developer's PR. The speed gain comes from not typing boilerplate, not from skipping review.`,
    tags: ["cursor", "ai-coding", "developer-workflow", "production"],
    relatedSlugs: [
      "building-multi-agent-workflows-claude-code",
    ],
  },
];

export function getPublishedAgenticVideos(): AgenticVideo[] {
  return [...agenticVideos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAgenticVideoBySlug(
  slug: string
): AgenticVideo | undefined {
  return agenticVideos.find((v) => v.slug === slug);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
