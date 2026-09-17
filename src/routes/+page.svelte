<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	type QuestionType = 'logic' | 'verbal' | 'math';
	type Difficulty = 'easy' | 'medium' | 'hard';
	type GameMode = 'normal' | 'daily';
	type QuestionPack = 'classic' | 'space' | 'animals' | 'math' | 'words' | 'science';

	interface Question {
		id: number;
		type: QuestionType;
		question: string;
		options: string[];
		correctAnswer: number;
		emoji: string;
		explanation?: string;
		pack?: QuestionPack;
	}

	interface Achievement {
		id: string;
		title: string;
		description: string;
		emoji: string;
		unlocked: boolean;
	}

	interface ProgressData {
		bestScores: { easy: number; medium: number; hard: number };
		gamesPlayed: number;
		achievements: string[];
		unlockedPacks: QuestionPack[];
		gameHistory: GameHistoryEntry[];
	}

	interface GameHistoryEntry {
		date: string;
		score: number;
		iq: number;
		difficulty: Difficulty;
		pack: QuestionPack;
		correctCount: number;
		totalQuestions: number;
	}

	interface LeaderboardEntry {
		name: string;
		score: number;
		iq: number;
		difficulty: Difficulty;
		date: string;
		mode: GameMode;
	}

	interface DailyChallengeData {
		lastPlayed: string;
		streak: number;
		completedToday: boolean;
	}

	interface PackInfo {
		id: QuestionPack;
		name: string;
		emoji: string;
		description: string;
		unlockRequirement: number;
	}

	// Game state
	let gameState: 'start' | 'selectMode' | 'selectPack' | 'playing' | 'finished' | 'leaderboard' | 'stats' = $state('start');
	let gameMode: GameMode = $state('normal');
	let difficulty: Difficulty = $state('medium');
	let selectedPack: QuestionPack = $state('classic');
	let currentQuestionIndex = $state(0);
	let score = $state(0);
	let timeRemaining = $state(300);
	let selectedAnswer: number | null = $state(null);
	let answers: (number | null)[] = $state([]);
	let timer: ReturnType<typeof setInterval> | undefined;
	let showConfetti = $state(false);
	let isCorrect = $state(false);
	
	// Features
	let streak = $state(0);
	let maxStreak = $state(0);
	let hintsRemaining = $state(3);
	let usedHint = $state(false);
	let eliminatedOptions: number[] = $state([]); // Track which options are eliminated by hints
	let showExplanation = $state(false);
	let achievements: Achievement[] = $state([
		{ id: 'first_game', title: 'First Steps', description: 'Complete your first game', emoji: '🎮', unlocked: false },
		{ id: 'perfect_score', title: 'Perfect!', description: 'Get 100% correct answers', emoji: '💯', unlocked: false },
		{ id: 'speed_demon', title: 'Speed Demon', description: 'Finish with 2+ minutes remaining', emoji: '⚡', unlocked: false },
		{ id: 'streak_master', title: 'Streak Master', description: 'Get 5 correct in a row', emoji: '🔥', unlocked: false },
		{ id: 'no_hints', title: 'Brain Power', description: 'Complete without using hints', emoji: '🧠', unlocked: false },
		{ id: 'pack_explorer', title: 'Explorer', description: 'Unlock all question packs', emoji: '🗺️', unlocked: false }
	]);
	let newAchievements: Achievement[] = $state([]);
	let showAchievementPopup = $state(false);

	// Progress tracking
	let progress: ProgressData = $state({
		bestScores: { easy: 0, medium: 0, hard: 0 },
		gamesPlayed: 0,
		achievements: [],
		unlockedPacks: ['classic'],
		gameHistory: []
	});

	// Leaderboard
	let leaderboard: LeaderboardEntry[] = $state([]);
	let showNameEntry = $state(false);
	let playerName = $state('');
	let finalScore = $state(0);
	let finalIQ = $state(0);

	// Daily Challenge
	let dailyChallenge: DailyChallengeData = $state({
		lastPlayed: '',
		streak: 0,
		completedToday: false
	});

	// Question packs info
	const packs: PackInfo[] = [
		{ id: 'classic', name: 'Classic Mix', emoji: '🎯', description: 'Traditional IQ questions', unlockRequirement: 0 },
		{ id: 'space', name: 'Space Adventure', emoji: '🚀', description: 'Astronomy & cosmic puzzles', unlockRequirement: 3 },
		{ id: 'animals', name: 'Animal Kingdom', emoji: '🦁', description: 'Wildlife & nature challenges', unlockRequirement: 5 },
		{ id: 'math', name: 'Math Master', emoji: '🔢', description: 'Advanced mathematics', unlockRequirement: 7 },
		{ id: 'words', name: 'Word Wizard', emoji: '📚', description: 'Vocabulary & language', unlockRequirement: 10 },
		{ id: 'science', name: 'Science Lab', emoji: '🔬', description: 'Scientific knowledge', unlockRequirement: 15 }
	];

	// Question bank - expanded with more variety
	const allQuestions: Question[] = [
		// Classic Mix questions (30 total)
		{ id: 1, type: 'logic', question: 'What comes next in the sequence? 2, 4, 8, 16, ___', options: ['24', '32', '20', '30'], correctAnswer: 1, emoji: '🔢', pack: 'classic', explanation: 'Each number doubles: 2×2=4, 4×2=8, 8×2=16, 16×2=32' },
		{ id: 2, type: 'verbal', question: 'Book is to Reading as Fork is to:', options: ['Drawing', 'Writing', 'Stirring', 'Eating'], correctAnswer: 3, emoji: '📖', pack: 'classic', explanation: 'A fork is a tool used for eating, just as a book is used for reading' },
		{ id: 3, type: 'math', question: 'If 5 machines make 5 widgets in 5 minutes, how long does it take 100 machines to make 100 widgets?', options: ['100 minutes', '5 minutes', '20 minutes', '1 minute'], correctAnswer: 1, emoji: '⚙️', pack: 'classic', explanation: 'Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes' },
		{ id: 4, type: 'logic', question: 'Which one is different? Apple, Banana, Carrot, Orange', options: ['Apple', 'Banana', 'Carrot', 'Orange'], correctAnswer: 2, emoji: '🥕', pack: 'classic', explanation: 'Carrot is a vegetable; the others are fruits' },
		{ id: 5, type: 'verbal', question: 'What is the opposite of ZENITH?', options: ['Nadir', 'Peak', 'Summit', 'Top'], correctAnswer: 0, emoji: '⬆️', pack: 'classic', explanation: 'Zenith means the highest point; nadir means the lowest point' },
		{ id: 6, type: 'logic', question: 'Complete: 1, 1, 2, 3, 5, 8, ___', options: ['11', '13', '15', '10'], correctAnswer: 1, emoji: '🔢', pack: 'classic', explanation: 'Fibonacci sequence: each number is the sum of the two preceding ones (5+8=13)' },
		{ id: 7, type: 'math', question: 'A train travels 60 miles in 1.5 hours. What is its speed in mph?', options: ['30', '40', '45', '50'], correctAnswer: 1, emoji: '🚂', pack: 'classic', explanation: 'Speed = Distance ÷ Time = 60 ÷ 1.5 = 40 mph' },
		{ id: 8, type: 'verbal', question: 'Ocean is to Water as Desert is to:', options: ['Hot', 'Sand', 'Dry', 'Cactus'], correctAnswer: 1, emoji: '🏜️', pack: 'classic', explanation: 'Water is the primary substance in an ocean; sand is the primary substance in a desert' },
		{ id: 9, type: 'logic', question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:', options: ['Lazzies', 'Not Lazzies', 'Blue', 'Razzies only'], correctAnswer: 0, emoji: '🤔', pack: 'classic', explanation: 'Transitive property: if A→B and B→C, then A→C' },
		{ id: 10, type: 'math', question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2, emoji: '💯', pack: 'classic', explanation: '15% of 200 = 0.15 × 200 = 30' },
		{ id: 11, type: 'logic', question: 'Which number should replace the question mark? 3, 6, 12, 24, ?', options: ['36', '48', '40', '52'], correctAnswer: 1, emoji: '❓', pack: 'classic', explanation: 'Each number doubles: 24×2=48' },
		{ id: 12, type: 'verbal', question: 'Happy is to Sad as Hot is to:', options: ['Warm', 'Cold', 'Fire', 'Summer'], correctAnswer: 1, emoji: '🌡️', pack: 'classic', explanation: 'These are opposite pairs: happy/sad and hot/cold' },
		{ id: 13, type: 'math', question: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], correctAnswer: 2, emoji: '✖️', pack: 'classic', explanation: 'x = 12 - 5 = 7' },
		{ id: 14, type: 'logic', question: 'Which shape comes next? Circle, Square, Circle, Square, Circle, ___', options: ['Circle', 'Square', 'Triangle', 'Pentagon'], correctAnswer: 1, emoji: '⬜', pack: 'classic', explanation: 'Alternating pattern: circle, square, circle, square...' },
		{ id: 15, type: 'verbal', question: 'Synonym of ABUNDANT:', options: ['Scarce', 'Plentiful', 'Tiny', 'Rare'], correctAnswer: 1, emoji: '📝', pack: 'classic', explanation: 'Abundant and plentiful both mean available in large quantities' },
		{ id: 16, type: 'logic', question: 'What is the next letter? A, C, E, G, ___', options: ['H', 'I', 'J', 'K'], correctAnswer: 1, emoji: '🔤', pack: 'classic', explanation: 'Skipping one letter each time: A(b)C(d)E(f)G(h)I' },
		{ id: 17, type: 'math', question: 'What is 8² (8 squared)?', options: ['16', '64', '32', '48'], correctAnswer: 1, emoji: '²', pack: 'classic', explanation: '8² = 8 × 8 = 64' },
		{ id: 18, type: 'verbal', question: 'Dog is to Puppy as Cat is to:', options: ['Kitten', 'Pet', 'Meow', 'Mouse'], correctAnswer: 0, emoji: '🐱', pack: 'classic', explanation: 'A puppy is a young dog; a kitten is a young cat' },
		{ id: 19, type: 'logic', question: 'Which is the odd one out? 2, 4, 6, 9, 12', options: ['2', '4', '9', '12'], correctAnswer: 2, emoji: '🔢', pack: 'classic', explanation: '9 is the only odd number in the sequence' },
		{ id: 20, type: 'math', question: 'If a rectangle has length 8 and width 3, what is its area?', options: ['11', '22', '24', '26'], correctAnswer: 2, emoji: '📐', pack: 'classic', explanation: 'Area = length × width = 8 × 3 = 24' },
		{ id: 21, type: 'logic', question: 'Complete the pattern: 100, 81, 64, 49, ___', options: ['36', '40', '32', '25'], correctAnswer: 0, emoji: '🔢', pack: 'classic', explanation: 'Perfect squares in reverse: 10², 9², 8², 7², 6²=36' },
		{ id: 22, type: 'verbal', question: 'Antonym of EXPAND:', options: ['Grow', 'Contract', 'Inflate', 'Enlarge'], correctAnswer: 1, emoji: '↔️', pack: 'classic', explanation: 'Expand means to grow larger; contract means to become smaller' },
		{ id: 23, type: 'math', question: 'What is 3/4 as a percentage?', options: ['70%', '75%', '80%', '85%'], correctAnswer: 1, emoji: '%', pack: 'classic', explanation: '3/4 = 0.75 = 75%' },
		{ id: 24, type: 'logic', question: 'If Tom is taller than Jerry, and Jerry is taller than Spike, who is shortest?', options: ['Tom', 'Jerry', 'Spike', 'Cannot tell'], correctAnswer: 2, emoji: '📏', pack: 'classic', explanation: 'Tom > Jerry > Spike, so Spike is shortest' },
		{ id: 25, type: 'verbal', question: 'Which word does NOT belong? Run, Jump, Skip, Table', options: ['Run', 'Jump', 'Skip', 'Table'], correctAnswer: 3, emoji: '🏃', pack: 'classic', explanation: 'Run, jump, and skip are actions; table is an object' },
		{ id: 26, type: 'logic', question: 'What comes next? J, F, M, A, M, ___', options: ['J', 'A', 'S', 'N'], correctAnswer: 0, emoji: '📅', pack: 'classic', explanation: 'First letters of months: January, February, March, April, May, June' },
		{ id: 27, type: 'math', question: 'If 3x = 27, what is x?', options: ['7', '8', '9', '10'], correctAnswer: 2, emoji: '➗', pack: 'classic', explanation: 'x = 27 ÷ 3 = 9' },
		{ id: 28, type: 'verbal', question: 'Wheel is to Car as Wing is to:', options: ['Bird', 'Fly', 'Feather', 'Sky'], correctAnswer: 0, emoji: '🚗', pack: 'classic', explanation: 'Wheels enable a car to move; wings enable a bird to fly' },
		{ id: 29, type: 'logic', question: 'Which number is missing? 5, 10, 20, 40, ___', options: ['60', '70', '80', '90'], correctAnswer: 2, emoji: '🔢', pack: 'classic', explanation: 'Each number doubles: 40×2=80' },
		{ id: 30, type: 'math', question: 'What is the average of 10, 20, and 30?', options: ['15', '20', '25', '30'], correctAnswer: 1, emoji: '➗', pack: 'classic', explanation: 'Average = (10+20+30) ÷ 3 = 60 ÷ 3 = 20' },

		// Space Adventure questions
		{ id: 31, type: 'logic', question: 'If Earth takes 365 days to orbit the Sun, and Mars takes 687 days, how much longer is a Martian year?', options: ['222 days', '322 days', '422 days', '522 days'], correctAnswer: 1, emoji: '🪐', pack: 'space', explanation: '687 - 365 = 322 days longer' },
		{ id: 32, type: 'verbal', question: 'Astronaut is to Space as Sailor is to:', options: ['Ship', 'Ocean', 'Captain', 'Port'], correctAnswer: 1, emoji: '👨🚀', pack: 'space', explanation: 'An astronaut works in space; a sailor works on the ocean' },
		{ id: 33, type: 'math', question: 'Light travels at 300,000 km/s. How far does it travel in 2 seconds?', options: ['300,000 km', '600,000 km', '900,000 km', '150,000 km'], correctAnswer: 1, emoji: '💡', pack: 'space', explanation: 'Distance = Speed × Time = 300,000 × 2 = 600,000 km' },
		{ id: 34, type: 'logic', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, emoji: '🔴', pack: 'space', explanation: 'Mars appears reddish due to iron oxide (rust) on its surface' },
		{ id: 35, type: 'verbal', question: 'Galaxy is to Stars as Forest is to:', options: ['Trees', 'Green', 'Animals', 'Leaves'], correctAnswer: 0, emoji: '🌌', pack: 'space', explanation: 'A galaxy is made up of many stars; a forest is made up of many trees' },
		{ id: 36, type: 'math', question: 'If a rocket travels at 10 km/s, how long to travel 3,600 km?', options: ['6 minutes', '360 seconds', '60 minutes', '36 minutes'], correctAnswer: 0, emoji: '🚀', pack: 'space', explanation: 'Time = Distance ÷ Speed = 3600 ÷ 10 = 360 seconds = 6 minutes' },
		{ id: 37, type: 'logic', question: 'What comes next in the sequence of planets from the Sun? Mercury, Venus, Earth, ___', options: ['Mars', 'Jupiter', 'Saturn', 'Uranus'], correctAnswer: 0, emoji: '☀️', pack: 'space', explanation: 'The order from the Sun is: Mercury, Venus, Earth, Mars, Jupiter...' },
		{ id: 38, type: 'verbal', question: 'Crater is to Moon as Mountain is to:', options: ['Earth', 'High', 'Snow', 'Climb'], correctAnswer: 0, emoji: '🌙', pack: 'space', explanation: 'Craters are surface features on the Moon; mountains are surface features on Earth' },
		{ id: 39, type: 'math', question: 'If Earth has 1 moon and Mars has 2 moons, how many moons do they have together?', options: ['1', '2', '3', '4'], correctAnswer: 2, emoji: '🌕', pack: 'space', explanation: '1 + 2 = 3 moons total' },
		{ id: 40, type: 'logic', question: 'Which is NOT a real space mission? Apollo, Voyager, Galileo, Pegasus', options: ['Apollo', 'Voyager', 'Galileo', 'Pegasus'], correctAnswer: 3, emoji: '🛸', pack: 'space', explanation: 'Apollo, Voyager, and Galileo were real NASA missions; Pegasus is not' },

		// Animal Kingdom questions
		{ id: 41, type: 'logic', question: 'If a cat has 4 legs and a spider has 8 legs, how many legs do 3 cats and 2 spiders have?', options: ['24', '28', '32', '20'], correctAnswer: 1, emoji: '🐱', pack: 'animals', explanation: '(3×4) + (2×8) = 12 + 16 = 28 legs' },
		{ id: 42, type: 'verbal', question: 'Bird is to Nest as Bee is to:', options: ['Honey', 'Hive', 'Flower', 'Sting'], correctAnswer: 1, emoji: '🐝', pack: 'animals', explanation: 'A bird lives in a nest; a bee lives in a hive' },
		{ id: 43, type: 'math', question: 'A lion sleeps 20 hours a day. How many hours is it awake?', options: ['2', '3', '4', '5'], correctAnswer: 2, emoji: '🦁', pack: 'animals', explanation: '24 - 20 = 4 hours awake' },
		{ id: 44, type: 'logic', question: 'Which animal does NOT lay eggs? Duck, Platypus, Penguin, Dolphin', options: ['Duck', 'Platypus', 'Penguin', 'Dolphin'], correctAnswer: 3, emoji: '🥚', pack: 'animals', explanation: 'Dolphins are mammals that give live birth; the others lay eggs' },
		{ id: 45, type: 'verbal', question: 'Fast is to Cheetah as Slow is to:', options: ['Turtle', 'Rabbit', 'Horse', 'Bird'], correctAnswer: 0, emoji: '🐆', pack: 'animals', explanation: 'Cheetahs are known for being fast; turtles are known for being slow' },
		{ id: 46, type: 'math', question: 'If a frog can jump 3 meters and makes 5 jumps, how far does it travel?', options: ['8 m', '12 m', '15 m', '18 m'], correctAnswer: 2, emoji: '🐸', pack: 'animals', explanation: '3 × 5 = 15 meters' },
		{ id: 47, type: 'logic', question: 'What comes next? Caterpillar, Cocoon, ___', options: ['Butterfly', 'Worm', 'Moth', 'Bee'], correctAnswer: 0, emoji: '🦋', pack: 'animals', explanation: 'Life cycle: caterpillar → cocoon → butterfly' },
		{ id: 48, type: 'verbal', question: 'Pack is to Wolves as Pride is to:', options: ['Tigers', 'Lions', 'Bears', 'Eagles'], correctAnswer: 1, emoji: '🦁', pack: 'animals', explanation: 'A group of wolves is a pack; a group of lions is a pride' },
		{ id: 49, type: 'math', question: 'A bird lays 4 eggs per nest. How many eggs in 6 nests?', options: ['10', '20', '24', '28'], correctAnswer: 2, emoji: '🪺', pack: 'animals', explanation: '4 × 6 = 24 eggs' },
		{ id: 50, type: 'logic', question: 'Which animal is NOT a mammal? Whale, Bat, Eagle, Elephant', options: ['Whale', 'Bat', 'Eagle', 'Elephant'], correctAnswer: 2, emoji: '🦅', pack: 'animals', explanation: 'Eagles are birds; whales, bats, and elephants are all mammals' },

		// Math Master questions
		{ id: 51, type: 'math', question: 'What is 12 × 12?', options: ['124', '144', '132', '156'], correctAnswer: 1, emoji: '✖️', pack: 'math', explanation: '12 × 12 = 144' },
		{ id: 52, type: 'math', question: 'What is 25% of 80?', options: ['15', '20', '25', '30'], correctAnswer: 1, emoji: '%', pack: 'math', explanation: '0.25 × 80 = 20' },
		{ id: 53, type: 'math', question: 'If y = 2x + 3 and x = 5, what is y?', options: ['10', '11', '12', '13'], correctAnswer: 3, emoji: '📊', pack: 'math', explanation: 'y = 2(5) + 3 = 10 + 3 = 13' },
		{ id: 54, type: 'math', question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correctAnswer: 2, emoji: '√', pack: 'math', explanation: '√81 = 9 because 9 × 9 = 81' },
		{ id: 55, type: 'math', question: 'What is 7 × 8?', options: ['54', '56', '58', '60'], correctAnswer: 1, emoji: '✖️', pack: 'math', explanation: '7 × 8 = 56' },
		{ id: 56, type: 'math', question: 'If a triangle has angles 90° and 45°, what is the third angle?', options: ['30°', '45°', '50°', '60°'], correctAnswer: 1, emoji: '📐', pack: 'math', explanation: 'Triangle angles sum to 180°: 180 - 90 - 45 = 45°' },
		{ id: 57, type: 'math', question: 'What is 2³ (2 cubed)?', options: ['4', '6', '8', '9'], correctAnswer: 2, emoji: '³', pack: 'math', explanation: '2³ = 2 × 2 × 2 = 8' },
		{ id: 58, type: 'math', question: 'What is 144 ÷ 12?', options: ['10', '11', '12', '13'], correctAnswer: 2, emoji: '➗', pack: 'math', explanation: '144 ÷ 12 = 12' },
		{ id: 59, type: 'math', question: 'If a circle has radius 5, what is its diameter?', options: ['5', '10', '15', '25'], correctAnswer: 1, emoji: '⭕', pack: 'math', explanation: 'Diameter = 2 × radius = 2 × 5 = 10' },
		{ id: 60, type: 'math', question: 'What is 50% of 50% of 100?', options: ['25', '50', '75', '100'], correctAnswer: 0, emoji: '%', pack: 'math', explanation: '50% of 100 = 50, then 50% of 50 = 25' },

		// Word Wizard questions
		{ id: 61, type: 'verbal', question: 'Synonym of QUICK:', options: ['Slow', 'Fast', 'Heavy', 'Light'], correctAnswer: 1, emoji: '⚡', pack: 'words', explanation: 'Quick and fast both mean moving at high speed' },
		{ id: 62, type: 'verbal', question: 'Antonym of DIFFICULT:', options: ['Hard', 'Easy', 'Complex', 'Tough'], correctAnswer: 1, emoji: '📝', pack: 'words', explanation: 'Difficult means hard; easy is the opposite' },
		{ id: 63, type: 'verbal', question: 'Begin is to Start as End is to:', options: ['Middle', 'Finish', 'Continue', 'Begin'], correctAnswer: 1, emoji: '🏁', pack: 'words', explanation: 'Begin and start are synonyms; end and finish are synonyms' },
		{ id: 64, type: 'verbal', question: 'Which word means "to make smaller"?', options: ['Expand', 'Reduce', 'Inflate', 'Grow'], correctAnswer: 1, emoji: '↓', pack: 'words', explanation: 'Reduce means to make smaller or less' },
		{ id: 65, type: 'verbal', question: 'Brave is to Courageous as Smart is to:', options: ['Dumb', 'Intelligent', 'Strong', 'Weak'], correctAnswer: 1, emoji: '🧠', pack: 'words', explanation: 'Brave and courageous are synonyms; smart and intelligent are synonyms' },
		{ id: 66, type: 'verbal', question: 'What does ANCIENT mean?', options: ['New', 'Modern', 'Very old', 'Future'], correctAnswer: 2, emoji: '🏛️', pack: 'words', explanation: 'Ancient means very old or from a long time ago' },
		{ id: 67, type: 'verbal', question: 'Gigantic is to Tiny as Loud is to:', options: ['Quiet', 'Noisy', 'Big', 'Sound'], correctAnswer: 0, emoji: '🔊', pack: 'words', explanation: 'These are opposite pairs: gigantic/tiny and loud/quiet' },
		{ id: 68, type: 'verbal', question: 'Which word means "very happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correctAnswer: 2, emoji: '😊', pack: 'words', explanation: 'Joyful means very happy or full of joy' },
		{ id: 69, type: 'verbal', question: 'Cold is to Freezing as Hot is to:', options: ['Warm', 'Cool', 'Scalding', 'Mild'], correctAnswer: 2, emoji: '🔥', pack: 'words', explanation: 'Freezing is extremely cold; scalding is extremely hot' },
		{ id: 70, type: 'verbal', question: 'What does TRANSPARENT mean?', options: ['Colorful', 'See-through', 'Solid', 'Heavy'], correctAnswer: 1, emoji: '👓', pack: 'words', explanation: 'Transparent means you can see through it, like glass' },

		// Science Lab questions
		{ id: 71, type: 'logic', question: 'What is H₂O?', options: ['Oxygen', 'Water', 'Hydrogen', 'Carbon'], correctAnswer: 1, emoji: '💧', pack: 'science', explanation: 'H₂O is the chemical formula for water (2 hydrogen, 1 oxygen)' },
		{ id: 72, type: 'math', question: 'Water boils at 100°C. What is this in Fahrenheit? (F = C × 1.8 + 32)', options: ['180°F', '200°F', '212°F', '220°F'], correctAnswer: 2, emoji: '🌡️', pack: 'science', explanation: 'F = 100 × 1.8 + 32 = 180 + 32 = 212°F' },
		{ id: 73, type: 'logic', question: 'What state of matter is steam?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctAnswer: 2, emoji: '♨️', pack: 'science', explanation: 'Steam is water in its gaseous state' },
		{ id: 74, type: 'verbal', question: 'Microscope is to Small as Telescope is to:', options: ['Near', 'Far', 'Big', 'Tiny'], correctAnswer: 1, emoji: '🔬', pack: 'science', explanation: 'A microscope views small/close things; a telescope views far things' },
		{ id: 75, type: 'math', question: 'If light travels 300,000 km/s, how far in 3 seconds?', options: ['300,000 km', '600,000 km', '900,000 km', '1,200,000 km'], correctAnswer: 2, emoji: '💡', pack: 'science', explanation: '300,000 × 3 = 900,000 km' },
		{ id: 76, type: 'logic', question: 'Which is NOT a primary color? Red, Blue, Green, Purple', options: ['Red', 'Blue', 'Green', 'Purple'], correctAnswer: 3, emoji: '🎨', pack: 'science', explanation: 'Primary colors are red, blue, and yellow (or red, green, blue for light)' },
		{ id: 77, type: 'verbal', question: 'Solid is to Liquid as Ice is to:', options: ['Water', 'Cold', 'Freeze', 'Snow'], correctAnswer: 0, emoji: '🧊', pack: 'science', explanation: 'Ice (solid) melts into water (liquid)' },
		{ id: 78, type: 'math', question: 'If sound travels at 340 m/s, how far does it travel in 5 seconds?', options: ['1,500 m', '1,600 m', '1,700 m', '1,800 m'], correctAnswer: 2, emoji: '🔊', pack: 'science', explanation: '340 × 5 = 1,700 meters' },
		{ id: 79, type: 'logic', question: 'What gas do plants produce during photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correctAnswer: 1, emoji: '🌱', pack: 'science', explanation: 'Plants produce oxygen during photosynthesis' },
		{ id: 80, type: 'verbal', question: 'Atom is to Molecule as Letter is to:', options: ['Word', 'Sentence', 'Book', 'Alphabet'], correctAnswer: 0, emoji: '⚛️', pack: 'science', explanation: 'Atoms combine to form molecules; letters combine to form words' }
	];

	let questions: Question[] = $state([]);
	let currentQuestion = $derived(questions[currentQuestionIndex]);

	// Sound effects
	let audioContext: AudioContext | null = null;

	function initAudio() {
		if (browser && !audioContext) {
			audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		}
	}

	function playSound(frequency: number, duration: number) {
		if (!audioContext) return;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.frequency.value = frequency;
		oscillator.type = 'sine';
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + duration);
	}

	function correctSound() {
		playSound(800, 0.2);
	}

	function wrongSound() {
		playSound(200, 0.3);
	}

	function achievementSound() {
		playSound(600, 0.15);
		setTimeout(() => playSound(800, 0.15), 100);
	}

	// Fisher-Yates shuffle algorithm
	function shuffle<T>(array: T[], seed?: number): T[] {
		const arr = [...array];
		const random = seed !== undefined ? seededRandom(seed) : Math.random;
		
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	// Seeded random for daily challenges
	function seededRandom(seed: number) {
		return function() {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280;
		};
	}

	function generateQuestions(mode: GameMode, pack: QuestionPack): Question[] {
		const packQuestions = allQuestions.filter(q => q.pack === pack);
		
		if (mode === 'daily') {
			// Use date as seed for consistent daily questions
			const today = new Date();
			const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
			const shuffled = shuffle(packQuestions, seed);
			return shuffled.slice(0, 10);
		} else {
			// True random shuffle for normal mode
			const shuffled = shuffle(packQuestions);
			return shuffled.slice(0, 10);
		}
	}

	function startGame(mode: GameMode) {
		gameMode = mode;
		
		if (mode === 'daily') {
			if (browser) {
				const today = new Date().toDateString();
				if (dailyChallenge.completedToday && dailyChallenge.lastPlayed === today) {
					alert('You\'ve already completed today\'s challenge! Come back tomorrow.');
					return;
				}
			}
			gameState = 'playing';
			selectedPack = 'classic'; // Daily challenge uses classic pack
			initGame();
		} else {
			gameState = 'selectPack';
		}
	}

	function selectPack(pack: QuestionPack) {
		selectedPack = pack;
		gameState = 'playing';
		initGame();
	}

	function initGame() {
		questions = generateQuestions(gameMode, selectedPack);
		currentQuestionIndex = 0;
		score = 0;
		timeRemaining = difficulty === 'easy' ? 600 : difficulty === 'medium' ? 300 : 180;
		answers = Array(questions.length).fill(null);
		selectedAnswer = null;
		streak = 0;
		maxStreak = 0;
		hintsRemaining = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1;
		usedHint = false;
		eliminatedOptions = []; // Reset eliminated options
		showExplanation = false;
		initAudio();
		startTimer();
	}

	function startTimer() {
		if (timer) clearInterval(timer);
		timer = setInterval(() => {
			timeRemaining--;
			if (timeRemaining <= 0) {
				endGame();
			}
		}, 1000);
	}

	function selectAnswer(index: number) {
		selectedAnswer = index;
	}

	function submitAnswer() {
		if (selectedAnswer === null) return;

		answers[currentQuestionIndex] = selectedAnswer;
		const correct = selectedAnswer === currentQuestion.correctAnswer;
		
		if (correct) {
			score += 10;
			streak++;
			maxStreak = Math.max(maxStreak, streak);
			correctSound();
			isCorrect = true;
		} else {
			streak = 0;
			wrongSound();
			isCorrect = false;
		}

		showExplanation = true;
		
		// Check for streak achievement
		if (streak >= 5) {
			unlockAchievement('streak_master');
		}

		setTimeout(() => {
			showExplanation = false;
			if (currentQuestionIndex < questions.length - 1) {
				currentQuestionIndex++;
				selectedAnswer = null;
				eliminatedOptions = []; // Reset eliminated options for new question
			} else {
				endGame();
			}
		}, 2000);
	}

	function useHint() {
		if (hintsRemaining > 0 && currentQuestion) {
			hintsRemaining--;
			usedHint = true;
			
			// Get all wrong answer indices
			const wrongOptions = currentQuestion.options
				.map((_, index) => index)
				.filter(index => index !== currentQuestion.correctAnswer);
			
			// Randomly select 2 wrong answers to eliminate
			const shuffledWrong = shuffle(wrongOptions);
			eliminatedOptions = shuffledWrong.slice(0, 2);
			
			playSound(500, 0.2);
		}
	}

	function skipQuestion() {
		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
			selectedAnswer = null;
			eliminatedOptions = []; // Reset eliminated options for new question
		} else {
			endGame();
		}
	}

	function calculateIQ(): number {
		const correctCount = answers.filter((ans, i) => ans === questions[i].correctAnswer).length;
		const accuracy = correctCount / questions.length;
		const timeBonus = timeRemaining > 0 ? Math.min(timeRemaining / 10, 20) : 0;
		const difficultyMultiplier = difficulty === 'easy' ? 0.8 : difficulty === 'medium' ? 1.0 : 1.3;
		
		const baseIQ = 85 + (accuracy * 30) + timeBonus;
		return Math.round(baseIQ * difficultyMultiplier);
	}

	function endGame() {
		if (timer) clearInterval(timer);
		
		const iq = calculateIQ();
		const correctCount = answers.filter((ans, i) => ans === questions[i].correctAnswer).length;
		
		finalScore = score;
		finalIQ = iq;

		// Update progress
		if (browser) {
			progress.gamesPlayed++;
			if (score > progress.bestScores[difficulty]) {
				progress.bestScores[difficulty] = score;
			}

			// Add to game history
			const historyEntry: GameHistoryEntry = {
				date: new Date().toISOString(),
				score: score,
				iq: iq,
				difficulty: difficulty,
				pack: selectedPack,
				correctCount: correctCount,
				totalQuestions: questions.length
			};
			progress.gameHistory.unshift(historyEntry);
			if (progress.gameHistory.length > 50) {
				progress.gameHistory = progress.gameHistory.slice(0, 50);
			}

			saveProgress();
		}

		// Check achievements
		unlockAchievement('first_game');
		if (correctCount === questions.length) {
			unlockAchievement('perfect_score');
		}
		if (timeRemaining >= 120) {
			unlockAchievement('speed_demon');
		}
		if (!usedHint && hintsRemaining === (difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1)) {
			unlockAchievement('no_hints');
		}

		// Check pack unlock
		unlockPacks();

		// Update daily challenge
		if (gameMode === 'daily' && browser) {
			const today = new Date().toDateString();
			if (dailyChallenge.lastPlayed !== today) {
				dailyChallenge.streak++;
			} else if (dailyChallenge.completedToday) {
				// Already completed
			}
			dailyChallenge.lastPlayed = today;
			dailyChallenge.completedToday = true;
			saveDailyChallenge();
		}

		showNameEntry = true;
		gameState = 'finished';
		
		if (showConfetti) {
			setTimeout(() => {
				showConfetti = false;
			}, 3000);
		}
	}

	function unlockPacks() {
		if (!browser) return;
		
		const gamesPlayed = progress.gamesPlayed;
		let unlockedNew = false;

		for (const pack of packs) {
			if (gamesPlayed >= pack.unlockRequirement && !progress.unlockedPacks.includes(pack.id)) {
				progress.unlockedPacks.push(pack.id);
				unlockedNew = true;
			}
		}

		// Check if all packs are unlocked
		if (progress.unlockedPacks.length === packs.length) {
			unlockAchievement('pack_explorer');
		}

		if (unlockedNew) {
			saveProgress();
		}
	}

	function unlockAchievement(id: string) {
		const achievement = achievements.find(a => a.id === id);
		if (achievement && !achievement.unlocked) {
			achievement.unlocked = true;
			newAchievements.push(achievement);
			achievementSound();
			showAchievementPopup = true;
			
			if (browser) {
				progress.achievements.push(id);
				saveProgress();
			}

			setTimeout(() => {
				showAchievementPopup = false;
				newAchievements = newAchievements.filter(a => a.id !== id);
			}, 3000);
		}
	}

	function submitToLeaderboard() {
		if (playerName.trim() && browser) {
			const entry: LeaderboardEntry = {
				name: playerName.trim(),
				score: finalScore,
				iq: finalIQ,
				difficulty: difficulty,
				date: new Date().toISOString(),
				mode: gameMode
			};
			leaderboard.push(entry);
			leaderboard.sort((a, b) => b.score - a.score);
			leaderboard = leaderboard.slice(0, 10);
			saveLeaderboard();
			showNameEntry = false;
			playerName = '';
		}
	}

	function viewLeaderboard() {
		gameState = 'leaderboard';
	}

	// Share final score (Web Share API with clipboard fallback)
	let shareStatus = $state('');

	async function shareScore() {
		if (!browser) return;
		const text = `I scored ${finalScore} pts (IQ ${finalIQ}) on TxtIQ! Can you beat me?`;
		const url = 'https://games.velstech.net/';
		try {
			if (navigator.share) {
				await navigator.share({ title: 'TxtIQ', text, url });
				return;
			}
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(`${text} ${url}`);
				shareStatus = 'Score copied – share it anywhere!';
				return;
			}
			shareStatus = url;
		} catch {
			// User cancelled the share sheet – nothing to do.
		}
	}

	function viewStats() {
		gameState = 'stats';
	}

	function backToStart() {
		gameState = 'start';
		if (timer) clearInterval(timer);
	}

	function backToModeSelect() {
		gameState = 'selectMode';
	}

	function backToPackSelect() {
		gameState = 'selectPack';
	}

	// Stats calculations
	function getAverageIQ(): number {
		if (progress.gameHistory.length === 0) return 0;
		const sum = progress.gameHistory.reduce((acc, game) => acc + game.iq, 0);
		return Math.round(sum / progress.gameHistory.length);
	}

	function getAccuracy(): number {
		if (progress.gameHistory.length === 0) return 0;
		const totalCorrect = progress.gameHistory.reduce((acc, game) => acc + game.correctCount, 0);
		const totalQuestions = progress.gameHistory.reduce((acc, game) => acc + game.totalQuestions, 0);
		return Math.round((totalCorrect / totalQuestions) * 100);
	}

	function getIQTrend(): string {
		if (progress.gameHistory.length < 3) return '➡️';
		const recent5 = progress.gameHistory.slice(0, Math.min(5, progress.gameHistory.length));
		const recentAvg = recent5.reduce((acc, game) => acc + game.iq, 0) / recent5.length;
		const older5 = progress.gameHistory.slice(5, Math.min(10, progress.gameHistory.length));
		if (older5.length === 0) return '➡️';
		const olderAvg = older5.reduce((acc, game) => acc + game.iq, 0) / older5.length;
		
		if (recentAvg > olderAvg + 3) return '📈';
		if (recentAvg < olderAvg - 3) return '📉';
		return '➡️';
	}

	function getPackStats() {
		const packCounts: Record<QuestionPack, number> = {
			classic: 0,
			space: 0,
			animals: 0,
			math: 0,
			words: 0,
			science: 0
		};
		
		progress.gameHistory.forEach(game => {
			if (game.pack) {
				packCounts[game.pack]++;
			}
		});
		
		return packCounts;
	}

	// LocalStorage functions
	function saveProgress() {
		if (browser) {
			localStorage.setItem('txtiq_progress', JSON.stringify(progress));
			localStorage.setItem('txtiq_achievements', JSON.stringify(achievements));
		}
	}

	function loadProgress() {
		if (browser) {
			const saved = localStorage.getItem('txtiq_progress');
			if (saved) {
				progress = JSON.parse(saved);
			}
			
			const savedAchievements = localStorage.getItem('txtiq_achievements');
			if (savedAchievements) {
				achievements = JSON.parse(savedAchievements);
			}
		}
	}

	function saveLeaderboard() {
		if (browser) {
			localStorage.setItem('txtiq_leaderboard', JSON.stringify(leaderboard));
		}
	}

	function loadLeaderboard() {
		if (browser) {
			const saved = localStorage.getItem('txtiq_leaderboard');
			if (saved) {
				leaderboard = JSON.parse(saved);
			}
		}
	}

	function saveDailyChallenge() {
		if (browser) {
			localStorage.setItem('txtiq_daily', JSON.stringify(dailyChallenge));
		}
	}

	function loadDailyChallenge() {
		if (browser) {
			const saved = localStorage.getItem('txtiq_daily');
			if (saved) {
				dailyChallenge = JSON.parse(saved);
			}
		}
	}

	// Lifecycle
	onMount(() => {
		if (browser) {
			loadProgress();
			loadLeaderboard();
			loadDailyChallenge();
			initAudio();
		}
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	// Format time as MM:SS
	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<header class="text-center mb-8 mt-4">
			<h1 class="text-6xl font-bold mb-2">🧠 TxtIQ</h1>
			<p class="text-xl opacity-80">Test Your Intelligence Quotient</p>
		</header>

		<!-- Achievement Popup -->
		{#if showAchievementPopup && newAchievements.length > 0}
			<div class="fixed top-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg animate-bounce z-50">
				<p class="font-bold">🎉 Achievement Unlocked!</p>
				{#each newAchievements as achievement}
					<p>{achievement.emoji} {achievement.title}</p>
				{/each}
			</div>
		{/if}

		<!-- Start Screen -->
		{#if gameState === 'start'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
				<div class="mb-8">
					<p class="text-lg mb-4">Challenge your mind with logic, verbal, and math puzzles!</p>
					<p class="text-sm opacity-75">Answer 10 questions and discover your IQ score</p>
				</div>

				<div class="space-y-4">
					<button
						onclick={() => gameState = 'selectMode'}
						class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105"
					>
						🎮 Start New Game
					</button>

					<button
						onclick={() => viewLeaderboard()}
						class="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105"
					>
						🏆 Leaderboard
					</button>

					<button
						onclick={() => viewStats()}
						class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105"
					>
						📊 View Stats
					</button>
				</div>

				<!-- Achievements Preview -->
				<div class="mt-8 pt-8 border-t border-white/20">
					<h3 class="text-xl font-bold mb-4">🏅 Achievements ({achievements.filter(a => a.unlocked).length}/{achievements.length})</h3>
					<div class="grid grid-cols-3 gap-2">
						{#each achievements as achievement}
							<div class="bg-white/5 p-2 rounded-lg text-center {achievement.unlocked ? '' : 'opacity-30'}">
								<div class="text-3xl mb-1">{achievement.emoji}</div>
								<div class="text-xs">{achievement.title}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- Mode Selection -->
		{#if gameState === 'selectMode'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
				<h2 class="text-3xl font-bold mb-6 text-center">Choose Game Mode</h2>
				
				<div class="grid gap-6">
					<!-- Normal Mode -->
					<button
						onclick={() => startGame('normal')}
						class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-6 rounded-xl text-left transition-all transform hover:scale-105"
					>
						<div class="flex items-center justify-between mb-2">
							<h3 class="text-2xl font-bold">🎯 Normal Mode</h3>
						</div>
						<p class="opacity-80">Choose your difficulty and question pack</p>
					</button>

					<!-- Daily Challenge -->
					<button
						onclick={() => startGame('daily')}
						class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 p-6 rounded-xl text-left transition-all transform hover:scale-105"
					>
						<div class="flex items-center justify-between mb-2">
							<h3 class="text-2xl font-bold">📅 Daily Challenge</h3>
							{#if dailyChallenge.completedToday}
								<span class="text-sm bg-green-500 px-3 py-1 rounded-full">✓ Completed</span>
							{/if}
						</div>
						<p class="opacity-80">New challenge every day • Current streak: {dailyChallenge.streak} 🔥</p>
					</button>
				</div>

				<!-- Difficulty Selection for Normal Mode -->
				<div class="mt-8">
					<h3 class="text-xl font-bold mb-4 text-center">Select Difficulty</h3>
					<div class="grid grid-cols-3 gap-4">
						<button
							onclick={() => difficulty = 'easy'}
							class="p-4 rounded-xl transition-all {difficulty === 'easy' ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}"
						>
							<div class="text-3xl mb-2">😊</div>
							<div class="font-bold">Easy</div>
							<div class="text-sm opacity-75">10 min, 5 hints</div>
						</button>
						<button
							onclick={() => difficulty = 'medium'}
							class="p-4 rounded-xl transition-all {difficulty === 'medium' ? 'bg-yellow-500' : 'bg-white/10 hover:bg-white/20'}"
						>
							<div class="text-3xl mb-2">🤔</div>
							<div class="font-bold">Medium</div>
							<div class="text-sm opacity-75">5 min, 3 hints</div>
						</button>
						<button
							onclick={() => difficulty = 'hard'}
							class="p-4 rounded-xl transition-all {difficulty === 'hard' ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}"
						>
							<div class="text-3xl mb-2">🔥</div>
							<div class="font-bold">Hard</div>
							<div class="text-sm opacity-75">3 min, 1 hint</div>
						</button>
					</div>
				</div>

				<button
					onclick={() => backToStart()}
					class="w-full mt-6 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-all"
				>
					← Back
				</button>
			</div>
		{/if}

		<!-- Pack Selection -->
		{#if gameState === 'selectPack'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
				<h2 class="text-3xl font-bold mb-6 text-center">Choose Question Pack</h2>
				
				<div class="grid gap-4">
					{#each packs as pack}
						{@const isLocked = !progress.unlockedPacks.includes(pack.id)}
						<button
							onclick={() => !isLocked && selectPack(pack.id)}
							disabled={isLocked}
							class="p-6 rounded-xl text-left transition-all transform {isLocked ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 hover:scale-105'}"
						>
							<div class="flex items-center justify-between mb-2">
								<h3 class="text-2xl font-bold">{pack.emoji} {pack.name}</h3>
								{#if isLocked}
									<span class="text-sm bg-red-500 px-3 py-1 rounded-full">🔒 Locked</span>
								{/if}
							</div>
							<p class="opacity-80">{pack.description}</p>
							{#if isLocked}
								<p class="text-sm mt-2 text-yellow-300">Unlock after {pack.unlockRequirement} games ({progress.gamesPlayed}/{pack.unlockRequirement})</p>
							{/if}
						</button>
					{/each}
				</div>

				<button
					onclick={() => backToModeSelect()}
					class="w-full mt-6 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-all"
				>
					← Back
				</button>
			</div>
		{/if}

		<!-- Playing Screen -->
		{#if gameState === 'playing' && currentQuestion}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
				<!-- Progress Bar -->
				<div class="mb-6">
					<div class="flex justify-between mb-2">
						<span>Question {currentQuestionIndex + 1}/{questions.length}</span>
						<span>Score: {score}</span>
					</div>
					<div class="w-full bg-white/20 rounded-full h-3">
						<div
							class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
							style="width: {((currentQuestionIndex + 1) / questions.length) * 100}%"
						></div>
					</div>
				</div>

				<!-- Stats Row -->
				<div class="flex justify-between mb-6 text-sm">
					<div class="bg-white/10 px-4 py-2 rounded-lg">
						⏱️ {formatTime(timeRemaining)}
					</div>
					<div class="bg-white/10 px-4 py-2 rounded-lg">
						🔥 Streak: {streak}
					</div>
					<div class="bg-white/10 px-4 py-2 rounded-lg">
						💡 Hints: {hintsRemaining}
					</div>
				</div>

				<!-- Question -->
				<div class="bg-white/5 rounded-2xl p-6 mb-6">
					<div class="text-5xl mb-4 text-center">{currentQuestion.emoji}</div>
					<h3 class="text-2xl font-bold mb-4 text-center">{currentQuestion.question}</h3>
					
					<!-- Answer Options -->
					<div class="grid gap-3 mb-4">
						{#each currentQuestion.options as option, index}
							{#if !eliminatedOptions.includes(index)}
								<button
									onclick={() => selectAnswer(index)}
									disabled={showExplanation}
									class="p-4 rounded-xl text-left transition-all transform hover:scale-102 {
										selectedAnswer === index
											? 'bg-blue-500 ring-4 ring-blue-300'
											: 'bg-white/10 hover:bg-white/20'
									} {showExplanation ? 'cursor-not-allowed' : ''}"
								>
									<span class="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
								</button>
							{:else}
								<div class="p-4 rounded-xl text-left bg-white/5 opacity-30 line-through">
									<span class="font-semibold">{String.fromCharCode(65 + index)}.</span> {option} <span class="text-red-400">✗ Eliminated</span>
								</div>
							{/if}
						{/each}
					</div>

					<!-- Explanation -->
					{#if showExplanation}
						<div class="mt-4 p-4 rounded-xl {isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}">
							<p class="font-bold mb-2">
								{isCorrect ? '✅ Correct!' : '❌ Incorrect'}
							</p>
							{#if currentQuestion.explanation}
								<p class="text-sm">{currentQuestion.explanation}</p>
							{/if}
						</div>
					{/if}
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-3">
					<button
						onclick={() => submitAnswer()}
						disabled={selectedAnswer === null || showExplanation}
						class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-xl transition-all"
					>
						Submit Answer
					</button>
					<button
						onclick={() => useHint()}
						disabled={hintsRemaining === 0 || showExplanation || eliminatedOptions.length > 0}
						class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-xl transition-all"
					>
						💡 Hint ({hintsRemaining})
					</button>
					<button
						onclick={() => skipQuestion()}
						disabled={showExplanation}
						class="bg-white/10 hover:bg-white/20 disabled:cursor-not-allowed py-3 px-6 rounded-xl transition-all"
					>
						Skip
					</button>
				</div>
			</div>
		{/if}

		<!-- Finished Screen -->
		{#if gameState === 'finished'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
				<h2 class="text-4xl font-bold mb-6">🎉 Game Complete!</h2>
				
				<div class="grid grid-cols-2 gap-4 mb-8">
					<div class="bg-white/10 p-6 rounded-xl">
						<div class="text-4xl font-bold text-yellow-400">{finalScore}</div>
						<div class="text-sm opacity-75">Final Score</div>
					</div>
					<div class="bg-white/10 p-6 rounded-xl">
						<div class="text-4xl font-bold text-green-400">{finalIQ}</div>
						<div class="text-sm opacity-75">IQ Score</div>
					</div>
				</div>

				<div class="bg-white/5 p-4 rounded-xl mb-6">
					<div class="text-sm opacity-75 mb-2">Your Performance</div>
					<div class="text-xl">
						{answers.filter((ans, i) => ans === questions[i].correctAnswer).length}/{questions.length} Correct
						• Max Streak: {maxStreak} 🔥
					</div>
				</div>

				{#if showNameEntry}
					<div class="mb-6">
						<input
							type="text"
							bind:value={playerName}
							placeholder="Enter your name for leaderboard"
							class="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 focus:border-white/40 outline-none"
							maxlength="20"
						/>
						<button
							onclick={() => submitToLeaderboard()}
							disabled={!playerName.trim()}
							class="w-full mt-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-xl transition-all"
						>
							Submit to Leaderboard
						</button>
					</div>
				{/if}

				<div class="space-y-3">
					<button
						onclick={() => shareScore()}
						class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold py-3 px-6 rounded-xl transition-all"
					>
						📣 Share My Score
					</button>
					{#if shareStatus}
						<p class="text-sm opacity-75">{shareStatus}</p>
					{/if}
					<button
						onclick={() => viewLeaderboard()}
						class="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 font-bold py-3 px-6 rounded-xl transition-all"
					>
						🏆 View Leaderboard
					</button>
					<button
						onclick={() => backToStart()}
						class="w-full bg-white/10 hover:bg-white/20 font-bold py-3 px-6 rounded-xl transition-all"
					>
						← Back to Home
					</button>
				</div>
			</div>
		{/if}

		<!-- Leaderboard Screen -->
		{#if gameState === 'leaderboard'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
				<h2 class="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h2>
				
				{#if leaderboard.length === 0}
					<p class="text-center opacity-75 py-8">No entries yet. Be the first!</p>
				{:else}
					<div class="space-y-3">
						{#each leaderboard as entry, index}
							<div class="bg-white/5 p-4 rounded-xl flex items-center justify-between">
								<div class="flex items-center gap-4">
									<div class="text-2xl font-bold w-8">
										{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
									</div>
									<div>
										<div class="font-bold">{entry.name}</div>
										<div class="text-sm opacity-75">
											{entry.difficulty} • {entry.mode === 'daily' ? '📅 Daily' : '🎮 Normal'}
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="font-bold text-yellow-400">{entry.score} pts</div>
									<div class="text-sm opacity-75">IQ: {entry.iq}</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<button
					onclick={() => backToStart()}
					class="w-full mt-6 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-all"
				>
					← Back to Home
				</button>
			</div>
		{/if}

		<!-- Stats Screen -->
		{#if gameState === 'stats'}
			<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
				<h2 class="text-3xl font-bold mb-6 text-center">📊 Your Statistics</h2>
				
				<!-- Summary Stats -->
				<div class="grid grid-cols-3 gap-4 mb-6">
					<div class="bg-white/10 p-4 rounded-xl text-center">
						<div class="text-3xl font-bold text-blue-400">{progress.gamesPlayed}</div>
						<div class="text-sm opacity-75">Games Played</div>
					</div>
					<div class="bg-white/10 p-4 rounded-xl text-center">
						<div class="text-3xl font-bold text-green-400">{getAverageIQ()}</div>
						<div class="text-sm opacity-75">Avg IQ</div>
					</div>
					<div class="bg-white/10 p-4 rounded-xl text-center">
						<div class="text-3xl font-bold text-yellow-400">{getAccuracy()}%</div>
						<div class="text-sm opacity-75">Accuracy</div>
					</div>
				</div>

				<!-- IQ Trend -->
				<div class="bg-white/5 p-4 rounded-xl mb-6 text-center">
					<div class="text-sm opacity-75 mb-1">IQ Trend</div>
					<div class="text-4xl">{getIQTrend()}</div>
				</div>

				<!-- Best Scores -->
				<div class="mb-6">
					<h3 class="text-xl font-bold mb-3">🏅 Best Scores</h3>
					<div class="grid grid-cols-3 gap-3">
						<div class="bg-green-500/20 p-3 rounded-xl text-center">
							<div class="text-sm opacity-75">Easy</div>
							<div class="text-2xl font-bold">{progress.bestScores.easy}</div>
						</div>
						<div class="bg-yellow-500/20 p-3 rounded-xl text-center">
							<div class="text-sm opacity-75">Medium</div>
							<div class="text-2xl font-bold">{progress.bestScores.medium}</div>
						</div>
						<div class="bg-red-500/20 p-3 rounded-xl text-center">
							<div class="text-sm opacity-75">Hard</div>
							<div class="text-2xl font-bold">{progress.bestScores.hard}</div>
						</div>
					</div>
				</div>

				<!-- Pack Breakdown -->
				<div class="mb-6">
					<h3 class="text-xl font-bold mb-3">📦 Pack Breakdown</h3>
					<div class="space-y-2">
						{#each packs as pack}
							{@const packStats = getPackStats()}
							{@const count = packStats[pack.id]}
							{@const percentage = progress.gamesPlayed > 0 ? (count / progress.gamesPlayed) * 100 : 0}
							<div class="bg-white/5 p-3 rounded-xl">
								<div class="flex justify-between mb-1">
									<span>{pack.emoji} {pack.name}</span>
									<span class="font-bold">{count} games</span>
								</div>
								<div class="w-full bg-white/10 rounded-full h-2">
									<div
										class="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all"
										style="width: {percentage}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Recent Games -->
				<div class="mb-6">
					<h3 class="text-xl font-bold mb-3">🕐 Recent Games</h3>
					<div class="space-y-2 max-h-64 overflow-y-auto">
						{#each progress.gameHistory.slice(0, 10) as game}
							<div class="bg-white/5 p-3 rounded-xl flex justify-between items-center">
								<div>
									<div class="font-bold">
										{packs.find(p => p.id === game.pack)?.emoji} 
										{game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
									</div>
									<div class="text-xs opacity-75">{new Date(game.date).toLocaleDateString()}</div>
								</div>
								<div class="text-right">
									<div class="font-bold text-yellow-400">{game.score} pts</div>
									<div class="text-sm">IQ: {game.iq}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Achievements -->
				<div class="mb-6">
					<h3 class="text-xl font-bold mb-3">🏆 Achievements ({achievements.filter(a => a.unlocked).length}/{achievements.length})</h3>
					<div class="grid grid-cols-2 gap-3">
						{#each achievements as achievement}
							<div class="bg-white/5 p-3 rounded-xl {achievement.unlocked ? '' : 'opacity-30'}">
								<div class="text-3xl mb-1 text-center">{achievement.emoji}</div>
								<div class="font-bold text-sm text-center">{achievement.title}</div>
								<div class="text-xs opacity-75 text-center">{achievement.description}</div>
							</div>
						{/each}
					</div>
				</div>

				<button
					onclick={() => backToStart()}
					class="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-all"
				>
					← Back to Home
				</button>
			</div>
		{/if}
	</div>
</main>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}
</style>
