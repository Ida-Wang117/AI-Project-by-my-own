# Repository collaboration

- Before generating or changing code for a new task, create a new named Git branch. Commit and push completed work on that branch; never edit or commit directly on `main`. Continue related edits for the same task on its existing feature branch.
- Respect `.gitignore`. Never commit `.env`, credentials, `node_modules`, or `dist`. `.env.example` may contain comments or non-secret examples only.
- The current application uses no API credentials. If adding an API, put credentials in a server-side `.env` and access them through a backend. Never embed them in source or `VITE_*` variables.
- Keep the tone sharp, playful and caring with boundaries: jokes target mechanisms such as endless requests, default availability and overloaded responsibility, not a person's worth or identity. Describe temporary states, not diagnoses or permanent personality labels; replace generic motivational comfort with specific observations and practical help.
- Each result uses a concise Chinese state name of 2–3 Chinese characters and an original adult office-absurdity blind-box character. Keep heavy black outlines, cold cobalt blue and fluorescent yellow, with tired, deadpan expressions; avoid pink or pastel baby mascots and copying existing character IP.
- Give every role exactly 3 practical steps. Each step must describe a concrete, manageable action tied to that state, rather than an abstract instruction to become positive or improve yourself.
- The blind box is a reveal format, not random scoring. Keep role IDs, matching priority and scoring deterministic and compatible with existing share links. Do not change the existing Chinese or English quiz questions, order, answer options, IDs or score mappings unless the user explicitly requests it.
- Keep Chinese and English complete across questions, results, explanations, accessibility labels, sharing and PNG export. Localize humour naturally while preserving question order, IDs, scores and role rules; switching languages must retain answers and progress.
- Public sharing URLs must not include the user's personal name or GitHub username. Prefer an independent neutral hosting project. Do not invent a domain or claim a new URL is live until the hosting platform returns it and access is verified.
- Use `npm ci` for reproducible installation, `npm test` for scoring checks, and `npm run build` for the production build. Validate affected browser interactions for UI changes.
- Cloud tasks already have an isolated checkout. Use it; do not create Git worktrees unless the user explicitly requests one.
