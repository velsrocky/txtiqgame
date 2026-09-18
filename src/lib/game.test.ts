import { describe, it, expect, vi, afterEach } from 'vitest';

// The store drives a Web Audio context on game start; stub it out so tests
// never touch a real AudioContext.
vi.mock('./audio.svelte', () => ({
	audio: {
		init() {},
		loadSettings() {},
		correct() {},
		wrong() {},
		hint() {},
		achievement() {},
		toggleMute() {},
		muted: false
	}
}));

import { GameStore } from './game.svelte';
import type { Question } from './questions';

function makeQuestions(n: number): Question[] {
	return Array.from({ length: n }, (_, i) => ({
		id: i + 1,
		type: 'logic',
		question: `Question ${i + 1}?`,
		options: ['A', 'B', 'C', 'D'],
		correctAnswer: 0,
		emoji: '❓',
		pack: 'classic'
	}));
}

function freshStore(): GameStore {
	const store = new GameStore();
	store.difficulty = 'medium';
	return store;
}

describe('formatTime', () => {
	it('zero-pads seconds and renders minutes', () => {
		const store = freshStore();
		expect(store.formatTime(0)).toBe('0:00');
		expect(store.formatTime(5)).toBe('0:05');
		expect(store.formatTime(65)).toBe('1:05');
		expect(store.formatTime(125)).toBe('2:05');
		expect(store.formatTime(3600)).toBe('60:00');
	});
});

describe('calculateIQ', () => {
	it('maps a perfect, fast medium round to the baseline score', () => {
		const store = freshStore();
		store.questions = makeQuestions(10);
		store.answers = Array(10).fill(0);
		store.timeRemaining = 300;

		// accuracy 1 -> +30, timeBonus min(300/10, 20) = 20, x1.0 difficulty
		expect(store.calculateIQ()).toBe(135);
	});

	it('drops with accuracy and rewards remaining time', () => {
		const store = freshStore();
		store.questions = makeQuestions(10);
		store.answers = [...Array(5).fill(0), ...Array(5).fill(null)];
		store.timeRemaining = 100;

		// accuracy 0.5 -> +15, timeBonus min(10, 20) = 10 -> (85+15+10) x1.0
		expect(store.calculateIQ()).toBe(110);
	});

	it('applies the difficulty multiplier', () => {
		const hard = freshStore();
		hard.difficulty = 'hard';
		hard.questions = makeQuestions(10);
		hard.answers = Array(10).fill(0);
		hard.timeRemaining = 180;
		// 85 + 30 + min(18, 20)=18 = 133, x1.3 = 172.9 -> 173
		expect(hard.calculateIQ()).toBe(173);

		const easy = freshStore();
		easy.difficulty = 'easy';
		easy.questions = makeQuestions(10);
		easy.answers = Array(10).fill(0);
		easy.timeRemaining = 600;
		// 85 + 30 + 20 = 135, x0.8 = 108
		expect(easy.calculateIQ()).toBe(108);
	});
});

describe('question rotation', () => {
	afterEach(() => {
		// selectPack starts a wall-clock timer; always tear it down
		new GameStore().cleanup();
	});

	it('deals a full round from a pack', () => {
		const store = freshStore();
		store.selectPack('classic');
		expect(store.questions).toHaveLength(10);
		expect(store.questions.every((q) => q.pack === 'classic')).toBe(true);
		store.cleanup();
	});

	it('never repeats the previous round back to back', () => {
		const store = freshStore();
		const rounds: number[][] = [];
		for (let i = 0; i < 5; i++) {
			store.selectPack('classic');
			rounds.push(store.questions.map((q) => q.id));
		}
		store.cleanup();

		for (let i = 1; i < rounds.length; i++) {
			const overlap = rounds[i].filter((id) => rounds[i - 1].includes(id));
			expect(overlap, `round ${i} repeats the previous round`).toHaveLength(0);
		}
	});

	it('serves the same seeded questions to every daily player', () => {
		const first = freshStore();
		first.startGame('daily');
		const firstIds = first.questions.map((q) => q.id);
		first.cleanup();

		const second = freshStore();
		second.startGame('daily');
		const secondIds = second.questions.map((q) => q.id);
		second.cleanup();

		expect(secondIds).toEqual(firstIds);
	});
});

describe('stats helpers', () => {
	it('reports zero accuracy and IQ with no history', () => {
		const store = freshStore();
		expect(store.getAccuracy()).toBe(0);
		expect(store.getAverageIQ()).toBe(0);
	});

	it('aggregates accuracy and average IQ across games', () => {
		const store = freshStore();
		store.progress.gameHistory = [
			{
				date: 'a',
				score: 100,
				iq: 120,
				difficulty: 'medium',
				pack: 'classic',
				correctCount: 8,
				totalQuestions: 10
			},
			{
				date: 'b',
				score: 90,
				iq: 110,
				difficulty: 'medium',
				pack: 'classic',
				correctCount: 6,
				totalQuestions: 10
			}
		];
		expect(store.getAccuracy()).toBe(70);
		expect(store.getAverageIQ()).toBe(115);
	});

	it('reports a flat trend without enough games', () => {
		const store = freshStore();
		expect(store.getIQTrend()).toBe('➡️');
	});
});
