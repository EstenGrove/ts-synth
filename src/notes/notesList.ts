export interface INote {
	note: string;
	freq: number;
}

export type INotesList = INote[];

const NOTES_LIST: INotesList = [
	{
		note: "C",
		freq: 16.35,
	},
	{
		note: "C#",
		freq: 17.32,
	},
	{
		note: "Db",
		freq: 17.32,
	},
	{
		note: "D",
		freq: 18.35,
	},
	{
		note: "D#",
		freq: 19.45,
	},
	{
		note: "Eb",
		freq: 19.45,
	},
	{
		note: "E",
		freq: 20.6,
	},
	{
		note: "F",
		freq: 21.83,
	},
	{
		note: "F#",
		freq: 23.12,
	},
	{
		note: "Gb",
		freq: 23.12,
	},
	{
		note: "G",
		freq: 24.5,
	},
	{
		note: "G#",
		freq: 25.96,
	},
	{
		note: "Ab",
		freq: 25.96,
	},
	{
		note: "A",
		freq: 27.5,
	},
	{
		note: "A#",
		freq: 29.14,
	},
	{
		note: "Bb",
		freq: 29.14,
	},
	{
		note: "B",
		freq: 30.87,
	},
	{
		note: "C",
		freq: 32.7,
	},
	{
		note: "C#",
		freq: 34.65,
	},
	{
		note: "Db",
		freq: 34.65,
	},
	{
		note: "D",
		freq: 36.71,
	},
	{
		note: "D#",
		freq: 38.89,
	},
	{
		note: "Eb",
		freq: 38.89,
	},
	{
		note: "E",
		freq: 41.2,
	},
	{
		note: "F",
		freq: 43.65,
	},
	{
		note: "F#",
		freq: 46.25,
	},
	{
		note: "Gb",
		freq: 46.25,
	},
	{
		note: "G",
		freq: 49,
	},
	{
		note: "G#",
		freq: 51.91,
	},
	{
		note: "Ab",
		freq: 51.91,
	},
	{
		note: "A",
		freq: 55,
	},
	{
		note: "A#",
		freq: 58.27,
	},
	{
		note: "Bb",
		freq: 58.27,
	},
	{
		note: "B",
		freq: 61.74,
	},
	{
		note: "C",
		freq: 65.41,
	},
	{
		note: "C#",
		freq: 69.3,
	},
	{
		note: "Db",
		freq: 69.3,
	},
	{
		note: "D",
		freq: 73.42,
	},
	{
		note: "D#",
		freq: 77.78,
	},
	{
		note: "Eb",
		freq: 77.78,
	},
	{
		note: "E",
		freq: 82.41,
	},
	{
		note: "F",
		freq: 87.31,
	},
	{
		note: "F#",
		freq: 92.5,
	},
	{
		note: "Gb",
		freq: 92.5,
	},
	{
		note: "G",
		freq: 98,
	},
	{
		note: "G#",
		freq: 103.83,
	},
	{
		note: "Ab",
		freq: 103.83,
	},
	{
		note: "A",
		freq: 110,
	},
	{
		note: "A#",
		freq: 116.54,
	},
	{
		note: "Bb",
		freq: 116.54,
	},
	{
		note: "B",
		freq: 123.47,
	},
	{
		note: "C",
		freq: 130.81,
	},
	{
		note: "C#",
		freq: 138.59,
	},
	{
		note: "Db",
		freq: 138.59,
	},
	{
		note: "D",
		freq: 146.83,
	},
	{
		note: "D#",
		freq: 155.56,
	},
	{
		note: "Eb",
		freq: 155.56,
	},
	{
		note: "E",
		freq: 164.81,
	},
	{
		note: "F",
		freq: 174.61,
	},
	{
		note: "F#",
		freq: 185,
	},
	{
		note: "Gb",
		freq: 185,
	},
	{
		note: "G",
		freq: 196,
	},
	{
		note: "G#",
		freq: 207.65,
	},
	{
		note: "Ab",
		freq: 207.65,
	},
	{
		note: "A",
		freq: 220,
	},
	{
		note: "A#",
		freq: 233.08,
	},
	{
		note: "Bb",
		freq: 233.08,
	},
	{
		note: "B",
		freq: 246.94,
	},
	{
		note: "C",
		freq: 261.63,
	},
	{
		note: "C#",
		freq: 277.18,
	},
	{
		note: "Db",
		freq: 277.18,
	},
	{
		note: "D",
		freq: 293.66,
	},
	{
		note: "D#",
		freq: 311.13,
	},
	{
		note: "Eb",
		freq: 311.13,
	},
	{
		note: "E",
		freq: 329.63,
	},
	{
		note: "F",
		freq: 349.23,
	},
	{
		note: "F#",
		freq: 369.99,
	},
	{
		note: "Gb",
		freq: 369.99,
	},
	{
		note: "G",
		freq: 392,
	},
	{
		note: "G#",
		freq: 415.3,
	},
	{
		note: "Ab",
		freq: 415.3,
	},
	{
		note: "A",
		freq: 440,
	},
	{
		note: "A#",
		freq: 466.16,
	},
	{
		note: "Bb",
		freq: 466.16,
	},
	{
		note: "B",
		freq: 493.88,
	},
	{
		note: "C",
		freq: 523.25,
	},
	{
		note: "C#",
		freq: 554.37,
	},
	{
		note: "Db",
		freq: 554.37,
	},
	{
		note: "D",
		freq: 587.33,
	},
	{
		note: "D#",
		freq: 622.25,
	},
	{
		note: "Eb",
		freq: 622.25,
	},
	{
		note: "E",
		freq: 659.26,
	},
	{
		note: "F",
		freq: 698.46,
	},
	{
		note: "F#",
		freq: 739.99,
	},
	{
		note: "Gb",
		freq: 739.99,
	},
	{
		note: "G",
		freq: 783.99,
	},
	{
		note: "G#",
		freq: 830.61,
	},
	{
		note: "Ab",
		freq: 830.61,
	},
	{
		note: "A",
		freq: 880,
	},
	{
		note: "A#",
		freq: 932.33,
	},
	{
		note: "Bb",
		freq: 932.33,
	},
	{
		note: "B",
		freq: 987.77,
	},
	{
		note: "C",
		freq: 1046.5,
	},
	{
		note: "C#",
		freq: 1108.73,
	},
	{
		note: "Db",
		freq: 1108.73,
	},
	{
		note: "D",
		freq: 1174.66,
	},
	{
		note: "D#",
		freq: 1244.51,
	},
	{
		note: "Eb",
		freq: 1244.51,
	},
	{
		note: "E",
		freq: 1318.51,
	},
	{
		note: "F",
		freq: 1396.91,
	},
	{
		note: "F#",
		freq: 1479.98,
	},
	{
		note: "Gb",
		freq: 1479.98,
	},
	{
		note: "G",
		freq: 1567.98,
	},
	{
		note: "G#",
		freq: 1661.22,
	},
	{
		note: "Ab",
		freq: 1661.22,
	},
	{
		note: "A",
		freq: 1760,
	},
	{
		note: "A#",
		freq: 1864.66,
	},
	{
		note: "Bb",
		freq: 1864.66,
	},
	{
		note: "B",
		freq: 1975.53,
	},
	{
		note: "C",
		freq: 2093,
	},
	{
		note: "C#",
		freq: 2217.46,
	},
	{
		note: "Db",
		freq: 2217.46,
	},
	{
		note: "D",
		freq: 2349.32,
	},
	{
		note: "D#",
		freq: 2489.02,
	},
	{
		note: "Eb",
		freq: 2489.02,
	},
	{
		note: "E",
		freq: 2637.02,
	},
	{
		note: "F",
		freq: 2793.83,
	},
	{
		note: "F#",
		freq: 2959.96,
	},
	{
		note: "Gb",
		freq: 2959.96,
	},
	{
		note: "G",
		freq: 3135.96,
	},
	{
		note: "G#",
		freq: 3322.44,
	},
	{
		note: "Ab",
		freq: 3322.44,
	},
	{
		note: "A",
		freq: 3520,
	},
	{
		note: "A#",
		freq: 3729.31,
	},
	{
		note: "Bb",
		freq: 3729.31,
	},
	{
		note: "B",
		freq: 3951.07,
	},
	{
		note: "C",
		freq: 4186.01,
	},
	{
		note: "C#",
		freq: 4434.92,
	},
	{
		note: "Db",
		freq: 4434.92,
	},
	{
		note: "D",
		freq: 4698.64,
	},
	{
		note: "D#",
		freq: 4978.03,
	},
	{
		note: "Eb",
		freq: 4978.03,
	},
];

export { NOTES_LIST };
