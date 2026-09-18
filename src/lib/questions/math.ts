import type { Question } from './types';

export const math: Question[] = [
	{
		id: 51,
		type: 'math',
		question: 'What is 12 × 12?',
		options: ['124', '144', '132', '156'],
		correctAnswer: 1,
		emoji: '✖️',
		pack: 'math',
		explanation: '12 × 12 = 144'
	},
	{
		id: 52,
		type: 'math',
		question: 'What is 25% of 80?',
		options: ['15', '20', '25', '30'],
		correctAnswer: 1,
		emoji: '%',
		pack: 'math',
		explanation: '0.25 × 80 = 20'
	},
	{
		id: 53,
		type: 'math',
		question: 'If y = 2x + 3 and x = 5, what is y?',
		options: ['10', '11', '12', '13'],
		correctAnswer: 3,
		emoji: '📊',
		pack: 'math',
		explanation: 'y = 2(5) + 3 = 10 + 3 = 13'
	},
	{
		id: 54,
		type: 'math',
		question: 'What is the square root of 81?',
		options: ['7', '8', '9', '10'],
		correctAnswer: 2,
		emoji: '√',
		pack: 'math',
		explanation: '√81 = 9 because 9 × 9 = 81'
	},
	{
		id: 55,
		type: 'math',
		question: 'What is 7 × 8?',
		options: ['54', '56', '58', '60'],
		correctAnswer: 1,
		emoji: '✖️',
		pack: 'math',
		explanation: '7 × 8 = 56'
	},
	{
		id: 56,
		type: 'math',
		question: 'If a triangle has angles 90° and 45°, what is the third angle?',
		options: ['30°', '45°', '50°', '60°'],
		correctAnswer: 1,
		emoji: '📐',
		pack: 'math',
		explanation: 'Triangle angles sum to 180°: 180 - 90 - 45 = 45°'
	},
	{
		id: 57,
		type: 'math',
		question: 'What is 2³ (2 cubed)?',
		options: ['4', '6', '8', '9'],
		correctAnswer: 2,
		emoji: '³',
		pack: 'math',
		explanation: '2³ = 2 × 2 × 2 = 8'
	},
	{
		id: 58,
		type: 'math',
		question: 'What is 144 ÷ 12?',
		options: ['10', '11', '12', '13'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: '144 ÷ 12 = 12'
	},
	{
		id: 59,
		type: 'math',
		question: 'If a circle has radius 5, what is its diameter?',
		options: ['5', '10', '15', '25'],
		correctAnswer: 1,
		emoji: '⭕',
		pack: 'math',
		explanation: 'Diameter = 2 × radius = 2 × 5 = 10'
	},
	{
		id: 60,
		type: 'math',
		question: 'What is 50% of 50% of 100?',
		options: ['25', '50', '75', '100'],
		correctAnswer: 0,
		emoji: '%',
		pack: 'math',
		explanation: '50% of 100 = 50, then 50% of 50 = 25'
	},
	{
		id: 131,
		type: 'math',
		question: 'What is 15% of 60?',
		options: ['6', '9', '12', '15'],
		correctAnswer: 1,
		emoji: '%',
		pack: 'math',
		explanation: '0.15 × 60 = 9'
	},
	{
		id: 132,
		type: 'math',
		question: 'If 3x − 7 = 14, what is x?',
		options: ['5', '6', '7', '8'],
		correctAnswer: 2,
		emoji: '📊',
		pack: 'math',
		explanation: '3x = 14 + 7 = 21, so x = 21 ÷ 3 = 7'
	},
	{
		id: 133,
		type: 'math',
		question: 'What is 1/2 + 1/4?',
		options: ['1/4', '1/2', '3/4', '1'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: '2/4 + 1/4 = 3/4'
	},
	{
		id: 134,
		type: 'math',
		question: 'What is the average of 4, 8, 12, and 16?',
		options: ['8', '10', '12', '20'],
		correctAnswer: 1,
		emoji: '📊',
		pack: 'math',
		explanation: '(4 + 8 + 12 + 16) ÷ 4 = 40 ÷ 4 = 10'
	},
	{
		id: 135,
		type: 'math',
		question: 'Flour and sugar are mixed in a 3:2 ratio. For 10 cups total, how much flour?',
		options: ['4', '5', '6', '7'],
		correctAnswer: 2,
		emoji: '📊',
		pack: 'math',
		explanation: '3/5 × 10 = 6 cups of flour'
	},
	{
		id: 136,
		type: 'logic',
		question: 'What comes next: 3, 7, 15, 31, ...?',
		options: ['47', '55', '63', '65'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'math',
		explanation: 'Each number doubles then adds 1: 31 × 2 + 1 = 63'
	},
	{
		id: 137,
		type: 'math',
		question: 'What is 15²?',
		options: ['125', '215', '225', '255'],
		correctAnswer: 2,
		emoji: '²',
		pack: 'math',
		explanation: '15 × 15 = 225'
	},
	{
		id: 138,
		type: 'math',
		question: 'A $40 shirt is discounted by 25%. What is the sale price?',
		options: ['$10', '$25', '$30', '$35'],
		correctAnswer: 2,
		emoji: '%',
		pack: 'math',
		explanation: '25% of 40 = 10, so 40 − 10 = $30'
	},
	{
		id: 139,
		type: 'math',
		question: 'A car travels 60 km in 1.5 hours. What is its average speed?',
		options: ['30', '40', '60', '90'],
		correctAnswer: 1,
		emoji: '📊',
		pack: 'math',
		explanation: '60 ÷ 1.5 = 40 km/h'
	},
	{
		id: 140,
		type: 'math',
		question: 'What is the perimeter of a rectangle with length 8 and width 5?',
		options: ['13', '26', '32', '40'],
		correctAnswer: 1,
		emoji: '📐',
		pack: 'math',
		explanation: '2 × (8 + 5) = 2 × 13 = 26'
	},
	{
		id: 141,
		type: 'logic',
		question: 'What comes next: 100, 96, 88, 72, ...?',
		options: ['64', '56', '48', '40'],
		correctAnswer: 3,
		emoji: '🔢',
		pack: 'math',
		explanation: 'The gaps double (4, 8, 16, 32), so 72 − 32 = 40'
	},
	{
		id: 142,
		type: 'math',
		question: 'What is 10% of 45?',
		options: ['0.45', '4.5', '45', '450'],
		correctAnswer: 1,
		emoji: '%',
		pack: 'math',
		explanation: '0.10 × 45 = 4.5'
	},
	{
		id: 143,
		type: 'math',
		question: 'If x ÷ 4 = 9, what is x?',
		options: ['13', '27', '36', '45'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: 'x = 9 × 4 = 36'
	},
	{
		id: 144,
		type: 'math',
		question: 'What is the square root of 196?',
		options: ['12', '13', '14', '16'],
		correctAnswer: 2,
		emoji: '√',
		pack: 'math',
		explanation: '√196 = 14 because 14 × 14 = 196'
	},
	{
		id: 145,
		type: 'math',
		question: 'What is 0.75 as a fraction?',
		options: ['1/4', '1/2', '3/4', '7/10'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: '0.75 = 75/100 = 3/4'
	},
	{
		id: 146,
		type: 'math',
		question: 'A train travels at 45 km per hour. How far does it go in 4 hours?',
		options: ['90', '120', '160', '180'],
		correctAnswer: 3,
		emoji: '📊',
		pack: 'math',
		explanation: '45 × 4 = 180 km'
	},
	{
		id: 147,
		type: 'logic',
		question: 'What comes next: 81, 27, 9, 3, ...?',
		options: ['1', '0', '6', '9'],
		correctAnswer: 0,
		emoji: '🔢',
		pack: 'math',
		explanation: 'Each number is divided by 3: 3 ÷ 3 = 1'
	},
	{
		id: 148,
		type: 'math',
		question: 'The sum of 5 numbers is 100. What is their average?',
		options: ['5', '15', '20', '50'],
		correctAnswer: 2,
		emoji: '📊',
		pack: 'math',
		explanation: '100 ÷ 5 = 20'
	},
	{
		id: 149,
		type: 'math',
		question: 'A price rises from $50 to $60. What is the percentage increase?',
		options: ['10%', '20%', '25%', '50%'],
		correctAnswer: 1,
		emoji: '%',
		pack: 'math',
		explanation: 'Increase of 10 on 50: 10 ÷ 50 = 20%'
	},
	{
		id: 150,
		type: 'math',
		question: 'What is the area of a triangle with base 6 and height 8?',
		options: ['12', '24', '36', '48'],
		correctAnswer: 1,
		emoji: '📐',
		pack: 'math',
		explanation: 'Area = 1/2 × base × height = 1/2 × 6 × 8 = 24'
	},
	{
		id: 151,
		type: 'math',
		question: 'What is 7 × 8?',
		options: ['54', '56', '58', '64'],
		correctAnswer: 1,
		emoji: '✖️',
		pack: 'math',
		explanation: '7 × 8 = 56'
	},
	{
		id: 152,
		type: 'math',
		question: 'If 3x = 24, what is x?',
		options: ['6', '7', '8', '9'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: 'Divide both sides by 3: x = 24 ÷ 3 = 8'
	},
	{
		id: 153,
		type: 'logic',
		question: 'What comes next? 1, 4, 9, 16, 25, 36, ___',
		options: ['42', '48', '49', '64'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'math',
		explanation: 'These are perfect squares: 7 squared is 49'
	},
	{
		id: 154,
		type: 'math',
		question: 'What is the average of 10, 20, 30 and 40?',
		options: ['20', '25', '30', '100'],
		correctAnswer: 1,
		emoji: '📊',
		pack: 'math',
		explanation: 'The sum is 100, divided by 4 numbers gives an average of 25'
	},
	{
		id: 155,
		type: 'math',
		question: 'A $40 shirt is 25% off. What is the sale price?',
		options: ['$10', '$30', '$32', '$35'],
		correctAnswer: 1,
		emoji: '👕',
		pack: 'math',
		explanation: '25% of 40 is 10, so the shirt costs 40 - 10 = 30'
	},
	{
		id: 156,
		type: 'logic',
		question: 'Which fraction is the smallest?',
		options: ['1/2', '1/3', '1/4', '2/5'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'math',
		explanation: 'One quarter is 0.25, smaller than 0.333, 0.4 or 0.5'
	},
	{
		id: 157,
		type: 'math',
		question: 'What is 0.5 written as a percentage?',
		options: ['5%', '50%', '0.5%', '500%'],
		correctAnswer: 1,
		emoji: '💯',
		pack: 'math',
		explanation: 'To turn a decimal into a percentage, multiply by 100: 0.5 = 50%'
	},
	{
		id: 158,
		type: 'math',
		question: 'How many degrees are in a right angle?',
		options: ['45', '90', '180', '360'],
		correctAnswer: 1,
		emoji: '📐',
		pack: 'math',
		explanation: 'A right angle, like the corner of a square, measures 90 degrees'
	},
	{
		id: 159,
		type: 'math',
		question: 'What is the next prime number after 11?',
		options: ['12', '13', '14', '15'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'math',
		explanation: '12 and 14 are divisible by 2, and 15 by 3; 13 is prime'
	},
	{
		id: 160,
		type: 'logic',
		question: 'If 5x − 2 = 3x + 10, what is x?',
		options: ['4', '6', '8', '12'],
		correctAnswer: 1,
		emoji: '⚖️',
		pack: 'math',
		explanation: 'Subtract 3x from both sides: 2x − 2 = 10, so 2x = 12 and x = 6'
	}
];
