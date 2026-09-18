import type { Difficulty } from './types';

export const BASE_POINTS = 10; // per correct answer
export const STREAK_BONUS = 2; // extra points once a streak is rolling
export const STREAK_THRESHOLD = 3; // streak length that starts earning the bonus
export const MAX_TIME_BONUS = 30; // equal maximum on every difficulty

/**
 * Points earned for one correct answer, given the streak length reached by
 * answering it (the streak is incremented before this is called).
 */
export function questionPoints(streakAfterAnswer: number): number {
	return BASE_POINTS + (streakAfterAnswer >= STREAK_THRESHOLD ? STREAK_BONUS : 0);
}

/**
 * End-of-round time bonus. The divisor is tuned per difficulty so the maximum
 * is identical on every level (Easy can't farm it), and the result is scaled
 * by accuracy so an unanswered board earns nothing.
 */
export function computeTimeBonus(
	difficulty: Difficulty,
	secondsRemaining: number,
	correct: number,
	total: number
): number {
	if (total === 0) return 0;
	const divisor = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 10 : 6;
	const accuracy = correct / total;
	return Math.round(Math.min(MAX_TIME_BONUS, Math.floor(secondsRemaining / divisor)) * accuracy);
}
