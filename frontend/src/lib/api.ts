/**
 * Fetches data from the API and returns the parsed JSON response
 * @param input
 * @param init
 */
export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        headers: {'Accept': 'application/json', ...(init?.headers ?? {})},
        ...init
    });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`API ${res.status} ${res.statusText}: ${body}`);
    }
    return res.json() as Promise<T>;
}
