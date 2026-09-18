import { describe, it, expect } from 'vitest';
import type { DailyChallengeData } from './types';
import { completeDaily, dailySeed, isCompletedToday, nowISO, todayString } from './datetime';

const DAY_MS = 24 * 60 * 60 * 1000;
const today = new Date();
const yesterday = new Date(today.getTime() - DAY_MS);
const daysAgo = new Date(today.getTime() - 5 * DAY_MS);

const fresh: DailyChallengeData = {
	lastPlayed: '',
	streak: 0,
	completedToday: false
};

describe('nowISO / todayString / dailySeed', () => {
	it('produces a parseable ISO timestamp', () => {
		const iso = nowISO();
		expect(() => new Date(iso).toISOString()).not.toThrow();
		expect(new Date(iso).getUTCFullYear()).toBe(today.getUTCFullYear());
	});

	it('matches the local calendar day', () => {
		expect(todayString()).toBe(today.toDateString());
	});

	it('derives a stable numeric seed from the date', () => {
		expect(dailySeed()).toBe(
			today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
		);
	});
});

describe('isCompletedToday', () => {
	it('is true only when completed today', () => {
		expect(isCompletedToday({ ...fresh, completedToday: true, lastPlayed: todayString() })).toBe(
			true
		);
	});

	it('is false for a stale completion', () => {
		expect(
			isCompletedToday({ ...fresh, completedToday: true, lastPlayed: daysAgo.toDateString() })
		).toBe(false);
	});

	it('is false when never completed', () => {
		expect(isCompletedToday(fresh)).toBe(false);
	});
});

describe('completeDaily', () => {
	it('starts a streak of 1 on the first ever game', () => {
		const result = completeDaily(fresh);
		expect(result.streak).toBe(1);
		expect(result.completedToday).toBe(true);
		expect(result.lastPlayed).toBe(todayString());
	});

	it('increments the streak when played on the consecutive day', () => {
		const result = completeDaily({
			...fresh,
			lastPlayed: yesterday.toDateString(),
			streak: 4
		});
		expect(result.streak).toBe(5);
	});

	it('resets the streak to 1 when a day was missed', () => {
		const result = completeDaily({
			...fresh,
			lastPlayed: daysAgo.toDateString(),
			streak: 9
		});
		expect(result.streak).toBe(1);
	});

	it('leaves the streak untouched when replaying the same day', () => {
		const result = completeDaily({
			...fresh,
			lastPlayed: todayString(),
			streak: 3,
			completedToday: true
		});
		expect(result.streak).toBe(3);
	});
});
