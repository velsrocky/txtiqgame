import { describe, it, expect, vi, beforeEach } from 'vitest';

// Force the browser code path so loadJSON/saveJSON actually touch localStorage
vi.mock('$app/environment', () => ({ browser: true }));

import { loadJSON, saveJSON } from './storage';

describe('storage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('round-trips a structured value', () => {
		saveJSON('txtiq_probe', { a: 1, nested: [2, 3], ok: true });
		expect(loadJSON('txtiq_probe')).toEqual({ a: 1, nested: [2, 3], ok: true });
	});

	it('returns undefined for a key that was never written', () => {
		expect(loadJSON('txtiq_missing')).toBeUndefined();
	});

	it('recovers gracefully from corrupted JSON', () => {
		localStorage.setItem('txtiq_broken', '{this is not json');
		expect(loadJSON('txtiq_broken')).toBeUndefined();
	});

	it('never throws when the store rejects a write', () => {
		const spy = vi
			.spyOn(Storage.prototype, 'setItem')
			.mockImplementation(() => void 'QuotaExceeded' as never);
		expect(() => saveJSON('txtiq_probe', { a: 1 })).not.toThrow();
		spy.mockRestore();
	});
});
