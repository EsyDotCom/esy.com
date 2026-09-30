# Films: sound and mix

Every Esy film's soundtrack is checked against one standard before it ships:
the **Sound and Mix** doc, linked from each film page's press kit
("Every file behind the film"). It holds the research on how loud a film for
young children should be, the targets, how the mix is built and measured,
the traps we hit, and the numbers for every mix pass.

| Check | Target |
| --- | --- |
| Whole-mix loudness | −16 ±1 LUFS (AES71, one master for the web and YouTube) |
| True peak | at or below −1 dBTP |
| Dialogue over music, on average | at least 10 LU |
| Music under every single line | at least 18 LU below (15 for ages 3–7, plus 3 for home noise) |
| Effects under a line | at least 18 LU below; 10 for hits placed between words |
| 3-second windows | none with speech under the background |
| Sung vocals under dialogue | none |

## The tools

A pass is always: measure, plan, measure again. Any change to the lines, their
timing or the transitions needs a new pass.

- `scripts/films/film-loudness-meter.mjs` renders the soundtrack offline exactly
  as the animatic player schedules it, then prints one JSON record: integrated
  loudness (BS.1770), true peak, each line against the music and effects, and
  3-second windows. It needs Playwright: set `PLAYWRIGHT_MODULE` to an installed
  copy's `index.mjs`.
- `scripts/films/film-mix-plan.py` reads that record and rewrites the levels in
  the film's `timeline.json`: soft lines lifted, the music dipped under each
  short line, effects lowered under speech. The master level is set by hand in
  `timeline.mix.master`. There is no limiter, because the browser's compressor
  adds its own make-up gain.

```
PLAYWRIGHT_MODULE=…/node_modules/playwright/index.mjs \
  node scripts/films/film-loudness-meter.mjs public/films/<slug>/animatic > pass.json
python3 scripts/films/film-mix-plan.py pass.json public/films/<slug>/animatic/timeline.json
```

The media folder is the local copy of the animatic (gitignored). The published
copy is on R2 under `films/<slug>/animatic/<cut>/`, uploaded with
`scripts/r2-upload-film-media.mjs`.

## The record

`the-letter-with-no-address/mix-passes/` holds the meter's output for all 13
passes of the first film, 27–28 Sep 2026, in order: the first mix, three
passes and the final; then new transitions, the "Welcome home" line and the
rename to Lullo, each broken by the change and restored by a re-plan. The last
file is the cut that shipped: −16.7 LUFS, −1.14 dBTP, every line at least
18 LU over the music.
