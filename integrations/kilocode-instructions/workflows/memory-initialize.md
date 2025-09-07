# memory-initialize (Bootstrap durable project memory)

Goal: Build a compact, durable “project brain” using the OpenMemory MCP server ("openmemory") that captures how to build, run, test, deploy, and reason about this project.

1) VERIFY SERVER
- Ensure "openmemory" MCP server is installed and connected.
- If not connected, ask to configure .kilocode/mcp.json and MEM0_USER_ID; retry.

2) DISCOVER SOURCES (read-only)
- Root docs: README*, CONTRIBUTING*, ARCHITECTURE*, ADRs, CHANGELOG*, AGENT*.md.
- Package/build: package.json, pnpm-lock.yaml, pyproject.toml, requirements.txt, poetry.lock, go.mod, gradle.build.
- Runtime: .env.example, .env.template, config/*.yml|json|toml, Dockerfile*, docker-compose*, Makefile.
- Backend: OpenAPI/Swagger, GraphQL schema, routes/controllers, ORM models/migrations.
- Frontend: next.config.*, vite.config.*, src/app|pages/routes, design system conventions.
- CI/CD: .github/workflows/*, scripts/*, deployment manifests (DO app spec, k8s, terraform).
- Observability: logging, metrics, tracing, SLO/SLA docs, alert runbooks.

3) EXTRACT ESSENTIALS (facts only; no secrets)
- Quickstart: how to run locally, smoke test commands, health endpoints.
- Tech stack: languages, frameworks, runtime versions (pin to LTS where required).
- Architecture: modules, boundaries, key data flows, third-party services.
- Data: databases, schemas (high level), migration practice, backups.
- APIs: public endpoints, auth, versioning policy, common error contracts.
- Conventions: code style, folder structure, naming rules, testing strategy.
- Tooling: scripts and Make targets for dev/test/build/deploy; CI entry points.
- Environment keys: required var NAMES and where used (NO values).
- Security: threat model notes, authz model, secrets handling locations.
- Domain: core invariants and acceptance criteria patterns.

4) WRITE MEMORY (separate chunks, small and tagged)
For each category, create one or more add_memories entries using this header + summary pattern:
[kind:procedure|decision|convention|api|db|tooling|env|domain]
[area:dev|build|deploy|auth|payments|frontend|backend|ops|testing|docs]
[module:optional][scope:project][stability:stable|draft][refs:ISSUE-123,PR-45]
Summary: <concise fact or how-to, with command names and file paths>

5) VERIFY
- Run `search_memory` for “quickstart”, “architecture”, “env keys”, “CI entry”, “deploy”.
- If any are missing or thin, add_memories more focused entries.

6) DONE
- From now on, code-mode and the global policy will keep memory fresh automatically.

