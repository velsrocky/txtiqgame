import type { Question } from './types';

export const geography: Question[] = [
	{
		id: 1,
		type: 'logic',
		question: 'Which is the largest continent by area?',
		options: ['Africa', 'Asia', 'North America', 'Europe'],
		correctAnswer: 1,
		emoji: '🗺️',
		pack: 'geography',
		explanation: 'Asia is the largest continent, covering about a third of all land'
	},
	{
		id: 2,
		type: 'math',
		question: 'How many continents are there on Earth?',
		options: ['5', '6', '7', '8'],
		correctAnswer: 2,
		emoji: '🌍',
		pack: 'geography',
		explanation:
			'The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America and South America'
	},
	{
		id: 3,
		type: 'verbal',
		question: 'Paris is to France as Tokyo is to:',
		options: ['China', 'Japan', 'Korea', 'Thailand'],
		correctAnswer: 1,
		emoji: '🗼',
		pack: 'geography',
		explanation: 'Tokyo is the capital city of Japan, as Paris is the capital of France'
	},
	{
		id: 4,
		type: 'logic',
		question: 'Which is the largest ocean on Earth?',
		options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
		correctAnswer: 1,
		emoji: '🌊',
		pack: 'geography',
		explanation: 'The Pacific Ocean is larger than all the other oceans combined'
	},
	{
		id: 5,
		type: 'math',
		question: 'The Nile is about 6,650 km long. Rounded to the nearest 1,000 km, that is:',
		options: ['6,000 km', '7,000 km', '6,600 km', '10,000 km'],
		correctAnswer: 1,
		emoji: '🏞️',
		pack: 'geography',
		explanation: '6,650 rounds up to 7,000 to the nearest thousand'
	},
	{
		id: 6,
		type: 'verbal',
		question: 'A peninsula is:',
		options: [
			'Land that juts out into water, surrounded on three sides',
			'A ring-shaped coral island',
			'A deep narrow valley',
			'A flat mountaintop'
		],
		correctAnswer: 0,
		emoji: '🏖️',
		pack: 'geography',
		explanation: 'A peninsula sticks out into the sea and is surrounded by water on three sides'
	},
	{
		id: 7,
		type: 'logic',
		question: 'Which country has the largest population in the world?',
		options: ['China', 'India', 'United States', 'Indonesia'],
		correctAnswer: 1,
		emoji: '🧑‍🤝‍🧑',
		pack: 'geography',
		explanation: 'India passed China in 2023 to become the most populous country'
	},
	{
		id: 8,
		type: 'math',
		question: 'If it is 3 PM in London (UTC+0), what time is it in a city at UTC+5?',
		options: ['8 AM', '8 PM', '10 PM', '2 PM'],
		correctAnswer: 1,
		emoji: '🕐',
		pack: 'geography',
		explanation: 'UTC+5 is 5 hours ahead, so 3 PM becomes 8 PM'
	},
	{
		id: 9,
		type: 'verbal',
		question: 'The equator is at 0° latitude. The prime meridian is at:',
		options: ['0° longitude', '90° latitude', '180° longitude', '45° latitude'],
		correctAnswer: 0,
		emoji: '🧭',
		pack: 'geography',
		explanation: 'The prime meridian is the 0° line of longitude, running through Greenwich'
	},
	{
		id: 10,
		type: 'logic',
		question: 'Which of these is a desert?',
		options: ['Amazon', 'Sahara', 'Pampas', 'Savanna'],
		correctAnswer: 1,
		emoji: '🏜️',
		pack: 'geography',
		explanation: 'The Sahara is the vast hot desert of northern Africa'
	},
	{
		id: 11,
		type: 'math',
		question: 'A flight covers 4,500 km in 5 hours. What is the average speed?',
		options: ['450 km/h', '700 km/h', '900 km/h', '1,000 km/h'],
		correctAnswer: 2,
		emoji: '✈️',
		pack: 'geography',
		explanation: '4,500 ÷ 5 = 900 km/h'
	},
	{
		id: 12,
		type: 'verbal',
		question: 'Archipelago most nearly means:',
		options: [
			'One large island',
			'A chain or group of islands',
			'A tall mountain range',
			'A deep ocean trench'
		],
		correctAnswer: 1,
		emoji: '🏝️',
		pack: 'geography',
		explanation: 'An archipelago is a group of islands, like Hawaii or Indonesia'
	},
	{
		id: 13,
		type: 'logic',
		question: 'Mount Everest stands in which mountain range?',
		options: ['Andes', 'Himalayas', 'Alps', 'Rockies'],
		correctAnswer: 1,
		emoji: '🏔️',
		pack: 'geography',
		explanation: 'Everest, the highest peak above sea level, is in the Himalayas'
	},
	{
		id: 14,
		type: 'math',
		question:
			'The population of Earth is about 8 billion. If roughly half live in Asia, about how many billion is that?',
		options: ['2', '4', '6', '8'],
		correctAnswer: 1,
		emoji: '🌏',
		pack: 'geography',
		explanation: 'Half of 8 billion is 4 billion'
	},
	{
		id: 15,
		type: 'verbal',
		question: 'A tundra is a biome known for:',
		options: [
			'Dense tropical forest',
			'Cold and mostly treeless plains',
			'Hot sandy dunes',
			'Colorful coral reefs'
		],
		correctAnswer: 1,
		emoji: '❄️',
		pack: 'geography',
		explanation: 'Tundras are cold, windy regions where few trees can grow'
	},
	{
		id: 16,
		type: 'logic',
		question: 'Which country is famous for the Great Barrier Reef?',
		options: ['Brazil', 'Australia', 'Mexico', 'Egypt'],
		correctAnswer: 1,
		emoji: '🪸',
		pack: 'geography',
		explanation: 'The Great Barrier Reef stretches along the coast of Australia'
	},
	{
		id: 17,
		type: 'math',
		question:
			'The distance around the equator is about 40,000 km. A satellite circles it in 2 hours. What is its approximate speed?',
		options: ['10,000 km/h', '20,000 km/h', '40,000 km/h', '80,000 km/h'],
		correctAnswer: 1,
		emoji: '🛰️',
		pack: 'geography',
		explanation: '40,000 ÷ 2 = 20,000 km/h'
	},
	{
		id: 18,
		type: 'verbal',
		question: 'Population density means:',
		options: [
			'The total number of people',
			'How many people live per unit of area',
			'The number of births per year',
			'The land area of a country'
		],
		correctAnswer: 1,
		emoji: '🏙️',
		pack: 'geography',
		explanation: 'Density compares a population to the area it occupies'
	},
	{
		id: 19,
		type: 'logic',
		question: 'Which of these rivers is in Africa?',
		options: ['Danube', 'Congo', 'Volga', 'Mekong'],
		correctAnswer: 1,
		emoji: '🌊',
		pack: 'geography',
		explanation: 'The Congo flows through the heart of central Africa'
	},
	{
		id: 20,
		type: 'math',
		question:
			'A map scale reads 1 cm = 10 km. Two cities sit 7.5 cm apart on the map. What is the real distance?',
		options: ['7.5 km', '75 km', '750 km', '17.5 km'],
		correctAnswer: 1,
		emoji: '📏',
		pack: 'geography',
		explanation: '7.5 × 10 = 75 km'
	},
	{
		id: 21,
		type: 'verbal',
		question: 'Monsoon most nearly means:',
		options: [
			'A seasonal wind that brings heavy rains',
			'A permanent field of ice',
			'A dry desert wind',
			'A storm that forms at sea'
		],
		correctAnswer: 0,
		emoji: '🌧️',
		pack: 'geography',
		explanation: 'Monsoons are seasonal winds that bring months of heavy rain'
	},
	{
		id: 22,
		type: 'logic',
		question: 'Which continent contains the most countries?',
		options: ['Africa', 'Asia', 'Europe', 'South America'],
		correctAnswer: 0,
		emoji: '🌍',
		pack: 'geography',
		explanation: 'Africa has 54 countries, more than any other continent'
	},
	{
		id: 23,
		type: 'math',
		question:
			'A country has an area of 500,000 km² and 10 million people. What is the population density?',
		options: ['5 per km²', '20 per km²', '50 per km²', '500 per km²'],
		correctAnswer: 1,
		emoji: '📊',
		pack: 'geography',
		explanation: '10,000,000 ÷ 500,000 = 20 people per square kilometer'
	},
	{
		id: 24,
		type: 'verbal',
		question: 'Latitude measures position:',
		options: [
			'North or south of the equator',
			'East or west of the prime meridian',
			'Height above sea level',
			'Depth below the sea'
		],
		correctAnswer: 0,
		emoji: '🧭',
		pack: 'geography',
		explanation: 'Latitude lines run east to west and measure distance from the equator'
	},
	{
		id: 25,
		type: 'logic',
		question: 'Which of these is NOT a European country?',
		options: ['Spain', 'Portugal', 'Peru', 'Italy'],
		correctAnswer: 2,
		emoji: '🇵🇪',
		pack: 'geography',
		explanation: 'Peru lies in South America; the rest are in Europe'
	},
	{
		id: 26,
		type: 'math',
		question: 'A tourist spends equal time in 4 cities over a 12-day trip. How many days per city?',
		options: ['2', '3', '4', '6'],
		correctAnswer: 1,
		emoji: '🧳',
		pack: 'geography',
		explanation: '12 ÷ 4 = 3 days in each city'
	},
	{
		id: 27,
		type: 'verbal',
		question: 'A river delta is:',
		options: [
			'Land formed where a river splits before entering the sea',
			'A desert hill of sand',
			'A narrow mountain pass',
			'A river that is frozen all year'
		],
		correctAnswer: 0,
		emoji: '🌊',
		pack: 'geography',
		explanation: 'Rivers drop sediment and fan out at their mouth, building a delta'
	},
	{
		id: 28,
		type: 'logic',
		question: 'Which country is famous for its long, deep fjords?',
		options: ['Norway', 'Greece', 'Japan', 'Chile'],
		correctAnswer: 0,
		emoji: '🏔️',
		pack: 'geography',
		explanation: 'Glaciers carved the steep fjords of Norway coastline'
	},
	{
		id: 29,
		type: 'math',
		question: 'On a map, 1 inch equals 50 miles. How far apart are two places 3.5 inches apart?',
		options: ['100 miles', '150 miles', '175 miles', '200 miles'],
		correctAnswer: 2,
		emoji: '🗺️',
		pack: 'geography',
		explanation: '3.5 × 50 = 175 miles'
	},
	{
		id: 30,
		type: 'verbal',
		question: 'A basin is most nearly:',
		options: [
			'A low area that collects water',
			'A flat mountaintop',
			'A narrow sea channel',
			'A dry lake bed'
		],
		correctAnswer: 0,
		emoji: '💧',
		pack: 'geography',
		explanation: 'Basins are low-lying areas that drain water toward a common point'
	},
	{
		id: 31,
		type: 'logic',
		question: 'Which is the smallest continent?',
		options: ['Europe', 'Australia', 'Antarctica', 'South America'],
		correctAnswer: 1,
		emoji: '🦘',
		pack: 'geography',
		explanation: 'Australia is the smallest continent by area'
	},
	{
		id: 32,
		type: 'math',
		question: 'Four cities record temperatures of -5°C, 3°C, -2°C and 4°C. What is the average?',
		options: ['-1°C', '0°C', '1°C', '4°C'],
		correctAnswer: 1,
		emoji: '🌡️',
		pack: 'geography',
		explanation: 'The readings sum to 0, and 0 ÷ 4 = 0°C'
	},
	{
		id: 33,
		type: 'verbal',
		question: 'A glacier is most nearly:',
		options: [
			'A slow-moving river of ice',
			'A sudden heavy snowstorm',
			'A lake of salty water',
			'A steep rocky cliff'
		],
		correctAnswer: 0,
		emoji: '🧊',
		pack: 'geography',
		explanation: 'Glaciers are huge masses of ice that creep slowly downhill'
	},
	{
		id: 34,
		type: 'logic',
		question: 'Which country is shaped like a boot?',
		options: ['Italy', 'Greece', 'Chile', 'Norway'],
		correctAnswer: 0,
		emoji: '🥾',
		pack: 'geography',
		explanation: 'Italy kicks out into the Mediterranean in a familiar boot shape'
	},
	{
		id: 35,
		type: 'math',
		question: 'A car uses 8 liters of fuel per 100 km. How many liters does it need for 350 km?',
		options: ['24 L', '28 L', '32 L', '40 L'],
		correctAnswer: 1,
		emoji: '⛽',
		pack: 'geography',
		explanation: '350 ÷ 100 = 3.5, and 3.5 × 8 = 28 liters'
	},
	{
		id: 36,
		type: 'verbal',
		question: 'A savanna is:',
		options: [
			'Dense wet rainforest',
			'Grassland with scattered trees',
			'A barren sandy desert',
			'A forest of pine trees'
		],
		correctAnswer: 1,
		emoji: '🦒',
		pack: 'geography',
		explanation: 'Savannas are open grasslands dotted with a few trees, like much of Africa'
	},
	{
		id: 37,
		type: 'logic',
		question: 'The Amazon rainforest lies mostly in which continent?',
		options: ['Africa', 'South America', 'Asia', 'Oceania'],
		correctAnswer: 1,
		emoji: '🌳',
		pack: 'geography',
		explanation: 'The Amazon basin spans several countries in South America'
	},
	{
		id: 38,
		type: 'math',
		question:
			'A country had 20 million people in 2020 and 21 million in 2024. What is the percentage increase?',
		options: ['1%', '5%', '10%', '20%'],
		correctAnswer: 1,
		emoji: '📈',
		pack: 'geography',
		explanation: 'The 1 million rise on 20 million is 1 ÷ 20 = 5%'
	},
	{
		id: 39,
		type: 'verbal',
		question: 'Climate differs from weather because climate is:',
		options: [
			'The average pattern measured over years',
			'Only about rainfall',
			'The same everywhere on Earth',
			'Measured from space'
		],
		correctAnswer: 0,
		emoji: '🌦️',
		pack: 'geography',
		explanation: 'Weather is a moment; climate is the long-term average of conditions'
	},
	{
		id: 40,
		type: 'logic',
		question: 'Which of these cities is a national capital?',
		options: ['Sydney', 'Nairobi', 'New York', 'Mumbai'],
		correctAnswer: 1,
		emoji: '🏙️',
		pack: 'geography',
		explanation: 'Nairobi is the capital of Kenya; the others are not their national capitals'
	}
];
