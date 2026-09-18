import { browser } from '$app/environment';

/**
 * Read and parse a JSON value from localStorage, returning undefined for
 * missing keys or corrupted data so callers can fall back to defaults.
 */
export function loadJSON<T>(key: string): T | undefined {
	if (!browser) return undefined;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : undefined;
	} catch {
		return undefined;
	}
}

/** Serialize a value to localStorage, ignoring failures (private mode, quota…). */
export function saveJSON(key: string, value: unknown): void {
	if (!browser) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage is unavailable – the game still works in-memory
	}
}
