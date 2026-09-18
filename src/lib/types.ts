import type { QuestionPack } from './questions';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'normal' | 'daily';
export type GameState =
	'start' | 'selectMode' | 'selectPack' | 'playing' | 'finished' | 'leaderboard' | 'stats';

export interface Achievement {
	id: string;
	title: string;
	description: string;
	emoji: string;
	unlocked: boolean;
}

export interface GameHistoryEntry {
	date: string;
	score: number;
	iq: number;
	difficulty: Difficulty;
	pack: QuestionPack;
	correctCount: number;
	totalQuestions: number;
}

export interface ProgressData {
	bestScores: { easy: number; medium: number; hard: number };
	gamesPlayed: number;
	achievements: string[];
	unlockedPacks: QuestionPack[];
	gameHistory: GameHistoryEntry[];
}

export interface LeaderboardEntry {
	name: string;
	score: number;
	iq: number;
	difficulty: Difficulty;
	date: string;
	mode: GameMode;
}

export interface DailyChallengeData {
	lastPlayed: string;
	streak: number;
	completedToday: boolean;
}

export interface PackInfo {
	id: QuestionPack;
	name: string;
	emoji: string;
	description: string;
	unlockRequirement: number;
}
