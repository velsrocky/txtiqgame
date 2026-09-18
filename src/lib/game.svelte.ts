import { browser } from '$app/environment';
import { allQuestions } from './questions';
import type { Question, QuestionPack } from './questions';
import { packs } from './packs';
import { audio } from './audio.svelte';
import { loadJSON, saveJSON } from './storage';
import { completeDaily, dailySeed, isCompletedToday, nowISO } from './datetime';
import { BASE_POINTS, computeTimeBonus, questionPoints } from './scoring';
import type {
	Achievement,
	DailyChallengeData,
	Difficulty,
	GameHistoryEntry,
	GameMode,
	GameState,
	LeaderboardEntry,
	ProgressData
} from './types';

const STORAGE_KEYS = {
	progress: 'txtiq_progress',
	achievements: 'txtiq_achievements',
	leaderboard: 'txtiq_leaderboard',
	daily: 'txtiq_daily'
} as const;

const QUESTIONS_PER_GAME = 10;
const LEADERBOARD_SIZE = 30;

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
	{
		id: 'first_game',
		title: 'First Steps',
		description: 'Complete your first game',
		emoji: '🎮',
		unlocked: false
	},
	{
		id: 'perfect_score',
		title: 'Perfect!',
		description: 'Get 100% correct answers',
		emoji: '💯',
		unlocked: false
	},
	{
		id: 'speed_demon',
		title: 'Speed Demon',
		description: 'Finish with 2+ minutes remaining',
		emoji: '⚡',
		unlocked: false
	},
	{
		id: 'streak_master',
		title: 'Streak Master',
		description: 'Get 5 correct in a row',
		emoji: '🔥',
		unlocked: false
	},
	{
		id: 'no_hints',
		title: 'Brain Power',
		description: 'Complete without using hints',
		emoji: '🧠',
		unlocked: false
	},
	{
		id: 'pack_explorer',
		title: 'Explorer',
		description: 'Unlock all question packs',
		emoji: '🗺️',
		unlocked: false
	}
];

const DEFAULT_PROGRESS: ProgressData = {
	bestScores: { easy: 0, medium: 0, hard: 0 },
	gamesPlayed: 0,
	achievements: [],
	unlockedPacks: ['classic'],
	gameHistory: []
};

/** Fisher–Yates shuffle, optionally seeded for reproducible daily challenges. */
function shuffle<T>(array: T[], seed?: number): T[] {
	const arr = [...array];
	const random = seed !== undefined ? seededRandom(seed) : Math.random;

	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

// Linear congruential generator – deterministic shuffles for the daily challenge
function seededRandom(seed: number) {
	return function () {
		seed = (seed * 9301 + 49297) % 233280;
		return seed / 233280;
	};
}

function generateQuestions(mode: GameMode, pack: QuestionPack): Question[] {
	const packQuestions = allQuestions.filter((q) => q.pack === pack);

	if (mode === 'daily') {
		// Date-seeded so every player gets the same questions on a given day
		return shuffle(packQuestions, dailySeed()).slice(0, QUESTIONS_PER_GAME);
	}

	return shuffle(packQuestions).slice(0, QUESTIONS_PER_GAME);
}

export class GameStore {
	// Navigation
	gameState: GameState = $state('start');
	gameMode: GameMode = $state('normal');
	difficulty: Difficulty = $state('medium');
	selectedPack: QuestionPack = $state('classic');

	// Active round
	currentQuestionIndex = $state(0);
	score = $state(0);
	basePoints = $state(0);
	streakBonus = $state(0);
	timeBonus = $state(0);
	timeRemaining = $state(300);
	selectedAnswer: number | null = $state(null);
	answers: (number | null)[] = $state([]);
	questions: Question[] = $state([]);
	isCorrect = $state(false);
	showExplanation = $state(false);
	streak = $state(0);
	maxStreak = $state(0);
	hintsRemaining = $state(3);
	usedHint = $state(false);
	eliminatedOptions: number[] = $state([]);

	// Achievements
	achievements: Achievement[] = $state(structuredClone(DEFAULT_ACHIEVEMENTS));
	newAchievements: Achievement[] = $state([]);
	showAchievementPopup = $state(false);

	// Persistence
	progress: ProgressData = $state(structuredClone(DEFAULT_PROGRESS));
	leaderboard: LeaderboardEntry[] = $state([]);
	dailyChallenge: DailyChallengeData = $state({ lastPlayed: '', streak: 0, completedToday: false });
	dailyMessage = $state('');

	// Results / sharing
	showNameEntry = $state(false);
	playerName = $state('');
	finalScore = $state(0);
	finalIQ = $state(0);
	shareStatus = $state('');

	// Non-reactive internals
	declare timer: ReturnType<typeof setInterval> | undefined;
	declare advanceTimer: ReturnType<typeof setTimeout> | undefined;
	declare endTime: number;
	declare gameEnded: boolean;

	// Derived
	currentQuestion = $derived(this.questions[this.currentQuestionIndex]);
	dailyCompletedToday = $derived(isCompletedToday(this.dailyChallenge));
	correctCount = $derived(
		this.answers.filter((ans, i) => ans === this.questions[i]?.correctAnswer).length
	);

	// ---------------------------------------------------------------- lifecycle

	/** Load everything from localStorage. Call once on mount. */
	loadAll() {
		const savedProgress = loadJSON<ProgressData>(STORAGE_KEYS.progress);
		if (savedProgress) {
			// Merge with defaults so missing keys (e.g. after an update) can't crash the UI
			this.progress = { ...structuredClone(DEFAULT_PROGRESS), ...savedProgress };
		}

		const savedAchievements = loadJSON<Achievement[]>(STORAGE_KEYS.achievements);
		if (savedAchievements) {
			// Merge by id so achievements added in later updates always render
			for (const def of this.achievements) {
				const match = savedAchievements.find((a) => a?.id === def.id);
				if (match) def.unlocked = !!match.unlocked;
			}
		}

		const savedLeaderboard = loadJSON<LeaderboardEntry[]>(STORAGE_KEYS.leaderboard);
		this.leaderboard = Array.isArray(savedLeaderboard) ? savedLeaderboard : [];

		const savedDaily = loadJSON<DailyChallengeData>(STORAGE_KEYS.daily);
		if (savedDaily) this.dailyChallenge = savedDaily;

		audio.loadSettings();
	}

	/** Clear running timers. Call on destroy. */
	cleanup() {
		if (this.timer) clearInterval(this.timer);
		if (this.advanceTimer) clearTimeout(this.advanceTimer);
	}

	// ------------------------------------------------------------------ storage

	saveProgress() {
		saveJSON(STORAGE_KEYS.progress, this.progress);
		saveJSON(STORAGE_KEYS.achievements, this.achievements);
	}

	saveLeaderboard() {
		saveJSON(STORAGE_KEYS.leaderboard, this.leaderboard);
	}

	saveDailyChallenge() {
		saveJSON(STORAGE_KEYS.daily, this.dailyChallenge);
	}

	// -------------------------------------------------------------------- flow

	startGame(mode: GameMode) {
		this.gameMode = mode;
		this.dailyMessage = '';

		if (mode === 'daily') {
			if (this.dailyCompletedToday) {
				this.dailyMessage = "You've already completed today's challenge — come back tomorrow! 🌅";
				this.gameState = 'selectMode';
				return;
			}
			// Daily challenge is always the Classic pack on Medium, so everyone
			// gets the same seeded questions
			this.selectedPack = 'classic';
			this.difficulty = 'medium';
			this.gameState = 'playing';
			this.initGame();
		} else {
			this.gameState = 'selectPack';
		}
	}

	selectPack(pack: QuestionPack) {
		this.selectedPack = pack;
		this.gameState = 'playing';
		this.initGame();
	}

	initGame() {
		this.questions = generateQuestions(this.gameMode, this.selectedPack);
		this.currentQuestionIndex = 0;
		this.score = 0;
		this.basePoints = 0;
		this.streakBonus = 0;
		this.timeBonus = 0;
		this.timeRemaining = this.timeForDifficulty(this.difficulty);
		this.answers = Array(this.questions.length).fill(null);
		this.selectedAnswer = null;
		this.streak = 0;
		this.maxStreak = 0;
		this.hintsRemaining = this.hintsForDifficulty(this.difficulty);
		this.usedHint = false;
		this.eliminatedOptions = [];
		this.showExplanation = false;
		this.gameEnded = false;
		if (this.advanceTimer) clearTimeout(this.advanceTimer);
		audio.init();
		this.startTimer();
	}

	private timeForDifficulty(d: Difficulty): number {
		return d === 'easy' ? 600 : d === 'medium' ? 300 : 180;
	}

	private hintsForDifficulty(d: Difficulty): number {
		return d === 'easy' ? 5 : d === 'medium' ? 3 : 1;
	}

	startTimer() {
		if (this.timer) clearInterval(this.timer);
		// Wall-clock deadline, so the countdown stays accurate after a pause
		this.endTime = Date.now() + this.timeRemaining * 1000;
		this.timer = setInterval(() => {
			this.timeRemaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
			if (this.timeRemaining <= 0) {
				this.endGame();
			}
		}, 1000);
	}

	/** Freeze the countdown (explanation shown, tab hidden). */
	pauseTimer() {
		if (this.timer) clearInterval(this.timer);
		this.timer = undefined;
	}

	/** Resume the countdown from the current timeRemaining. No-op unless a round is live. */
	resumeTimer() {
		if (this.gameEnded || this.gameState !== 'playing') return;
		if (this.showExplanation) return; // the explanation freeze takes priority
		this.startTimer();
	}

	selectAnswer(index: number) {
		this.selectedAnswer = index;
	}

	submitAnswer() {
		if (this.selectedAnswer === null || this.showExplanation) return;

		this.answers[this.currentQuestionIndex] = this.selectedAnswer;
		const correct = this.selectedAnswer === this.currentQuestion.correctAnswer;

		if (correct) {
			this.streak++;
			this.maxStreak = Math.max(this.maxStreak, this.streak);
			const points = questionPoints(this.streak);
			this.basePoints += BASE_POINTS;
			this.streakBonus += points - BASE_POINTS;
			this.score += points;
			audio.correct();
			this.isCorrect = true;
		} else {
			this.streak = 0;
			audio.wrong();
			this.isCorrect = false;
		}

		this.showExplanation = true;
		this.pauseTimer(); // freeze the clock while the explanation is displayed

		if (this.streak >= 5) {
			this.unlockAchievement('streak_master');
		}

		this.advanceTimer = setTimeout(() => {
			this.showExplanation = false;
			if (this.currentQuestionIndex < this.questions.length - 1) {
				this.currentQuestionIndex++;
				this.selectedAnswer = null;
				this.eliminatedOptions = [];
				this.resumeTimer();
			} else {
				this.endGame();
			}
		}, 2000);
	}

	useHint() {
		if (this.hintsRemaining <= 0 || !this.currentQuestion) return;

		this.hintsRemaining--;
		this.usedHint = true;

		// Pick 2 wrong answers to eliminate
		const wrongOptions = this.currentQuestion.options
			.map((_, index) => index)
			.filter((index) => index !== this.currentQuestion.correctAnswer);
		this.eliminatedOptions = shuffle(wrongOptions).slice(0, 2);

		audio.hint();
	}

	skipQuestion() {
		if (this.currentQuestionIndex < this.questions.length - 1) {
			this.currentQuestionIndex++;
			this.selectedAnswer = null;
			this.eliminatedOptions = [];
		} else {
			this.endGame();
		}
	}

	calculateIQ(): number {
		const accuracy = this.correctCount / this.questions.length;
		const timeBonus = this.timeRemaining > 0 ? Math.min(this.timeRemaining / 10, 20) : 0;
		const difficultyMultiplier =
			this.difficulty === 'easy' ? 0.8 : this.difficulty === 'medium' ? 1.0 : 1.3;

		const baseIQ = 85 + accuracy * 30 + timeBonus;
		return Math.round(baseIQ * difficultyMultiplier);
	}

	endGame() {
		// Guard against double-counting: the timer can expire while a submit's
		// 2s explanation timeout is still pending on the final question
		if (this.gameEnded) return;
		this.gameEnded = true;

		if (this.timer) clearInterval(this.timer);
		if (this.advanceTimer) clearTimeout(this.advanceTimer);

		const iq = this.calculateIQ();
		this.timeBonus = computeTimeBonus(
			this.difficulty,
			this.timeRemaining,
			this.correctCount,
			this.questions.length
		);
		this.finalScore = this.score + this.timeBonus;
		this.finalIQ = iq;

		if (browser) {
			this.progress.gamesPlayed++;
			if (this.finalScore > this.progress.bestScores[this.difficulty]) {
				this.progress.bestScores[this.difficulty] = this.finalScore;
			}

			const historyEntry: GameHistoryEntry = {
				date: nowISO(),
				score: this.finalScore,
				iq,
				difficulty: this.difficulty,
				pack: this.selectedPack,
				correctCount: this.correctCount,
				totalQuestions: this.questions.length
			};
			this.progress.gameHistory.unshift(historyEntry);
			if (this.progress.gameHistory.length > 50) {
				this.progress.gameHistory = this.progress.gameHistory.slice(0, 50);
			}

			this.saveProgress();
		}

		// Achievements
		this.unlockAchievement('first_game');
		if (this.correctCount === this.questions.length) {
			this.unlockAchievement('perfect_score');
		}
		if (this.timeRemaining >= 120) {
			this.unlockAchievement('speed_demon');
		}
		if (!this.usedHint) {
			this.unlockAchievement('no_hints');
		}

		this.unlockPacks();

		// Daily challenge bookkeeping
		if (this.gameMode === 'daily' && browser) {
			this.dailyChallenge = completeDaily(this.dailyChallenge);
			this.saveDailyChallenge();
		}

		this.showNameEntry = true;
		this.gameState = 'finished';
	}

	private unlockPacks() {
		if (!browser) return;

		let unlockedNew = false;
		for (const pack of packs) {
			if (
				this.progress.gamesPlayed >= pack.unlockRequirement &&
				!this.progress.unlockedPacks.includes(pack.id)
			) {
				this.progress.unlockedPacks.push(pack.id);
				unlockedNew = true;
			}
		}

		if (this.progress.unlockedPacks.length === packs.length) {
			this.unlockAchievement('pack_explorer');
		}

		if (unlockedNew) {
			this.saveProgress();
		}
	}

	unlockAchievement(id: string) {
		const achievement = this.achievements.find((a) => a.id === id);
		if (!achievement || achievement.unlocked) return;

		achievement.unlocked = true;
		this.newAchievements.push(achievement);
		audio.achievement();
		this.showAchievementPopup = true;

		if (browser) {
			this.progress.achievements.push(id);
			this.saveProgress();
		}

		setTimeout(() => {
			this.newAchievements = this.newAchievements.filter((a) => a.id !== id);
			this.showAchievementPopup = this.newAchievements.length > 0;
		}, 3000);
	}

	submitToLeaderboard() {
		if (!this.playerName.trim() || !browser) return;

		const entry: LeaderboardEntry = {
			name: this.playerName.trim(),
			score: this.finalScore,
			iq: this.finalIQ,
			difficulty: this.difficulty,
			date: nowISO(),
			mode: this.gameMode
		};
		this.leaderboard.push(entry);
		this.leaderboard.sort((a, b) => b.score - a.score);
		this.leaderboard = this.leaderboard.slice(0, LEADERBOARD_SIZE);
		this.saveLeaderboard();
		this.showNameEntry = false;
		this.playerName = '';
	}

	async shareScore() {
		if (!browser) return;
		const diff = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
		const text = `I scored ${this.finalScore} pts (IQ ${this.finalIQ}) on ${diff} in TxtIQ! Can you beat me?`;
		const url = 'https://games.velstech.net/';
		try {
			if (navigator.share) {
				await navigator.share({ title: 'TxtIQ', text, url });
				return;
			}
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(`${text} ${url}`);
				this.shareStatus = 'Score copied – share it anywhere!';
				return;
			}
			this.shareStatus = url;
		} catch {
			// User cancelled the share sheet – nothing to do.
		}
	}

	// ------------------------------------------------------------ navigation

	backToStart() {
		this.gameState = 'start';
		this.cleanup();
	}

	backToModeSelect() {
		this.gameState = 'selectMode';
	}

	backToPackSelect() {
		this.cleanup();
		this.showExplanation = false;
		this.gameState = 'selectPack';
	}

	viewLeaderboard() {
		this.gameState = 'leaderboard';
	}

	viewStats() {
		this.gameState = 'stats';
	}

	// ------------------------------------------------------------- formatting

	formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	getAverageIQ(): number {
		if (this.progress.gameHistory.length === 0) return 0;
		const sum = this.progress.gameHistory.reduce((acc, game) => acc + game.iq, 0);
		return Math.round(sum / this.progress.gameHistory.length);
	}

	getAccuracy(): number {
		if (this.progress.gameHistory.length === 0) return 0;
		const totalCorrect = this.progress.gameHistory.reduce(
			(acc, game) => acc + game.correctCount,
			0
		);
		const totalQuestions = this.progress.gameHistory.reduce(
			(acc, game) => acc + game.totalQuestions,
			0
		);
		return Math.round((totalCorrect / totalQuestions) * 100);
	}

	getIQTrend(): string {
		if (this.progress.gameHistory.length < 3) return '➡️';
		const recent5 = this.progress.gameHistory.slice(
			0,
			Math.min(5, this.progress.gameHistory.length)
		);
		const recentAvg = recent5.reduce((acc, game) => acc + game.iq, 0) / recent5.length;
		const older5 = this.progress.gameHistory.slice(
			5,
			Math.min(10, this.progress.gameHistory.length)
		);
		if (older5.length === 0) return '➡️';
		const olderAvg = older5.reduce((acc, game) => acc + game.iq, 0) / older5.length;

		if (recentAvg > olderAvg + 3) return '📈';
		if (recentAvg < olderAvg - 3) return '📉';
		return '➡️';
	}

	getPackCount(packId: QuestionPack): number {
		return this.progress.gameHistory.filter((game) => game.pack === packId).length;
	}
}

export const game = new GameStore();
