export async function fetchDirect(
  url: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  let response: Response = await fetch(url, init);
  if (!response.ok) {
    throw new Error("Request have failed");
  }
  return response;
}

export async function fetchJson<T>(
  url: string | URL | Request,
  init?: RequestInit
): Promise<T> {
  init = init ?? {
    headers: {
      Accept: "application/json",
    },
  };
  let res = await fetchDirect(url, init);
  let json = (await res.json()) as any;
  if (json.error) {
    throw new Error(`Error from server ${json.error}`);
  }
  return json as T;
}
