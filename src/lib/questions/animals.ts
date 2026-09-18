import type { Question } from './types';

export const animals: Question[] = [
	{
		id: 41,
		type: 'logic',
		question:
			'If a cat has 4 legs and a spider has 8 legs, how many legs do 3 cats and 2 spiders have?',
		options: ['24', '28', '32', '20'],
		correctAnswer: 1,
		emoji: '🐱',
		pack: 'animals',
		explanation: '(3×4) + (2×8) = 12 + 16 = 28 legs'
	},
	{
		id: 42,
		type: 'verbal',
		question: 'Bird is to Nest as Bee is to:',
		options: ['Honey', 'Hive', 'Flower', 'Sting'],
		correctAnswer: 1,
		emoji: '🐝',
		pack: 'animals',
		explanation: 'A bird lives in a nest; a bee lives in a hive'
	},
	{
		id: 43,
		type: 'math',
		question: 'A lion sleeps 20 hours a day. How many hours is it awake?',
		options: ['2', '3', '4', '5'],
		correctAnswer: 2,
		emoji: '🦁',
		pack: 'animals',
		explanation: '24 - 20 = 4 hours awake'
	},
	{
		id: 44,
		type: 'logic',
		question: 'Which animal does NOT lay eggs? Duck, Platypus, Penguin, Dolphin',
		options: ['Duck', 'Platypus', 'Penguin', 'Dolphin'],
		correctAnswer: 3,
		emoji: '🥚',
		pack: 'animals',
		explanation: 'Dolphins are mammals that give live birth; the others lay eggs'
	},
	{
		id: 45,
		type: 'verbal',
		question: 'Fast is to Cheetah as Slow is to:',
		options: ['Turtle', 'Rabbit', 'Horse', 'Bird'],
		correctAnswer: 0,
		emoji: '🐆',
		pack: 'animals',
		explanation: 'Cheetahs are known for being fast; turtles are known for being slow'
	},
	{
		id: 46,
		type: 'math',
		question: 'If a frog can jump 3 meters and makes 5 jumps, how far does it travel?',
		options: ['8 m', '12 m', '15 m', '18 m'],
		correctAnswer: 2,
		emoji: '🐸',
		pack: 'animals',
		explanation: '3 × 5 = 15 meters'
	},
	{
		id: 47,
		type: 'logic',
		question: 'What comes next? Caterpillar, Cocoon, ___',
		options: ['Butterfly', 'Worm', 'Moth', 'Bee'],
		correctAnswer: 0,
		emoji: '🦋',
		pack: 'animals',
		explanation: 'Life cycle: caterpillar → cocoon → butterfly'
	},
	{
		id: 48,
		type: 'verbal',
		question: 'Pack is to Wolves as Pride is to:',
		options: ['Tigers', 'Lions', 'Bears', 'Eagles'],
		correctAnswer: 1,
		emoji: '🦁',
		pack: 'animals',
		explanation: 'A group of wolves is a pack; a group of lions is a pride'
	},
	{
		id: 49,
		type: 'math',
		question: 'A bird lays 4 eggs per nest. How many eggs in 6 nests?',
		options: ['10', '20', '24', '28'],
		correctAnswer: 2,
		emoji: '🪺',
		pack: 'animals',
		explanation: '4 × 6 = 24 eggs'
	},
	{
		id: 50,
		type: 'logic',
		question: 'Which animal is NOT a mammal? Whale, Bat, Eagle, Elephant',
		options: ['Whale', 'Bat', 'Eagle', 'Elephant'],
		correctAnswer: 2,
		emoji: '🦅',
		pack: 'animals',
		explanation: 'Eagles are birds; whales, bats, and elephants are all mammals'
	},
	{
		id: 111,
		type: 'logic',
		question: 'Which animal does NOT live in the ocean? Shark, Octopus, Whale, Elephant',
		options: ['Shark', 'Octopus', 'Whale', 'Elephant'],
		correctAnswer: 3,
		emoji: '🦈',
		pack: 'animals',
		explanation: 'Elephants live on land; sharks, octopuses, and whales all live in the ocean'
	},
	{
		id: 112,
		type: 'logic',
		question: 'What comes next? Egg, Tadpole, Froglet, ___',
		options: ['Frog', 'Fish', 'Salamander', 'Snake'],
		correctAnswer: 0,
		emoji: '🐸',
		pack: 'animals',
		explanation: 'Life cycle: egg → tadpole → froglet → frog'
	},
	{
		id: 113,
		type: 'logic',
		question: 'Which bird cannot fly? Sparrow, Penguin, Robin, Crow',
		options: ['Sparrow', 'Penguin', 'Robin', 'Crow'],
		correctAnswer: 1,
		emoji: '🐧',
		pack: 'animals',
		explanation: 'Penguins have flippers suited for swimming, not wings for flight'
	},
	{
		id: 114,
		type: 'logic',
		question: 'Which animal has the most legs? Ant (6), Spider (8), Crab (10), Dog (4)',
		options: ['Ant', 'Spider', 'Crab', 'Dog'],
		correctAnswer: 2,
		emoji: '🦀',
		pack: 'animals',
		explanation: 'Crabs are decapods with 10 legs, more than ants (6), spiders (8), or dogs (4)'
	},
	{
		id: 115,
		type: 'logic',
		question: 'Which animal is nocturnal? Eagle, Cow, Owl, Sheep',
		options: ['Eagle', 'Cow', 'Owl', 'Sheep'],
		correctAnswer: 2,
		emoji: '🦉',
		pack: 'animals',
		explanation: 'Owls hunt at night; eagles, cows, and sheep are active during the day'
	},
	{
		id: 116,
		type: 'logic',
		question: 'Which animal does NOT hibernate? Bear, Bat, Hedgehog, Lion',
		options: ['Bear', 'Bat', 'Hedgehog', 'Lion'],
		correctAnswer: 3,
		emoji: '🐻',
		pack: 'animals',
		explanation: 'Bears, bats, and hedgehogs hibernate; lions stay active year-round'
	},
	{
		id: 117,
		type: 'logic',
		question: 'Which bird lays the largest egg? Ostrich, Chicken, Hummingbird, Duck',
		options: ['Ostrich', 'Chicken', 'Hummingbird', 'Duck'],
		correctAnswer: 0,
		emoji: '🪿',
		pack: 'animals',
		explanation: 'The ostrich lays the largest egg of any living bird'
	},
	{
		id: 118,
		type: 'logic',
		question: 'Which animal is NOT a reptile? Snake, Lizard, Turtle, Frog',
		options: ['Snake', 'Lizard', 'Turtle', 'Frog'],
		correctAnswer: 3,
		emoji: '🦎',
		pack: 'animals',
		explanation: 'Frogs are amphibians; snakes, lizards, and turtles are reptiles'
	},
	{
		id: 119,
		type: 'verbal',
		question: 'Pod is to Dolphins as Gaggle is to:',
		options: ['Geese', 'Crows', 'Swans', 'Ducks'],
		correctAnswer: 0,
		emoji: '🦆',
		pack: 'animals',
		explanation: 'A group of dolphins is a pod; a group of geese on the ground is a gaggle'
	},
	{
		id: 120,
		type: 'verbal',
		question: 'Flock is to Birds as School is to:',
		options: ['Fish', 'Whales', 'Sharks', 'Frogs'],
		correctAnswer: 0,
		emoji: '🐟',
		pack: 'animals',
		explanation: 'A group of birds is a flock; a group of fish is a school'
	},
	{
		id: 121,
		type: 'verbal',
		question: 'Buzz is to Bee as Chirp is to:',
		options: ['Cricket', 'Frog', 'Snake', 'Eagle'],
		correctAnswer: 0,
		emoji: '🦗',
		pack: 'animals',
		explanation: 'Bees buzz; crickets chirp by rubbing their wings together'
	},
	{
		id: 122,
		type: 'verbal',
		question: 'Hoof is to Horse as Paw is to:',
		options: ['Bird', 'Dog', 'Fish', 'Snake'],
		correctAnswer: 1,
		emoji: '🐕',
		pack: 'animals',
		explanation: 'A horse has hooves; a dog has paws'
	},
	{
		id: 123,
		type: 'verbal',
		question: 'Camel is to Desert as Polar Bear is to:',
		options: ['Arctic', 'Jungle', 'Ocean', 'Forest'],
		correctAnswer: 0,
		emoji: '🐻‍❄️',
		pack: 'animals',
		explanation: 'Camels are adapted to deserts; polar bears live in the Arctic'
	},
	{
		id: 124,
		type: 'verbal',
		question: 'Owl is to Night as Eagle is to:',
		options: ['Day', 'Sky', 'Mountain', 'Tree'],
		correctAnswer: 0,
		emoji: '🦅',
		pack: 'animals',
		explanation: 'Owls hunt at night; eagles hunt during the day'
	},
	{
		id: 125,
		type: 'math',
		question: 'An elephant eats 150 kg of food a day. How much does it eat in 4 days?',
		options: ['450 kg', '500 kg', '600 kg', '750 kg'],
		correctAnswer: 2,
		emoji: '🐘',
		pack: 'animals',
		explanation: '150 × 4 = 600 kg'
	},
	{
		id: 126,
		type: 'math',
		question: 'A horse gallops at 40 km/h. How far does it travel in 30 minutes?',
		options: ['10 km', '20 km', '30 km', '40 km'],
		correctAnswer: 1,
		emoji: '🐎',
		pack: 'animals',
		explanation: '30 minutes is half an hour, so 40 ÷ 2 = 20 km'
	},
	{
		id: 127,
		type: 'math',
		question: 'A queen bee lays 2000 eggs a day. How many eggs does she lay in 3 days?',
		options: ['4000', '5000', '6000', '8000'],
		correctAnswer: 2,
		emoji: '👑',
		pack: 'animals',
		explanation: '2000 × 3 = 6000 eggs'
	},
	{
		id: 128,
		type: 'math',
		question:
			'A crocodile has 80 teeth. It sheds 40 of them and grows them back. How many teeth does it have now?',
		options: ['40', '60', '80', '120'],
		correctAnswer: 2,
		emoji: '🐊',
		pack: 'animals',
		explanation: 'The 40 lost teeth grow back, so it still has 80 teeth'
	},
	{
		id: 129,
		type: 'math',
		question:
			'A tree branch holds 12 birds. 5 fly away, then 3 more land. How many birds are on the branch?',
		options: ['8', '10', '14', '15'],
		correctAnswer: 1,
		emoji: '🐦',
		pack: 'animals',
		explanation: '12 - 5 + 3 = 10 birds'
	},
	{
		id: 130,
		type: 'math',
		question: 'An octopus has 8 arms. How many arms do 5 octopuses have?',
		options: ['32', '36', '40', '48'],
		correctAnswer: 2,
		emoji: '🐙',
		pack: 'animals',
		explanation: '8 × 5 = 40 arms'
	},
	{
		id: 131,
		type: 'logic',
		question: 'Which of these animals is a marsupial?',
		options: ['Koala', 'Rabbit', 'Cat', 'Bat'],
		correctAnswer: 0,
		emoji: '🦘',
		pack: 'animals',
		explanation: 'Koalas carry their young in a pouch, like kangaroos and opossums'
	},
	{
		id: 132,
		type: 'math',
		question:
			'A flock of 24 geese rests by a lake. A quarter of them fly away. How many geese remain?',
		options: ['6', '12', '18', '20'],
		correctAnswer: 2,
		emoji: '🪿',
		pack: 'animals',
		explanation: 'A quarter of 24 is 6, so 24 - 6 = 18 geese remain'
	},
	{
		id: 133,
		type: 'verbal',
		question: 'A nocturnal animal is one that is:',
		options: ['Active at night', 'Active during the day', 'Asleep all year', 'Herbivorous'],
		correctAnswer: 0,
		emoji: '🦉',
		pack: 'animals',
		explanation: 'Nocturnal creatures are active at night, like owls and bats'
	},
	{
		id: 134,
		type: 'logic',
		question: 'Which of these animals cannot jump?',
		options: ['Frog', 'Elephant', 'Kangaroo', 'Rabbit'],
		correctAnswer: 1,
		emoji: '🐘',
		pack: 'animals',
		explanation: 'Elephants are the only land mammals that cannot jump at all'
	},
	{
		id: 135,
		type: 'math',
		question:
			'A common rule of thumb says a dog ages about 7 dog-years per human year. About how old is a 5-year-old dog in dog-years?',
		options: ['25', '30', '35', '40'],
		correctAnswer: 2,
		emoji: '🐕',
		pack: 'animals',
		explanation: '5 × 7 = 35 dog-years'
	},
	{
		id: 136,
		type: 'verbal',
		question: 'Feline is to Cat as Equine is to:',
		options: ['Horse', 'Dog', 'Eagle', 'Shark'],
		correctAnswer: 0,
		emoji: '🐎',
		pack: 'animals',
		explanation: 'An equine is a horse, just as a feline is a cat'
	},
	{
		id: 137,
		type: 'logic',
		question: 'Which of these birds cannot fly?',
		options: ['Robin', 'Penguin', 'Sparrow', 'Eagle'],
		correctAnswer: 1,
		emoji: '🐧',
		pack: 'animals',
		explanation: 'Penguin wings are adapted for swimming, not flying'
	},
	{
		id: 138,
		type: 'math',
		question:
			'A beehive has 60 bees. One third of them are out gathering nectar. How many bees are out?',
		options: ['15', '20', '30', '40'],
		correctAnswer: 1,
		emoji: '🐝',
		pack: 'animals',
		explanation: 'One third of 60 is 60 ÷ 3 = 20 bees'
	},
	{
		id: 139,
		type: 'verbal',
		question: 'A carnivore mainly eats:',
		options: ['Plants', 'Meat', 'Nectar', 'Nothing'],
		correctAnswer: 1,
		emoji: '🥩',
		pack: 'animals',
		explanation: 'Carnivores eat meat; herbivores eat plants'
	},
	{
		id: 140,
		type: 'logic',
		question: 'Which animal is famous for the longest known migration?',
		options: ['Arctic tern', 'Humpback whale', 'Monarch butterfly', 'Salmon'],
		correctAnswer: 0,
		emoji: '🐦',
		pack: 'animals',
		explanation: 'The Arctic tern flies between the Arctic and Antarctic each year'
	}
];
