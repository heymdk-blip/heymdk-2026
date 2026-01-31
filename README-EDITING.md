How to edit content for the 2026 Alignment Audit

Files:
- content.json — primary editable content (headlines, questions, options, actions, score tiers, ConvertKit settings)
- index-FIXED.html — loads `content.json` (if present) and falls back to embedded content.

Quick edit steps:
1. Open `content.json` in your editor and change text, question blocks, options, or action rules. Save when done.
2. Serve the folder so the browser can fetch `content.json` (browsers block fetch from file://):

   Python 3 (simple):

   ```bash
   cd "path/to/files 13"
   python3 -m http.server 8000
   ```

   Then open http://localhost:8000/index-FIXED.html in your browser.

Shortcut script:

 - Run the bundled helper which opens `content.json` in your default editor and starts a local server:

   ```bash
   cd "/Users/mdaltieri/Desktop/GTM-Audit/2026-alignment-audit/files 13"
   sh edit-and-serve.sh
   ```

This opens the JSON for editing and serves the folder at `http://localhost:8000` in one step.

Live-reload (recommended):

If you have Node.js installed, you can run a dev server that auto-reloads the page when files change.

1. Install dependencies once:

```bash
cd "/Users/mdaltieri/Desktop/GTM-Audit/2026-alignment-audit/files 13"
npm install
```

2. Start the dev server (serves files and live-reloads on change):

```bash
npm run dev
```

3. Open http://localhost:8000 in your browser. Edit `content.json` (or `index-FIXED.html`) and save — the page will reload automatically.

3. Test the audit flow and results. `index-FIXED.html` shallow-merges `content.json` over the embedded defaults, so you can update only the parts you need.

Preview Mode (Results Pages):

To preview what the results pages look like with different scores (high, mid, low) including gaps and recommended actions:

1. Start the dev server: `npm run dev`
2. Open http://localhost:8000/index.html?preview=true in your browser
3. Use the preview buttons at the top:
   - **Low Score Preview (0%)** - Shows all detected gaps with comprehensive action plan
   - **Mid Score Preview (44%)** - Shows top 3 gaps with focused actions
   - **High Score Preview (100%)** - Shows success state with no gaps
4. Click **Back to Quiz** to return to the assessment

This is useful for:
- Previewing how different score ranges display gaps and actions
- Testing content changes to gaps, actions, and score tier messaging
- Demo purposes and stakeholder reviews

Notes & tips:
- Keep the JSON structure valid. Use a JSON-aware editor or VS Code's JSON mode to avoid trailing commas.
- For large edits (multiple questions), copy the existing question objects from the HTML's embedded `CONTENT` into `content.json` and modify.
- Preview mode works with both `index.html` and `index-FIXED.html`
- Gap definitions in `content.json` must include `title`, `desc`, and `trend` fields
- Action plan rules in `content.json` are matched against gap titles using substring matching
