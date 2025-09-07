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

