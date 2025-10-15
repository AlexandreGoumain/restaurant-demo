import { mockFetch } from "@/lib/mock";

export async function backendFetch(
  path: string,
  init: RequestInit = {}
) {
  return mockFetch(path, init);
}
