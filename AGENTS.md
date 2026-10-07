# Repository collaboration

- Before generating or changing code for a new task, create a new named Git branch. Commit and push completed work on that branch; never edit or commit directly on `main`. Continue related edits for the same task on its existing feature branch.
- Respect `.gitignore`. Never commit `.env`, credentials, `node_modules`, or `dist`. `.env.example` may contain comments or non-secret examples only.
- The current application uses no API credentials. If adding an API, put credentials in a server-side `.env` and access them through a backend. Never embed them in source or `VITE_*` variables.
- Keep the tone playful and caring with boundaries: jokes target life's demands, not the person or their identity. Describe temporary states, not diagnoses or permanent personality labels.
- Use `npm ci` for reproducible installation, `npm test` for scoring checks, and `npm run build` for the production build. Validate affected browser interactions for UI changes.
- Cloud tasks already have an isolated checkout. Use it; do not create Git worktrees unless the user explicitly requests one.
