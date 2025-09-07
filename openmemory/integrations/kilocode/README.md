# Kilo Code Integration for OpenMemory (Mem0)

This guide shows how to connect Kilo Code agents to OpenMemory so they retain short- and long-term context across projects.

Principles
- Stable user identity: pick a single user_id (e.g., sternberg_dev) so all your agents share memory.
- Project scoping: use an app per project (app name = repo or project slug). The API auto-creates the app on first write.
- Short vs long-term: keep recent tactical items active; periodically archive older items while preserving permanent facts.

REST endpoints used
- POST /api/v1/memories — create memory
- GET /api/v1/memories — list memories
- GET /api/v1/memories/{memory_id} — get single memory

TypeScript client (Node 18+/20+)
```ts path=/Users/work/dev/mem0/openmemory/integrations/kilocode/kilocode-memory-client.ts start=1
export type CreateMemoryRequest = {
  user_id: string;
  text: string;
  metadata?: Record<string, any>;
  infer?: boolean;
  app?: string; // project name
};

export class KiloCodeMemoryClient {
  constructor(
    private baseUrl: string,
    private userId: string,
    private app: string,
    private opts?: { headers?: Record<string, string> }
  ) {}

  async addMemory(text: string, metadata: Record<string, any> = {}, infer = true) {
    const body: CreateMemoryRequest = {
      user_id: this.userId,
      text,
      metadata,
      infer,
      app: this.app,
    };

    const res = await fetch(`${this.baseUrl}/api/v1/memories`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(this.opts?.headers || {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`addMemory failed: ${res.status}`);
    return res.json();
  }

  async listMemories(params: {
    search_query?: string;
    page?: number;
    size?: number;
    sort_column?: 'memory' | 'app_name' | 'created_at';
    sort_direction?: 'asc' | 'desc';
  } = {}) {
    const q = new URLSearchParams({ user_id: this.userId });
    if (params.search_query) q.set('search_query', params.search_query);
    if (params.page) q.set('page', String(params.page));
    if (params.size) q.set('size', String(params.size));
    if (params.sort_column) q.set('sort_column', params.sort_column);
    if (params.sort_direction) q.set('sort_direction', params.sort_direction);

    const res = await fetch(`${this.baseUrl}/api/v1/memories?${q.toString()}`);
    if (!res.ok) throw new Error(`listMemories failed: ${res.status}`);
    return res.json();
  }
}
```

Python client
```python path=/Users/work/dev/mem0/openmemory/integrations/kilocode/kilocode_memory_client.py start=1
from typing import Any, Dict, Optional
import requests

class KiloCodeMemoryClient:
    def __init__(self, base_url: str, user_id: str, app: str, headers: Optional[Dict[str, str]] = None):
        self.base_url = base_url.rstrip('/')
        self.user_id = user_id
        self.app = app
        self.headers = headers or {"content-type": "application/json"}

    def add_memory(self, text: str, metadata: Optional[Dict[str, Any]] = None, infer: bool = True):
        payload = {
            "user_id": self.user_id,
            "text": text,
            "metadata": metadata or {},
            "infer": infer,
            "app": self.app,
        }
        res = requests.post(f"{self.base_url}/api/v1/memories", json=payload, headers=self.headers)
        res.raise_for_status()
        return res.json()

    def list_memories(self, search_query: Optional[str] = None, page: int = 1, size: int = 10,
                      sort_column: Optional[str] = None, sort_direction: Optional[str] = None):
        params = {"user_id": self.user_id, "page": page, "size": size}
        if search_query:
            params["search_query"] = search_query
        if sort_column:
            params["sort_column"] = sort_column
        if sort_direction:
            params["sort_direction"] = sort_direction
        res = requests.get(f"{self.base_url}/api/v1/memories", params=params, headers=self.headers)
        res.raise_for_status()
        return res.json()
```

Suggested usage in Kilo Code agents
- Create one MemoryClient per project (app = project slug), and one user_id across all agents.
- On each task start, pull the last N memories (e.g., size=50, sort by created_at desc) to seed context.
- After meaningful events (decisions, findings, todos, environment/config changes), call addMemory with categories/metadata.
- Periodically archive/cleanup older items using the pause/archive endpoints if you want to minimize short-term clutter.

