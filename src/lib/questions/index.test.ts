import { describe, it, expect } from 'vitest';
import { allQuestions } from './index';
import type { Question, QuestionPack, QuestionType } from './types';
import { packs } from '../packs';

const VALID_PACKS = new Set<QuestionPack>(packs.map((p) => p.id));
const VALID_TYPES = new Set<QuestionType>(['logic', 'verbal', 'math']);

describe('question data integrity', () => {
	it('loads a non-trivial bank of questions', () => {
		expect(allQuestions.length).toBeGreaterThan(200);
	});

	it('gives every question a unique pack+id pair', () => {
		const seen = new Set<string>();
		for (const q of allQuestions) {
			const key = `${q.pack}:${q.id}`;
			expect(seen.has(key), `duplicate ${key}`).toBe(false);
			seen.add(key);
		}
	});

	it('always supplies exactly four distinct options', () => {
		for (const q of allQuestions) {
			expect(q.options, `${q.pack}:${q.id} options`).toHaveLength(4);
			expect(new Set(q.options).size, `${q.pack}:${q.id} has duplicate options`).toBe(4);
		}
	});

	it('points the correct answer at a valid option index', () => {
		for (const q of allQuestions) {
			expect(Number.isInteger(q.correctAnswer)).toBe(true);
			expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
			expect(q.correctAnswer).toBeLessThan(4);
		}
	});

	it('fills out every required field', () => {
		for (const q of allQuestions) {
			expect(q.question, `${q.pack}:${q.id} question`).toBeTruthy();
			expect(q.explanation, `${q.pack}:${q.id} explanation`).toBeTruthy();
			expect(q.emoji, `${q.pack}:${q.id} emoji`).toBeTruthy();
		}
	});

	it('uses only registered packs and valid types', () => {
		for (const q of allQuestions) {
			expect(VALID_PACKS.has(q.pack as QuestionPack), `unknown pack ${q.pack}`).toBe(true);
			expect(VALID_TYPES.has(q.type), `${q.pack}:${q.id} bad type ${q.type}`).toBe(true);
		}
	});

	it('stocks every registered pack with enough questions for a full round', () => {
		const perPack = new Map<QuestionPack, number>();
		for (const q of allQuestions) {
			perPack.set(q.pack as QuestionPack, (perPack.get(q.pack as QuestionPack) ?? 0) + 1);
		}
		for (const pack of packs) {
			expect(perPack.get(pack.id) ?? 0, `pack ${pack.id} too small`).toBeGreaterThanOrEqual(10);
		}
	});

	it('keeps every question tied to the pack it is filed under', () => {
		// Guards against a copy-paste landing a question in the wrong pack file
		for (const q of allQuestions as (Question & { pack: QuestionPack })[]) {
			expect(VALID_PACKS.has(q.pack)).toBe(true);
		}
	});
});
