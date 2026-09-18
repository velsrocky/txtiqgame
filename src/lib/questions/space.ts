import type { Question } from './types';

export const space: Question[] = [
	{
		id: 31,
		type: 'logic',
		question:
			'If Earth takes 365 days to orbit the Sun, and Mars takes 687 days, how much longer is a Martian year?',
		options: ['222 days', '322 days', '422 days', '522 days'],
		correctAnswer: 1,
		emoji: '🪐',
		pack: 'space',
		explanation: '687 - 365 = 322 days longer'
	},
	{
		id: 32,
		type: 'verbal',
		question: 'Astronaut is to Space as Sailor is to:',
		options: ['Ship', 'Ocean', 'Captain', 'Port'],
		correctAnswer: 1,
		emoji: '👨🚀',
		pack: 'space',
		explanation: 'An astronaut works in space; a sailor works on the ocean'
	},
	{
		id: 33,
		type: 'math',
		question: 'Light travels at 300,000 km/s. How far does it travel in 2 seconds?',
		options: ['300,000 km', '600,000 km', '900,000 km', '150,000 km'],
		correctAnswer: 1,
		emoji: '💡',
		pack: 'space',
		explanation: 'Distance = Speed × Time = 300,000 × 2 = 600,000 km'
	},
	{
		id: 34,
		type: 'logic',
		question: 'Which planet is known as the Red Planet?',
		options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
		correctAnswer: 1,
		emoji: '🔴',
		pack: 'space',
		explanation: 'Mars appears reddish due to iron oxide (rust) on its surface'
	},
	{
		id: 35,
		type: 'verbal',
		question: 'Galaxy is to Stars as Forest is to:',
		options: ['Trees', 'Green', 'Animals', 'Leaves'],
		correctAnswer: 0,
		emoji: '🌌',
		pack: 'space',
		explanation: 'A galaxy is made up of many stars; a forest is made up of many trees'
	},
	{
		id: 36,
		type: 'math',
		question: 'If a rocket travels at 10 km/s, how long to travel 3,600 km?',
		options: ['6 minutes', '360 seconds', '60 minutes', '36 minutes'],
		correctAnswer: 0,
		emoji: '🚀',
		pack: 'space',
		explanation: 'Time = Distance ÷ Speed = 3600 ÷ 10 = 360 seconds = 6 minutes'
	},
	{
		id: 37,
		type: 'logic',
		question: 'What comes next in the sequence of planets from the Sun? Mercury, Venus, Earth, ___',
		options: ['Mars', 'Jupiter', 'Saturn', 'Uranus'],
		correctAnswer: 0,
		emoji: '☀️',
		pack: 'space',
		explanation: 'The order from the Sun is: Mercury, Venus, Earth, Mars, Jupiter...'
	},
	{
		id: 38,
		type: 'verbal',
		question: 'Crater is to Moon as Mountain is to:',
		options: ['Earth', 'High', 'Snow', 'Climb'],
		correctAnswer: 0,
		emoji: '🌙',
		pack: 'space',
		explanation: 'Craters are surface features on the Moon; mountains are surface features on Earth'
	},
	{
		id: 39,
		type: 'math',
		question: 'If Earth has 1 moon and Mars has 2 moons, how many moons do they have together?',
		options: ['1', '2', '3', '4'],
		correctAnswer: 2,
		emoji: '🌕',
		pack: 'space',
		explanation: '1 + 2 = 3 moons total'
	},
	{
		id: 40,
		type: 'logic',
		question: 'Which is NOT a real space mission? Apollo, Voyager, Galileo, Pegasus',
		options: ['Apollo', 'Voyager', 'Galileo', 'Pegasus'],
		correctAnswer: 3,
		emoji: '🛸',
		pack: 'space',
		explanation: 'Apollo, Voyager, and Galileo were real NASA missions; Pegasus is not'
	},
	{
		id: 91,
		type: 'logic',
		question: 'Which is the largest planet in our solar system?',
		options: ['Saturn', 'Jupiter', 'Neptune', 'Earth'],
		correctAnswer: 1,
		emoji: '🪐',
		pack: 'space',
		explanation: 'Jupiter is the largest planet, big enough to fit over 1,300 Earths inside'
	},
	{
		id: 92,
		type: 'logic',
		question: 'Which one is the odd one out?',
		options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
		correctAnswer: 3,
		emoji: '🌍',
		pack: 'space',
		explanation: 'Jupiter is a gas giant; the other three are rocky, terrestrial planets'
	},
	{
		id: 93,
		type: 'logic',
		question: 'Complete the sequence of planets from the Sun: ... Jupiter, Saturn, Uranus, ___',
		options: ['Pluto', 'Neptune', 'Ceres', 'Eris'],
		correctAnswer: 1,
		emoji: '🛰️',
		pack: 'space',
		explanation: 'Neptune is the 8th and farthest planet from the Sun'
	},
	{
		id: 94,
		type: 'logic',
		question: 'What is the largest moon in our solar system?',
		options: ['Titan', 'Europa', 'Ganymede', 'Callisto'],
		correctAnswer: 2,
		emoji: '🌕',
		pack: 'space',
		explanation: 'Ganymede, a moon of Jupiter, is larger than even the planet Mercury'
	},
	{
		id: 95,
		type: 'logic',
		question: 'Apart from the Sun, which star is closest to Earth?',
		options: ['Sirius', 'Proxima Centauri', 'Betelgeuse', 'Rigel'],
		correctAnswer: 1,
		emoji: '⭐',
		pack: 'space',
		explanation: 'Proxima Centauri is the nearest star to the Sun, about 4.24 light-years away'
	},
	{
		id: 96,
		type: 'logic',
		question: 'Which planet is famous for its bright, prominent ring system?',
		options: ['Uranus', 'Jupiter', 'Saturn', 'Mars'],
		correctAnswer: 2,
		emoji: '🪐',
		pack: 'space',
		explanation: 'Saturn has the most spectacular and visible rings, made of ice and rock'
	},
	{
		id: 97,
		type: 'logic',
		question:
			'A day on Venus (one full rotation) takes about 243 Earth days, and its year is 225 Earth days. What does this mean?',
		options: [
			'A day on Venus is longer than a year on Venus',
			'Venus has no moons',
			'Venus spins faster than Earth',
			'Venus is the smallest planet'
		],
		correctAnswer: 0,
		emoji: '☀️',
		pack: 'space',
		explanation:
			'Venus rotates very slowly, so its day (243 days) is longer than its orbit (225 days)'
	},
	{
		id: 98,
		type: 'logic',
		question: 'Which of these is NOT classified as a planet?',
		options: ['Mercury', 'Mars', 'Ceres', 'Neptune'],
		correctAnswer: 2,
		emoji: '☄️',
		pack: 'space',
		explanation: 'Ceres is a dwarf planet in the asteroid belt, not one of the eight planets'
	},
	{
		id: 99,
		type: 'verbal',
		question: 'Moon is to Planet as Planet is to:',
		options: ['Star', 'Comet', 'Asteroid', 'Galaxy'],
		correctAnswer: 0,
		emoji: '🌍',
		pack: 'space',
		explanation: 'A moon orbits a planet, just as a planet orbits a star like the Sun'
	},
	{
		id: 100,
		type: 'verbal',
		question: 'Telescope is to Stars as Microscope is to:',
		options: ['Cells', 'Lenses', 'Laboratory', 'Glass'],
		correctAnswer: 0,
		emoji: '🔭',
		pack: 'space',
		explanation: 'A telescope magnifies distant stars; a microscope magnifies tiny cells'
	},
	{
		id: 101,
		type: 'verbal',
		question: 'Astronaut is to Helmet as Deep-Sea Diver is to:',
		options: ['Mask', 'Tank', 'Boat', 'Wetsuit'],
		correctAnswer: 0,
		emoji: '👨‍🚀',
		pack: 'space',
		explanation: 'Both wear a protective head covering: a helmet or a mask'
	},
	{
		id: 102,
		type: 'verbal',
		question: 'Satellite is to Orbit as Train is to:',
		options: ['Track', 'Station', 'Driver', 'Fuel'],
		correctAnswer: 0,
		emoji: '🌌',
		pack: 'space',
		explanation: 'A satellite travels along its orbit, just as a train runs along a track'
	},
	{
		id: 103,
		type: 'verbal',
		question: 'Launch is to Rocket as Takeoff is to:',
		options: ['Airplane', 'Landing', 'Airport', 'Flying'],
		correctAnswer: 0,
		emoji: '🚀',
		pack: 'space',
		explanation: 'A rocket launches, just as an airplane takes off'
	},
	{
		id: 104,
		type: 'verbal',
		question: 'NASA is to Space as NOAA is to:',
		options: ['Oceans', 'Rivers', 'Deserts', 'Forests'],
		correctAnswer: 0,
		emoji: '🛰️',
		pack: 'space',
		explanation:
			'NASA explores space; NOAA (National Oceanic and Atmospheric Administration) studies oceans and the atmosphere'
	},
	{
		id: 105,
		type: 'math',
		question:
			'Sunlight takes about 8 minutes to reach Earth. At 300,000 km/s, roughly how far is the Sun?',
		options: ['48 million km', '144 million km', '300 million km', '8 million km'],
		correctAnswer: 1,
		emoji: '☀️',
		pack: 'space',
		explanation: '8 × 60 × 300,000 = 144,000,000 km, so about 144 million km'
	},
	{
		id: 106,
		type: 'math',
		question:
			'The International Space Station orbits at about 28,000 km/h. How far does it travel in 2 hours?',
		options: ['14,000 km', '28,000 km', '56,000 km', '84,000 km'],
		correctAnswer: 2,
		emoji: '🛰️',
		pack: 'space',
		explanation: 'Distance = Speed × Time = 28,000 × 2 = 56,000 km'
	},
	{
		id: 107,
		type: 'math',
		question: 'A spacecraft flies at 40,000 km/h. How long does it take to travel 400,000 km?',
		options: ['10 hours', '4 hours', '40 hours', '100 hours'],
		correctAnswer: 0,
		emoji: '🛸',
		pack: 'space',
		explanation: 'Time = Distance ÷ Speed = 400,000 ÷ 40,000 = 10 hours'
	},
	{
		id: 108,
		type: 'math',
		question: 'The Moon is about 384,000 km away. At a steady 12,000 km/h, how long is the trip?',
		options: ['28 hours', '32 hours', '36 hours', '40 hours'],
		correctAnswer: 1,
		emoji: '🌕',
		pack: 'space',
		explanation: '384,000 ÷ 12,000 = 32 hours'
	},
	{
		id: 109,
		type: 'math',
		question: 'A Martian day (a "sol") is about 24.6 hours. How long are 3 sols?',
		options: ['73.8 hours', '72 hours', '74.6 hours', '82.8 hours'],
		correctAnswer: 0,
		emoji: '🪐',
		pack: 'space',
		explanation: '24.6 × 3 = 73.8 hours'
	},
	{
		id: 110,
		type: 'math',
		question:
			'The Sun is about 1,390,000 km wide and Earth about 12,700 km. Roughly how many Earths fit across the Sun?',
		options: ['About 109', 'About 50', 'About 400', 'About 1,000'],
		correctAnswer: 0,
		emoji: '⭐',
		pack: 'space',
		explanation: '1,390,000 ÷ 12,700 ≈ 109 Earths lined up across the Sun'
	},
	{
		id: 111,
		type: 'logic',
		question: 'Which of these is the largest?',
		options: ['The Moon', 'Earth', 'Jupiter', 'Mars'],
		correctAnswer: 2,
		emoji: '🪐',
		pack: 'space',
		explanation: 'Jupiter is the largest planet; Earth, Mars and the Moon are all far smaller'
	},
	{
		id: 112,
		type: 'math',
		question: 'A Martian day is about 24.6 hours. How long are two Martian days?',
		options: ['36.9 hours', '48.0 hours', '49.2 hours', '24.6 hours'],
		correctAnswer: 2,
		emoji: '⏱️',
		pack: 'space',
		explanation: '24.6 × 2 = 49.2 hours'
	},
	{
		id: 113,
		type: 'verbal',
		question: 'Orbit is to Revolve as Rotate is to:',
		options: ['Spin', 'Circle', 'Axis', 'Star'],
		correctAnswer: 0,
		emoji: '🌀',
		pack: 'space',
		explanation: 'To rotate means to spin; an orbit is a revolution around something'
	},
	{
		id: 114,
		type: 'logic',
		question: 'Which of these is a star?',
		options: ['The Moon', 'Europa', 'The Sun', 'Titan'],
		correctAnswer: 2,
		emoji: '⭐',
		pack: 'space',
		explanation: 'The Sun is a star; the Moon, Europa and Titan are moons'
	},
	{
		id: 115,
		type: 'math',
		question:
			'Sunlight takes about 8 minutes to reach Earth. Jupiter is roughly 5 times farther from the Sun than Earth is. About how long does sunlight take to reach Jupiter?',
		options: ['8 minutes', '13 minutes', '40 minutes', '80 minutes'],
		correctAnswer: 2,
		emoji: '💡',
		pack: 'space',
		explanation: '5 times the distance means 5 times the time: 8 × 5 = 40 minutes'
	},
	{
		id: 116,
		type: 'verbal',
		question: 'A "red giant" is:',
		options: [
			'A newborn star',
			'A late stage in the life of a star',
			'A type of planet',
			'A young galaxy'
		],
		correctAnswer: 1,
		emoji: '🔴',
		pack: 'space',
		explanation: 'Stars swell into red giants when they run low on fuel late in their lives'
	},
	{
		id: 117,
		type: 'logic',
		question: 'Which planet is famous for its bright, prominent rings?',
		options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
		correctAnswer: 2,
		emoji: '🪐',
		pack: 'space',
		explanation: 'The rings of Saturn are made of countless chunks of ice and rock'
	},
	{
		id: 118,
		type: 'math',
		question: 'The Moon is about 384,000 km from Earth. Rounded to the nearest 10,000 km, that is:',
		options: ['380,000 km', '390,000 km', '400,000 km', '384,000 km'],
		correctAnswer: 0,
		emoji: '🌙',
		pack: 'space',
		explanation: '384,000 sits between 380,000 and 390,000, closer to 380,000'
	},
	{
		id: 119,
		type: 'verbal',
		question: 'Astronomer is to Telescope as Biologist is to:',
		options: ['Microscope', 'Stethoscope', 'Telescope', 'Periscope'],
		correctAnswer: 0,
		emoji: '🔭',
		pack: 'space',
		explanation:
			'A biologist studies tiny life with a microscope, as an astronomer uses a telescope'
	},
	{
		id: 120,
		type: 'logic',
		question: 'Why does the Moon appear to glow in the night sky?',
		options: [
			'It burns fuel like the Sun',
			'It reflects sunlight',
			'It is made of glowing gas',
			'It produces its own light'
		],
		correctAnswer: 1,
		emoji: '🌔',
		pack: 'space',
		explanation: 'The Moon makes no light of its own; it reflects sunlight toward Earth'
	}
];
