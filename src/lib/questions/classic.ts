import type { Question } from './types';

export const classic: Question[] = [
	{
		id: 1,
		type: 'logic',
		question: 'What comes next in the sequence? 2, 4, 8, 16, ___',
		options: ['24', '32', '20', '30'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'Each number doubles: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
	},
	{
		id: 2,
		type: 'verbal',
		question: 'Book is to Reading as Fork is to:',
		options: ['Drawing', 'Writing', 'Stirring', 'Eating'],
		correctAnswer: 3,
		emoji: '📖',
		pack: 'classic',
		explanation: 'A fork is a tool used for eating, just as a book is used for reading'
	},
	{
		id: 3,
		type: 'math',
		question:
			'If 5 machines make 5 widgets in 5 minutes, how long does it take 100 machines to make 100 widgets?',
		options: ['100 minutes', '5 minutes', '20 minutes', '1 minute'],
		correctAnswer: 1,
		emoji: '⚙️',
		pack: 'classic',
		explanation:
			'Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes'
	},
	{
		id: 4,
		type: 'logic',
		question: 'Which one is different? Apple, Banana, Carrot, Orange',
		options: ['Apple', 'Banana', 'Carrot', 'Orange'],
		correctAnswer: 2,
		emoji: '🥕',
		pack: 'classic',
		explanation: 'Carrot is a vegetable; the others are fruits'
	},
	{
		id: 5,
		type: 'verbal',
		question: 'What is the opposite of ZENITH?',
		options: ['Nadir', 'Peak', 'Summit', 'Top'],
		correctAnswer: 0,
		emoji: '⬆️',
		pack: 'classic',
		explanation: 'Zenith means the highest point; nadir means the lowest point'
	},
	{
		id: 6,
		type: 'logic',
		question: 'Complete: 1, 1, 2, 3, 5, 8, ___',
		options: ['11', '13', '15', '10'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'Fibonacci sequence: each number is the sum of the two preceding ones (5+8=13)'
	},
	{
		id: 7,
		type: 'math',
		question: 'A train travels 60 miles in 1.5 hours. What is its speed in mph?',
		options: ['30', '40', '45', '50'],
		correctAnswer: 1,
		emoji: '🚂',
		pack: 'classic',
		explanation: 'Speed = Distance ÷ Time = 60 ÷ 1.5 = 40 mph'
	},
	{
		id: 8,
		type: 'verbal',
		question: 'Ocean is to Water as Desert is to:',
		options: ['Hot', 'Sand', 'Dry', 'Cactus'],
		correctAnswer: 1,
		emoji: '🏜️',
		pack: 'classic',
		explanation:
			'Water is the primary substance in an ocean; sand is the primary substance in a desert'
	},
	{
		id: 9,
		type: 'logic',
		question:
			'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:',
		options: ['Lazzies', 'Not Lazzies', 'Blue', 'Razzies only'],
		correctAnswer: 0,
		emoji: '🤔',
		pack: 'classic',
		explanation: 'Transitive property: if A→B and B→C, then A→C'
	},
	{
		id: 10,
		type: 'math',
		question: 'What is 15% of 200?',
		options: ['20', '25', '30', '35'],
		correctAnswer: 2,
		emoji: '💯',
		pack: 'classic',
		explanation: '15% of 200 = 0.15 × 200 = 30'
	},
	{
		id: 11,
		type: 'logic',
		question: 'Which number should replace the question mark? 3, 6, 12, 24, ?',
		options: ['36', '48', '40', '52'],
		correctAnswer: 1,
		emoji: '❓',
		pack: 'classic',
		explanation: 'Each number doubles: 24×2=48'
	},
	{
		id: 12,
		type: 'verbal',
		question: 'Happy is to Sad as Hot is to:',
		options: ['Warm', 'Cold', 'Fire', 'Summer'],
		correctAnswer: 1,
		emoji: '🌡️',
		pack: 'classic',
		explanation: 'These are opposite pairs: happy/sad and hot/cold'
	},
	{
		id: 13,
		type: 'math',
		question: 'If x + 5 = 12, what is x?',
		options: ['5', '6', '7', '8'],
		correctAnswer: 2,
		emoji: '✖️',
		pack: 'classic',
		explanation: 'x = 12 - 5 = 7'
	},
	{
		id: 14,
		type: 'logic',
		question: 'Which shape comes next? Circle, Square, Circle, Square, Circle, ___',
		options: ['Circle', 'Square', 'Triangle', 'Pentagon'],
		correctAnswer: 1,
		emoji: '⬜',
		pack: 'classic',
		explanation: 'Alternating pattern: circle, square, circle, square...'
	},
	{
		id: 15,
		type: 'verbal',
		question: 'Synonym of ABUNDANT:',
		options: ['Scarce', 'Plentiful', 'Tiny', 'Rare'],
		correctAnswer: 1,
		emoji: '📝',
		pack: 'classic',
		explanation: 'Abundant and plentiful both mean available in large quantities'
	},
	{
		id: 16,
		type: 'logic',
		question: 'What is the next letter? A, C, E, G, ___',
		options: ['H', 'I', 'J', 'K'],
		correctAnswer: 1,
		emoji: '🔤',
		pack: 'classic',
		explanation: 'Skipping one letter each time: A(b)C(d)E(f)G(h)I'
	},
	{
		id: 17,
		type: 'math',
		question: 'What is 8² (8 squared)?',
		options: ['16', '64', '32', '48'],
		correctAnswer: 1,
		emoji: '²',
		pack: 'classic',
		explanation: '8² = 8 × 8 = 64'
	},
	{
		id: 18,
		type: 'verbal',
		question: 'Dog is to Puppy as Cat is to:',
		options: ['Kitten', 'Pet', 'Meow', 'Mouse'],
		correctAnswer: 0,
		emoji: '🐱',
		pack: 'classic',
		explanation: 'A puppy is a young dog; a kitten is a young cat'
	},
	{
		id: 19,
		type: 'logic',
		question: 'Which is the odd one out? 2, 4, 6, 9, 12',
		options: ['2', '4', '9', '12'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'classic',
		explanation: '9 is the only odd number in the sequence'
	},
	{
		id: 20,
		type: 'math',
		question: 'If a rectangle has length 8 and width 3, what is its area?',
		options: ['11', '22', '24', '26'],
		correctAnswer: 2,
		emoji: '📐',
		pack: 'classic',
		explanation: 'Area = length × width = 8 × 3 = 24'
	},
	{
		id: 21,
		type: 'logic',
		question: 'Complete the pattern: 100, 81, 64, 49, ___',
		options: ['36', '40', '32', '25'],
		correctAnswer: 0,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'Perfect squares in reverse: 10², 9², 8², 7², 6²=36'
	},
	{
		id: 22,
		type: 'verbal',
		question: 'Antonym of EXPAND:',
		options: ['Grow', 'Contract', 'Inflate', 'Enlarge'],
		correctAnswer: 1,
		emoji: '↔️',
		pack: 'classic',
		explanation: 'Expand means to grow larger; contract means to become smaller'
	},
	{
		id: 23,
		type: 'math',
		question: 'What is 3/4 as a percentage?',
		options: ['70%', '75%', '80%', '85%'],
		correctAnswer: 1,
		emoji: '%',
		pack: 'classic',
		explanation: '3/4 = 0.75 = 75%'
	},
	{
		id: 24,
		type: 'logic',
		question: 'If Tom is taller than Jerry, and Jerry is taller than Spike, who is shortest?',
		options: ['Tom', 'Jerry', 'Spike', 'Cannot tell'],
		correctAnswer: 2,
		emoji: '📏',
		pack: 'classic',
		explanation: 'Tom > Jerry > Spike, so Spike is shortest'
	},
	{
		id: 25,
		type: 'verbal',
		question: 'Which word does NOT belong? Run, Jump, Skip, Table',
		options: ['Run', 'Jump', 'Skip', 'Table'],
		correctAnswer: 3,
		emoji: '🏃',
		pack: 'classic',
		explanation: 'Run, jump, and skip are actions; table is an object'
	},
	{
		id: 26,
		type: 'logic',
		question: 'What comes next? J, F, M, A, M, ___',
		options: ['J', 'A', 'S', 'N'],
		correctAnswer: 0,
		emoji: '📅',
		pack: 'classic',
		explanation: 'First letters of months: January, February, March, April, May, June'
	},
	{
		id: 27,
		type: 'math',
		question: 'If 3x = 27, what is x?',
		options: ['7', '8', '9', '10'],
		correctAnswer: 2,
		emoji: '➗',
		pack: 'classic',
		explanation: 'x = 27 ÷ 3 = 9'
	},
	{
		id: 28,
		type: 'verbal',
		question: 'Wheel is to Car as Wing is to:',
		options: ['Bird', 'Fly', 'Feather', 'Sky'],
		correctAnswer: 0,
		emoji: '🚗',
		pack: 'classic',
		explanation: 'Wheels enable a car to move; wings enable a bird to fly'
	},
	{
		id: 29,
		type: 'logic',
		question: 'Which number is missing? 5, 10, 20, 40, ___',
		options: ['60', '70', '80', '90'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'Each number doubles: 40×2=80'
	},
	{
		id: 30,
		type: 'math',
		question: 'What is the average of 10, 20, and 30?',
		options: ['15', '20', '25', '30'],
		correctAnswer: 1,
		emoji: '➗',
		pack: 'classic',
		explanation: 'Average = (10+20+30) ÷ 3 = 60 ÷ 3 = 20'
	},
	{
		id: 81,
		type: 'logic',
		question: 'What comes next in the sequence? 3, 5, 9, 17, 33, ___',
		options: ['61', '65', '64', '48'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'The gaps double each time: +2, +4, +8, +16, so 33 + 32 = 65'
	},
	{
		id: 82,
		type: 'verbal',
		question: 'Carpenter is to Hammer as Surgeon is to:',
		options: ['Scalpel', 'Needle', 'Saw', 'Stethoscope'],
		correctAnswer: 0,
		emoji: '🔨',
		pack: 'classic',
		explanation: "A hammer is the carpenter's signature tool; a scalpel is the surgeon's"
	},
	{
		id: 83,
		type: 'math',
		question: 'What is the value of 7 + 3 × 4 − 2?',
		options: ['20', '17', '38', '29'],
		correctAnswer: 1,
		emoji: '🧮',
		pack: 'classic',
		explanation: 'Multiply first (order of operations): 3×4=12, then 7 + 12 − 2 = 17'
	},
	{
		id: 84,
		type: 'logic',
		question: 'Which is the odd one out? Triangle, Square, Pentagon, Circle',
		options: ['Triangle', 'Square', 'Pentagon', 'Circle'],
		correctAnswer: 3,
		emoji: '⭕',
		pack: 'classic',
		explanation: 'The circle is the only shape with no straight sides or angles'
	},
	{
		id: 85,
		type: 'verbal',
		question: 'Synonym of CANDID:',
		options: ['Secret', 'Honest', 'Rude', 'Careful'],
		correctAnswer: 1,
		emoji: '🗣️',
		pack: 'classic',
		explanation: 'Candid means frank and straightforward, which is closest to honest'
	},
	{
		id: 86,
		type: 'math',
		question: 'If 7x − 14 = 35, what is x?',
		options: ['5', '6', '7', '9'],
		correctAnswer: 2,
		emoji: '✖️',
		pack: 'classic',
		explanation: 'Add 14 to both sides: 7x = 49, so x = 49 ÷ 7 = 7'
	},
	{
		id: 87,
		type: 'logic',
		question: 'What is the next letter? B, D, G, K, ___',
		options: ['L', 'M', 'N', 'P'],
		correctAnswer: 3,
		emoji: '🔤',
		pack: 'classic',
		explanation: 'The gap grows by one each time: +2, +3, +4, so K + 5 = P'
	},
	{
		id: 88,
		type: 'verbal',
		question: 'Antonym of FRUGAL:',
		options: ['Stingy', 'Generous', 'Wealthy', 'Thrifty'],
		correctAnswer: 1,
		emoji: '💰',
		pack: 'classic',
		explanation: 'Frugal means careful with money; generous is its opposite in spending'
	},
	{
		id: 89,
		type: 'math',
		question: 'A dozen eggs cost $4.80. What does one egg cost?',
		options: ['$0.20', '$0.30', '$0.40', '$0.50'],
		correctAnswer: 2,
		emoji: '🥚',
		pack: 'classic',
		explanation: 'A dozen is 12, so 4.80 ÷ 12 = $0.40 per egg'
	},
	{
		id: 90,
		type: 'logic',
		question: 'Which word reads the same backward as forward?',
		options: ['ROBOT', 'RADAR', 'ROCKET', 'RIVER'],
		correctAnswer: 1,
		emoji: '🪞',
		pack: 'classic',
		explanation: 'RADAR is a palindrome: R-A-D-A-R reversed is still R-A-D-A-R'
	},
	{
		id: 91,
		type: 'logic',
		question: 'What comes next in the sequence? 1, 4, 9, 16, 25, ___',
		options: ['30', '36', '42', '49'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'These are perfect squares: 6 squared is 36'
	},
	{
		id: 92,
		type: 'verbal',
		question: 'Healthy is to Sick as Generous is to:',
		options: ['Wealthy', 'Stingy', 'Kind', 'Selfish'],
		correctAnswer: 1,
		emoji: '🎁',
		pack: 'classic',
		explanation: 'Stingy is the opposite of generous, as sick is the opposite of healthy'
	},
	{
		id: 93,
		type: 'math',
		question: 'If you double a number and add 4, you get 20. What is the number?',
		options: ['6', '8', '10', '12'],
		correctAnswer: 1,
		emoji: '➗',
		pack: 'classic',
		explanation: 'Work backward: 20 - 4 = 16, and half of 16 is 8'
	},
	{
		id: 94,
		type: 'logic',
		question: 'Which one does not belong with the others?',
		options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
		correctAnswer: 2,
		emoji: '⭕',
		pack: 'classic',
		explanation: 'A circle has no straight sides; the others are made of straight lines'
	},
	{
		id: 95,
		type: 'verbal',
		question: 'Which word means "to make smaller"?',
		options: ['Expand', 'Reduce', 'Inflate', 'Enlarge'],
		correctAnswer: 1,
		emoji: '⬇️',
		pack: 'classic',
		explanation: 'To reduce something is to make it smaller'
	},
	{
		id: 96,
		type: 'math',
		question: 'What is the next prime number after 13?',
		options: ['14', '15', '17', '19'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'classic',
		explanation: '14, 15 and 16 are all divisible by smaller numbers; 17 is prime'
	},
	{
		id: 97,
		type: 'logic',
		question: 'Rearrange the letters of LISTEN to form another word:',
		options: ['SILENT', 'LISTED', 'TASTED', 'RESTED'],
		correctAnswer: 0,
		emoji: '🔤',
		pack: 'classic',
		explanation: 'SILENT uses exactly the same letters as LISTEN: L, I, S, T, E, N'
	},
	{
		id: 98,
		type: 'math',
		question: 'At 3:15, what is the smaller angle between the hour and minute hands of a clock?',
		options: ['0°', '7.5°', '15°', '30°'],
		correctAnswer: 1,
		emoji: '🕐',
		pack: 'classic',
		explanation: 'The minute hand is at 90°; the hour hand has moved to 97.5°, a gap of 7.5°'
	},
	{
		id: 99,
		type: 'verbal',
		question: 'Benevolent most nearly means:',
		options: ['Cruel', 'Kind', 'Selfish', 'Wealthy'],
		correctAnswer: 1,
		emoji: '💖',
		pack: 'classic',
		explanation: 'A benevolent person is kind and generous'
	},
	{
		id: 100,
		type: 'logic',
		question: 'If the day after tomorrow is Friday, what day is it today?',
		options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
		correctAnswer: 2,
		emoji: '📅',
		pack: 'classic',
		explanation: 'Tomorrow is Thursday, so today is Wednesday'
	},
	{
		id: 101,
		type: 'logic',
		question: 'What comes next in the sequence? 2, 6, 12, 20, 30, ___',
		options: ['36', '40', '42', '48'],
		correctAnswer: 2,
		emoji: '🔢',
		pack: 'classic',
		explanation:
			'The gaps grow by 2 each time (4, 6, 8, 10), so the next gap is 12 and 30 + 12 = 42'
	},
	{
		id: 102,
		type: 'verbal',
		question: 'Doctor is to Patient as Teacher is to:',
		options: ['Student', 'School', 'Book', 'Class'],
		correctAnswer: 0,
		emoji: '🧑‍🏫',
		pack: 'classic',
		explanation: 'A doctor treats a patient; a teacher teaches a student'
	},
	{
		id: 103,
		type: 'math',
		question: 'A pizza is cut into 8 equal slices. If you eat 3, what fraction remains?',
		options: ['3/8', '5/8', '1/2', '3/5'],
		correctAnswer: 1,
		emoji: '🍕',
		pack: 'classic',
		explanation: '8 - 3 = 5 slices remain out of 8, so 5/8'
	},
	{
		id: 104,
		type: 'logic',
		question: 'Which number is the odd one out? 3, 5, 7, 9, 11',
		options: ['3', '5', '9', '11'],
		correctAnswer: 2,
		emoji: '🤔',
		pack: 'classic',
		explanation: '9 = 3 × 3 is not prime; the others are all prime numbers'
	},
	{
		id: 105,
		type: 'verbal',
		question: 'Which word is a synonym for "difficult"?',
		options: ['Easy', 'Hard', 'Simple', 'Quick'],
		correctAnswer: 1,
		emoji: '💪',
		pack: 'classic',
		explanation: 'Hard means the same as difficult'
	},
	{
		id: 106,
		type: 'math',
		question: 'If 4 apples cost $2.00, how much do 10 apples cost?',
		options: ['$4.00', '$5.00', '$6.00', '$2.50'],
		correctAnswer: 1,
		emoji: '🍎',
		pack: 'classic',
		explanation: 'Each apple is 2.00 ÷ 4 = $0.50, so 10 apples cost 10 × 0.50 = $5.00'
	},
	{
		id: 107,
		type: 'logic',
		question: 'A is taller than B. B is taller than C. Who is the shortest?',
		options: ['A', 'B', 'C', 'Cannot tell'],
		correctAnswer: 2,
		emoji: '📏',
		pack: 'classic',
		explanation: 'A > B > C, so C is the shortest'
	},
	{
		id: 108,
		type: 'verbal',
		question: 'Which word means "an animal that eats only plants"?',
		options: ['Carnivore', 'Omnivore', 'Herbivore', 'Insectivore'],
		correctAnswer: 2,
		emoji: '🥬',
		pack: 'classic',
		explanation: 'Herbivores eat plants; carnivores eat meat and omnivores eat both'
	},
	{
		id: 109,
		type: 'math',
		question: 'What is 25% of 80?',
		options: ['15', '20', '25', '40'],
		correctAnswer: 1,
		emoji: '💯',
		pack: 'classic',
		explanation: '25% is one quarter: 80 ÷ 4 = 20'
	},
	{
		id: 110,
		type: 'logic',
		question: 'Complete the series: 5, 10, 20, 40, ___',
		options: ['50', '60', '70', '80'],
		correctAnswer: 3,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'Each number doubles: 40 × 2 = 80'
	},
	{
		id: 111,
		type: 'verbal',
		question: 'Knitter is to Needles as Painter is to:',
		options: ['Canvas', 'Brush', 'Colors', 'Easel'],
		correctAnswer: 1,
		emoji: '🖌️',
		pack: 'classic',
		explanation: 'A painter uses a brush, as a knitter uses needles'
	},
	{
		id: 112,
		type: 'math',
		question: 'The sum of three consecutive numbers is 36. What is the largest?',
		options: ['12', '13', '14', '15'],
		correctAnswer: 1,
		emoji: '➗',
		pack: 'classic',
		explanation: 'The middle number is 36 ÷ 3 = 12, so the numbers are 11, 12 and 13'
	},
	{
		id: 113,
		type: 'logic',
		question: 'In a race, you overtake the runner in 2nd place. What position are you in now?',
		options: ['1st', '2nd', '3rd', 'Last'],
		correctAnswer: 1,
		emoji: '🏃',
		pack: 'classic',
		explanation: 'You take their place, so you are now 2nd'
	},
	{
		id: 114,
		type: 'verbal',
		question: 'Which word is the odd one out?',
		options: ['Quick', 'Fast', 'Rapid', 'Slow'],
		correctAnswer: 3,
		emoji: '🐢',
		pack: 'classic',
		explanation: 'Quick, fast and rapid all mean speedy; slow is the opposite'
	},
	{
		id: 115,
		type: 'math',
		question: 'A rectangle has length 8 and width 5. What is its perimeter?',
		options: ['13', '26', '32', '40'],
		correctAnswer: 1,
		emoji: '▭️',
		pack: 'classic',
		explanation: 'Perimeter = 2 × (length + width) = 2 × 13 = 26'
	},
	{
		id: 116,
		type: 'logic',
		question: 'Rearrange the letters of DEAL to form another word:',
		options: ['LEAD', 'DELL', 'LADY', 'PALE'],
		correctAnswer: 0,
		emoji: '🔤',
		pack: 'classic',
		explanation: 'LEAD uses exactly the letters D, E, A, L'
	},
	{
		id: 117,
		type: 'verbal',
		question: 'Vivacious most nearly means:',
		options: ['Dull', 'Lively', 'Angry', 'Tired'],
		correctAnswer: 1,
		emoji: '✨',
		pack: 'classic',
		explanation: 'A vivacious person is lively and full of energy'
	},
	{
		id: 118,
		type: 'math',
		question: 'What is the next number? 81, 64, 49, 36, ___',
		options: ['30', '25', '16', '20'],
		correctAnswer: 1,
		emoji: '🔢',
		pack: 'classic',
		explanation: 'These are squares counting down: 9², 8², 7², 6², then 5² = 25'
	},
	{
		id: 119,
		type: 'logic',
		question: 'Which shape has the most sides?',
		options: ['Triangle', 'Square', 'Hexagon', 'Pentagon'],
		correctAnswer: 2,
		emoji: '⬡',
		pack: 'classic',
		explanation: 'A hexagon has 6 sides, more than a pentagon (5), square (4) or triangle (3)'
	},
	{
		id: 120,
		type: 'verbal',
		question: 'Genuine most nearly means:',
		options: ['Fake', 'Authentic', 'Costly', 'Rare'],
		correctAnswer: 1,
		emoji: '💎',
		pack: 'classic',
		explanation: 'Something genuine is real and authentic, not fake'
	}
];
