// Goes in your React project at: src/api/client.ts
// Base URL comes from a Vite env var (must be prefixed VITE_ to be exposed to the browser)
// Add to client/.env.local: VITE_API_URL=http://localhost:3001

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}

export const api = {
  searchPlants: (query: string) => request<{ results: unknown[] }>(`/api/plants?query=${encodeURIComponent(query)}`),
  getTasks: () => request<unknown[]>("/api/tasks"),
  addTask: (task: unknown) => request<unknown>("/api/tasks", { method: "POST", body: JSON.stringify(task) }),
};
