# memory-refresh (Update project memory from recent changes)

Goal: Keep memory aligned with reality—summarize notable changes since last update without bloating.

1) SNAPSHOT CHANGES
- Inspect recent changes: PRs merged, release notes, CHANGELOG, last N commits, modified files/dirs of interest (config, CI, infra, schema, routes).
- Identify relevant shifts: new endpoints, new env keys, refactor boundaries, upgrades (e.g., Node 20 LTS), fixes to recurring incidents, new procedures.

2) RECONCILE WITH MEMORY
- `search_memory` by topics: “quickstart,” “architecture,” “api,” “db,” “conventions,” “deploy”.
- For each topic with changes:
  - If an existing fact is obsolete: store an updated fact (don’t duplicate old).
  - If new high-signal info exists: store it as a new entry.
  - Avoid long logs—link to references/PRs and include file paths.

3) SUMMARIZE AND COMPACT
- If multiple small changes cluster into a theme (e.g., auth pipeline, CI optimization), store a single higher-level summary entry and avoid many tiny entries.

4) VERIFY
- Re-run `search_memory` on changed topics; ensure it surfaces the updated facts.

5) OPTIONAL HEALTH CHECK
- Spot-check quickstart commands; ensure they still work and memory points to updated scripts/targets.

