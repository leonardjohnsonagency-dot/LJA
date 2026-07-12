---
name: brain-map
description: Brain Studio — turn any markdown vault or project folder into an interactive knowledge galaxy (2D + 3D). Generates a force-directed graph of every note and its links with a cinematic bloom animation, guided tour, note previews, path finder, heatmap, and white-label branding. Use when the user says "brain map", "knowledge graph", "visualize my vault", "second brain map", "graph my notes", or wants an Obsidian-style graph view of a folder.
---

# Brain Studio (/brain-map)

Turn a folder of markdown notes into an interactive knowledge galaxy the user can explore, record for videos, or present to clients.

## Steps

1. **Determine the vault.** Default to the current working directory. If the user names a different folder, use that. The folder should contain markdown files (an Obsidian vault, an AI OS, any notes folder).

2. **Optional branding.** Check for `config.json` in this skill's folder. If the user wants their own branding (or a client's), write it before building:
   ```json
   { "name": "ACME HVAC — BUSINESS BRAIN", "logo": "/path/to/logo.png" }
   ```
   `logo` is optional. If no config exists, it defaults to AI Workshop OS branding.

3. **Build.** Run:
   ```bash
   python3 "<this skill's directory>/build.py" --vault "<vault path>"
   ```
   Output goes to `<vault>/.brain-map/` (viewers + generated `graph-data.js`). The script prints the node/link counts and detected mode (AI Workshop OS layout vs. generic folder grouping). Zero dependencies — Python 3 stdlib only.

4. **Serve and open.** Run `python3 "<vault>/.brain-map/serve.py"` in the background (it serves on http://localhost:4710 and opens the browser). If port 4710 is busy, edit the port in serve.py or stop the other server.

5. **Show the user what they got.** Tell them:
   - The bloom animation plays on load — press **R** to replay it
   - **▶ Tour** runs a self-guided walkthrough of their brain
   - Click any node to **read the actual note**; right-click for the radial menu (focus / pin / path / isolate)
   - **3D** button switches to the 3D galaxy (needs internet on first load for the WebGL engine)
   - 📸 saves a snapshot; 🎬 starts cinematic drift mode for B-roll

6. **If the graph looks sparse** (few links), the vault has few `[[wikilinks]]` or relative markdown links between notes. Offer to add wikilinks to their notes — every link makes the brain smarter and the galaxy denser.

## Re-running

Safe to re-run anytime — it regenerates `.brain-map/` from the current state of the vault. If the browser shows stale data, hard-refresh (Cmd+Shift+R).
