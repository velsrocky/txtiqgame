export type QuestionType = 'logic' | 'verbal' | 'math';

export type QuestionPack = 'classic' | 'space' | 'animals' | 'math' | 'words' | 'science';

export interface Question {
	id: number;
	type: QuestionType;
	question: string;
	options: string[];
	correctAnswer: number;
	emoji: string;
	explanation?: string;
	pack?: QuestionPack;
}
