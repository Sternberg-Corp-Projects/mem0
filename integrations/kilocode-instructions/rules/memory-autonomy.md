# Autonomous Memory & Context Policy (OpenMemory MCP)

This policy makes the agent proactively maintain short- and long-term memory for this project using the MCP server "openmemory". Treat this memory as the “project brain” that survives restarts, branches, and long gaps.

IDENTITY
- project: YOUR_PROJECT_SLUG
- user_id: ${env:MEM0_USER_ID} (set globally once)
- server: "openmemory" (MCP SSE)

WHEN TO RETRIEVE (search_memory)
Run targeted retrieval before or during:
- Task start or subtask start (seed context with “what matters for X?”)
- Opening a new branch or switching tasks
- Before making risky refactors or API/DB migrations
- Before changing CI/CD, infra, secrets, or environment configs
- When fixing failing tests or recurring issues
- Before drafting PRs, release notes, changelogs, or READMEs
- When resuming after inactivity (“what did we decide last time?”)

WHEN TO STORE (add_memories)
Persist 1–3 sentence, fact-style entries after:
- Decisions: architecture, library/framework picks, tradeoffs, constraints
- Procedures: repeatable commands and how-tos (dev, test, build, deploy)
- Conventions: code style, naming, folder layout, review rules, DDD boundaries
- Incidents: root cause, resolution, prevention notes
- Services/Integrations: endpoints, auth scheme, rate limits, schemas, webhooks
- Data/DB: schema changes, migrations, indexing strategies, retention policies
- Environment/Config: required env vars (NO SECRETS), flags, feature gates
- Tooling: scripts, Make targets, Docker/Compose, CI workflows, lint/test
- Domain knowledge: business rules, invariants, SLAs, non-functional constraints
- TODOs/Follow-ups: timeboxed next steps with references/links

ENTRY FORMAT (put tags up front; then a crisp summary)
[kind:decision|procedure|convention|incident|api|db|env|tooling|todo|domain]
[area:auth|payments|frontend|backend|ops|observability|testing|docs|ci]
[module:optional-module-name][scope:project|module|file][stability:stable|draft]
[refs:ISSUE-123,PR-45][links:https://...,https://...]
[files:src/path/a.ts,src/path/b.ts]
Summary: <one to three sentences with exact nouns/verbs; avoid fluff>

Examples:
- [kind:decision][area:auth][scope:project][stability:stable]
  Summary: We standardized on OAuth2 client_credentials via AuthX; token cache TTL=15m; rotate monthly.

- [kind:procedure][area:dev][scope:project][stability:stable]
  Summary: Local API start: `make up` then `make seed`; health at http://localhost:3000/health; smoke test: `make smoke`.

- [kind:incident][area:build][scope:project][stability:stable][refs:INC-77]
  Summary: CI failed due to Node 18/20 mismatch; pinned to Node 20 LTS in Dockerfile and re-ran `pnpm -w install`.

HOW TO SEARCH
- Scope your query (“auth token flow,” “db migration policy,” “frontend routing map”).
- Prefer multiple small queries to one broad one; re-query as context shifts.
- If hits are empty or irrelevant, proceed; do not block.

QUALITY BAR
- Store facts, not raw logs. Link references instead of pasting long outputs.
- Update instead of duplicating (change the fact and store the updated version).
- Keep it small, high-signal, and future-proof (“what future me must know”).
- Avoid secrets—use placeholders like {{OPENAI_API_KEY}} and {{DB_PASSWORD}}.

PRIVACY & SECURITY
- Never store credentials, tokens, or PII. Use semantic placeholders only.
- When learning secret names (env var keys), store the key name and usage, not the value.

ERROR HANDLING
- If memory operations fail, continue the task; retry later. Do not block.

SERVER USE
- Use the MCP server named "openmemory".
- The agent may call `search_memory`, `add_memories`, `list_memories` autonomously per this policy.

