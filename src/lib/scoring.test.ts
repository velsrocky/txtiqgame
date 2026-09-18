import { describe, it, expect } from 'vitest';
import {
	BASE_POINTS,
	STREAK_BONUS,
	MAX_TIME_BONUS,
	computeTimeBonus,
	questionPoints
} from './scoring';

describe('questionPoints', () => {
	it('awards only base points below the streak threshold', () => {
		expect(questionPoints(1)).toBe(BASE_POINTS);
		expect(questionPoints(2)).toBe(BASE_POINTS);
	});

	it('adds the streak bonus once the threshold is reached', () => {
		expect(questionPoints(3)).toBe(BASE_POINTS + STREAK_BONUS);
		expect(questionPoints(4)).toBe(BASE_POINTS + STREAK_BONUS);
		expect(questionPoints(10)).toBe(BASE_POINTS + STREAK_BONUS);
	});

	it('never goes negative or below base points', () => {
		expect(questionPoints(0)).toBe(BASE_POINTS);
	});
});

describe('computeTimeBonus', () => {
	it('returns nothing when no questions were answered', () => {
		expect(computeTimeBonus('medium', 300, 0, 0)).toBe(0);
	});

	it('caps at MAX_TIME_BONUS with full accuracy on every difficulty', () => {
		// Easy cannot farm a bigger bonus than the harder levels
		expect(computeTimeBonus('easy', 600, 10, 10)).toBe(MAX_TIME_BONUS);
		expect(computeTimeBonus('medium', 300, 10, 10)).toBe(MAX_TIME_BONUS);
		expect(computeTimeBonus('hard', 180, 10, 10)).toBe(MAX_TIME_BONUS);
	});

	it('scales by accuracy so an unanswered board earns nothing', () => {
		expect(computeTimeBonus('medium', 300, 0, 10)).toBe(0);
		expect(computeTimeBonus('medium', 300, 5, 10)).toBe(MAX_TIME_BONUS / 2);
	});

	it('uses the per-difficulty divisor for partial time', () => {
		// medium divisor is 10: 25 seconds -> floor(2.5) = 2 -> 2 points at 100%
		expect(computeTimeBonus('medium', 25, 10, 10)).toBe(2);
		// hard divisor is 6: 7 seconds -> floor(1.16) = 1
		expect(computeTimeBonus('hard', 7, 10, 10)).toBe(1);
		// easy divisor is 20: 100 seconds -> 5 points
		expect(computeTimeBonus('easy', 100, 10, 10)).toBe(5);
	});

	it('awards nothing when time has run out', () => {
		expect(computeTimeBonus('hard', 0, 10, 10)).toBe(0);
	});
});
