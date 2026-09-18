import type { PackInfo } from './types';

export const packs: PackInfo[] = [
	{
		id: 'classic',
		name: 'Classic Mix',
		emoji: '🎯',
		description: 'Traditional IQ questions',
		unlockRequirement: 0
	},
	{
		id: 'space',
		name: 'Space Adventure',
		emoji: '🚀',
		description: 'Astronomy & cosmic puzzles',
		unlockRequirement: 3
	},
	{
		id: 'animals',
		name: 'Animal Kingdom',
		emoji: '🦁',
		description: 'Wildlife & nature challenges',
		unlockRequirement: 5
	},
	{
		id: 'math',
		name: 'Math Master',
		emoji: '🔢',
		description: 'Advanced mathematics',
		unlockRequirement: 7
	},
	{
		id: 'words',
		name: 'Word Wizard',
		emoji: '📚',
		description: 'Vocabulary & language',
		unlockRequirement: 10
	},
	{
		id: 'science',
		name: 'Science Lab',
		emoji: '🔬',
		description: 'Scientific knowledge',
		unlockRequirement: 15
	}
];
