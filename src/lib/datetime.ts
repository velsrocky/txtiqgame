import type { DailyChallengeData } from './types';

/** ISO timestamp for history/leaderboard entries. */
export function nowISO(): string {
	return new Date().toISOString();
}

/** Local calendar day key, e.g. "Thu Sep 18 2026". */
export function todayString(): string {
	return new Date().toDateString();
}

/** Seed derived from the current date, so the daily challenge is stable per day. */
export function dailySeed(): number {
	const today = new Date();
	return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

/** True when the daily challenge was already finished during the current day. */
export function isCompletedToday(daily: DailyChallengeData): boolean {
	return daily.completedToday && daily.lastPlayed === todayString();
}

/** Compute the next daily-challenge state after finishing today's game. */
export function completeDaily(daily: DailyChallengeData): DailyChallengeData {
	const today = new Date();
	const todayStr = today.toDateString();
	const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString();

	let streak = daily.streak;
	if (daily.lastPlayed === yesterdayStr) {
		streak++; // Consecutive day – keep the streak going
	} else if (daily.lastPlayed !== todayStr) {
		streak = 1; // Streak broken (or first ever game)
	}

	return { lastPlayed: todayStr, streak, completedToday: true };
}
