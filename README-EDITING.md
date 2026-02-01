# How to edit content for the 2026 Alignment Audit

## 🚀 Quick Start

**Want to preview results pages right now?**

1. Run: `npm run dev` (or `python3 -m http.server 8000`)
2. Open: http://localhost:8000/index.html?preview=true
3. Click the preview buttons at the top to see Low/Mid/High score results!

---

## Files:
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

## Quick Start - How to Preview:

**Method 1: Direct Access (Easiest)**
1. Start the dev server: `npm run dev`
2. Open http://localhost:8000/index.html?preview=true in your browser
3. You'll see preview buttons at the top of the page
4. Click any preview button to see different score scenarios

**Method 2: Via Dev Mode**
1. Start the dev server: `npm run dev`
2. Open http://localhost:8000/index.html?dev=true in your browser
3. Scroll down and click the "Preview Results Mode →" link at the bottom
4. Use the preview buttons at the top

## Preview Buttons:

- **Low Score Preview (0%)** - Shows all 9 detected gaps with priority badges and comprehensive action plan
- **Mid Score Preview (62%)** - Shows top 3 high-priority gaps with focused actions  
- **High Score Preview (100%)** - Shows "Here's Where You're Aligned" success state with strengths listed
- **Open Editor** - Quick link to content editor
- **Back to Quiz** - Return to the assessment

## What You'll See:

Each preview mode displays:
- Score percentage and tier message
- **Priority Gaps & Next Steps** section with color-coded priority badges:
  - 🔴 High Priority (red)
  - 🟡 Medium Priority (yellow)
  - 🔵 Low Priority (blue)
- Gap descriptions with "2026 Reality:" trends
- QUICK ACTIONS for each gap (where applicable)
- Recommended actions section
- Download Results and booking CTA

## For Production/GitHub Pages:

The preview link is hidden from regular users by default. To access on production:
- Go to: https://your-site.com/index.html?preview=true

**Note:** The `?dev=true` parameter shows the preview link in the footer, but is hidden from normal users to keep the interface clean.

## Use Cases:

- Previewing how different score ranges display gaps and actions
- Testing content changes to gaps, actions, and score tier messaging
- Demo purposes and stakeholder reviews
- Verifying priority badge colors and formatting

Notes & tips:
- Keep the JSON structure valid. Use a JSON-aware editor or VS Code's JSON mode to avoid trailing commas.
- For large edits (multiple questions), copy the existing question objects from the HTML's embedded `CONTENT` into `content.json` and modify.
- Preview mode works with both `index.html` and `index-FIXED.html`
- Gap definitions in `content.json` must include `title`, `desc`, and `trend` fields
- Action plan rules in `content.json` are matched against gap titles using substring matching
