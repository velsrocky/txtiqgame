import type { Question } from './types';
import { classic } from './classic';
import { space } from './space';
import { animals } from './animals';
import { math } from './math';
import { words } from './words';
import { science } from './science';
import { geography } from './geography';

export type { Question, QuestionPack, QuestionType } from './types';

export const allQuestions: Question[] = [
	...classic,
	...space,
	...animals,
	...math,
	...words,
	...science,
	...geography
];
