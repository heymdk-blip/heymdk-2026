Netlify GUI Editing — Quick Setup

1) Push this project to a Git repo (GitHub recommended).

Commands (example):
```bash
cd "/path/to/project"
git init
git add .
git commit -m "Initial commit"
# create a remote repo on GitHub, then:
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```

2) Connect repo to Netlify
- In Netlify dashboard: "New site from Git" → select your repo → Deploy settings → Deploy.

3) Enable Netlify Identity and Git Gateway (for Netlify CMS):
- In your site dashboard, go to "Identity" → Enable Identity.
- In "Identity" → Settings → Services, enable "Git Gateway" and follow prompts to authorize.

4) Access the CMS
- Open `https://<your-site>.netlify.app/admin/` and log in (via Identity).
- The CMS will show a "Content JSON" entry that opens a raw JSON editor for `content.json`.

Notes:
- The current `admin/config.yml` exposes `content.json` as a raw text widget. You can replace the widget with structured fields later.
- Alternatively, you can continue to edit `content.json` via the GitHub web editor — Netlify rebuilds on each push.
