# Brain Studio — AI Workshop OS

Turn your second brain (or a client's business) into an interactive knowledge galaxy. 2D + 3D, cinematic bloom animation, guided tour, note previews, path finder, heatmap, white-label branding.

**An AI Workshop exclusive.**

## Install (one time, ~30 seconds)

**Easiest — let Claude do it.** Open Claude Code and say:

> Install the skill from ~/Downloads/brain-studio-skill.zip

**Or one command in Terminal:**

```bash
unzip -o ~/Downloads/brain-studio-skill.zip -d ~/.claude/skills
```

Either way you end up with:

```
~/.claude/skills/brain-map/
  SKILL.md
  build.py
  config.json        ← optional, your branding
  viewer/index.html
  viewer/3d.html
```

No dependencies — Python 3 (already on every Mac) and a browser.

## Use

Open Claude Code in any folder with markdown notes and type:

```
/brain-map
```

Claude builds the galaxy and opens it at http://localhost:4710.

## White-label it (sell it to clients)

Create `config.json` next to build.py:

```json
{ "name": "ACME HVAC — BUSINESS BRAIN", "logo": "/path/to/their-logo.png" }
```

Rebuild — now the galaxy carries the client's branding. Generate one from a prospect's docs folder and put it in your AIOS pitch: "here's your company as a brain."

## Controls cheat sheet

| | |
|---|---|
| R | replay the bloom animation |
| ▶ Tour | self-guided walkthrough (auto-generated for any vault) |
| Click node | focus + read the actual note |
| Right-click node | radial menu: focus · pin · path · isolate |
| Shift-click second node | shortest path between two notes |
| I | isolate the focused node's neighborhood |
| 🎬 | cinematic drift (hands-free B-roll) |
| 📸 | save PNG snapshot |
| 3D | the 3D galaxy (first load needs internet) |

Manual run without Claude Code:

```bash
python3 build.py --vault ~/path/to/your/notes
python3 ~/path/to/your/notes/.brain-map/serve.py
```
