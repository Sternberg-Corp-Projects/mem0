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

