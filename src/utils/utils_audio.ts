// isolated gain node (could also use audioCtx.createGain())
const createGain = (audioCtx: AudioContext, initialVol: number): GainNode => {
	const gain = new GainNode(audioCtx, {
		gain: initialVol,
	});
	return gain;
};

// Cross-browser audio context
const createAudioContext = (): AudioContext => {
	const Context = AudioContext || window.AudioContext;
	const audioCtx = new Context();
	return audioCtx;
};

// Waveforms
const createCustomWave = (audioCtx: AudioContext): PeriodicWave => {
	const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	const cosineTerms = new Float32Array(sineTerms.length);
	return audioCtx.createPeriodicWave(cosineTerms, sineTerms);
};

const createAnalyser = (audioCtx: AudioContext): AnalyserNode => {
	const analyser = new AnalyserNode(audioCtx, {
		smoothingTimeConstant: 1,
		fftSize: 2048,
	});

	return analyser;
};

const createAnalyserData = (analyser: AnalyserNode): Uint8Array => {
	const data = new Uint8Array(analyser.frequencyBinCount);
	return data;
};

// ONLY use this IF using 'Uint8Array' NOT Float16Array
const createTimeData = (analyser: AnalyserNode, dataArray: Uint8Array) => {
	analyser.getByteTimeDomainData(dataArray);
};

export interface AudioChain {
	audioCtx: AudioContext;
	gainNode: GainNode;
}

// creates AudioContext & GainNode & connects them to each & output
const initAudio = (initialVol: number = 0.7): AudioChain => {
	const audioCtx = new AudioContext();
	const gainNode = audioCtx.createGain();
	gainNode.connect(audioCtx.destination);
	gainNode.gain.value = initialVol;

	return {
		audioCtx: audioCtx,
		gainNode: gainNode,
	};
};

export {
	// Generic-use utils
	createGain,
	createAudioContext,
	createCustomWave,
	createAnalyser,
	createAnalyserData,
	createTimeData,
	// Purpose-built utils
	initAudio,
};
