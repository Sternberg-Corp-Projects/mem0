# Code Mode Memory Refinement

PRE-CHANGE RETRIEVAL
- Before editing/deleting/moving code: `search_memory` for "conventions", "architecture boundaries", and "module-specific decisions" related to the target files.
- Before schema or API changes: `search_memory` for "db indexing/retention" or "public API contracts & versioning".

POST-CHANGE STORAGE
- After refactors: store [kind:decision][area:backend/frontend][module:...] Summary of the intent, scope, and tests updated.
- After new endpoints: store [kind:api][area:backend][module:...] path, method, auth policy, status codes, rate limits.
- After test fixes: store [kind:incident] cause -> fix pattern (e.g., async timing) to avoid regression.

CONVENTIONS & STYLE
- Retrieve style rules before large diffs; store any new conventions explicitly (e.g., “prefer Zod for runtime validation”).

