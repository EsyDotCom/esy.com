#!/usr/bin/env python3
# The film mix planner. Reads one meter measurement and rewrites the levels in
# the film's timeline so each shortfall is fixed by exactly its size. A pass is
# always: measure (film-loudness-meter.mjs), plan (this), measure again.
#
#   python3 scripts/films/film-mix-plan.py pass.json [timeline.json]
#   timeline defaults to public/films/the-letter-with-no-address/animatic/timeline.json
#
# Derive the mix from the measurement and the thresholds (see the Sound and Mix standard):
#  - music under each line: >= 18 LU below that line (15 LU children's margin + ~3 for home noise)
#  - effects under a line: >= 18 LU below it; word-synced hits placed in pauses (2.1): >= 10 LU
#  - soft/whispered lines: brought up to within 8 LU of the integrated dialogue level
#  - master level: set by hand in timeline.mix.master to -16 LUFS integrated, true peak <= -1 dBTP
#    (no limiter: the browser's compressor adds its own make-up gain)
import json, sys
TLP=sys.argv[2] if len(sys.argv)>2 else "public/films/the-letter-with-no-address/animatic/timeline.json"
TL=json.load(open(TLP)); M=json.load(open(sys.argv[1]))
MUSIC_LU, SFX_LU, SYNC_LU, SOFT_LU = 18.0, 18.0, 10.0, 8.0
dInt=M["integrated"]["dialogue"]; meas={(x["id"],x["file"]):x for x in M["perLine"]}
changes=[]
for s in TL["shots"]:
    for l in s["lines"]:
        x=meas.get((s["id"],l["file"]))
        if not x: continue
        g=g0=l.get("gain",1.0)                          # the gain the measurement was made with
        if x["d"] < dInt-SOFT_LU:                      # lift soft lines, keep the whisper's character
            up=(dInt-SOFT_LU)-x["d"]; g*=10**(up/20); changes.append((s["id"],"lift line",round(up,1)))
        l["gain"]=round(g,3)
        lift=20*__import__("math").log10(l["gain"]/g0)   # only what this pass added
        if x["overMusic"] is not None and x["overMusic"]+lift < MUSIC_LU:
            deficit=MUSIC_LU-(x["overMusic"]+lift); l["duck"]=round(max(0.02,(l.get("duck",0.13))*10**(-deficit/20)),4); changes.append((s["id"],"duck music",round(deficit,1)))
        if x["overSfx"] is not None:
            need=(SYNC_LU if s["id"]=="2.1" else SFX_LU)
            if x["overSfx"]+lift < need:
                deficit=need-(x["overSfx"]+lift)
                for c in s["sfx"]+[c for t in TL["shots"] for c in t["sfx"] if t is not s]:
                    if c["at"] < l["at"]+l["dur"] and (c["at"]+4 > l["at"] or c.get("loop")) and (not c.get("loop") or c["end"] > l["at"]):
                        c["gain"]=round(c["gain"]*10**(-deficit/20),3)
                changes.append((s["id"],"lower effects",round(deficit,1)))
json.dump(TL,open(TLP,"w"),indent=1)
for c in changes: print(c)
