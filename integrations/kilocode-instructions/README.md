# Kilo Code + OpenMemory (Mem0) Integration Instructions

This folder contains ready-to-use rules and workflows to make Kilo Code autonomously retrieve and persist project memory using your deployed OpenMemory MCP server on DigitalOcean.

How to use in any project

1) Ensure your OpenMemory deployment is live
- The API should be available at https://YOUR-APP.ondigitalocean.app
- Configure the api component with:
  - OPENAI_API_KEY (Secret)
  - QDRANT_URL (Secret): https://YOUR-QDRANT-CLUSTER:6333
  - QDRANT_API_KEY (Secret)

2) Configure Kilo Code to connect to OpenMemory (SSE)
- In the target project repository (the one Kilo Code will work on), create .kilocode/mcp.json:

  {
    "mcpServers": {
      "openmemory": {
        "type": "sse",
        "url": "https://YOUR-APP.ondigitalocean.app/mcp/YOUR_PROJECT_SLUG/sse/${env:MEM0_USER_ID}",
        "alwaysAllow": ["add_memories", "search_memory", "list_memories"],
        "disabled": false
      }
    }
  }

- Set a global user id (once):
  export MEM0_USER_ID=sternberg_dev   # add to your shell profile

- In Kilo Code → Settings → Auto Approve, enable “Use MCP servers.”

3) Add the rules and workflows to the project’s .kilocode directory
- Copy files from this folder into the target project under:
  - .kilicode/rules/
  - .kilicode/rules-code/
  - .kilicode/workflows/

- Rules are injected into the system prompt every turn, so the agent will autonomously call memory tools when appropriate.
- Workflows are playbooks you can trigger to initialize or refresh memory for existing projects.

Files in this folder
- rules/memory-autonomy.md
  Autonomous memory policy injected every turn: when to search, when to store, what to store, and quality bar.
- rules-code/memory-autonomy-code.md
  Tightens behavior in code mode (pre-change retrieval, post-change storage, conventions).
- workflows/memory-initialize.md
  First-time bootstrapping of durable memory for a new or existing project; extracts essentials from docs/configs and persists compact facts.
- workflows/memory-refresh.md
  Reconciles memory with recent changes (PRs, CI, configs, schema, routes); updates or summarizes without bloat.

Tips
- You can also place the main memory rule in ~/.kilocode/rules for global default behavior; the per-project rules refine it.
- Use distinct YOUR_PROJECT_SLUG per repo so memory stays scoped by project, while MEM0_USER_ID ties it to you.
- The memory entries embed tags (kind, area, module, etc.) in the text so queries are precise without exposing secrets.

