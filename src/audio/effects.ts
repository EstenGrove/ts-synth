import { MultiAudioNode, SingleAudioNode } from "./nodes";

class Tremolo extends SingleAudioNode {
	private _speed: number;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this.nodes = {
			gainNode: audioCtx.createGain(),
			oscNode: audioCtx.createOscillator(),
		};

		// Connect nodes
		this.nodes.oscNode.connect(this.nodes.gainNode);

		// Setup osc
		const osc = this.nodes.oscNode as OscillatorNode;
		osc.type = "sine";

		this._speed = 20; // Default speed
	}

	public get speed(): number {
		return this._speed;
	}
	public set speed(value: number | string) {
		this._speed = Number(value);
		// set speed to oscillator
		const osc = this.nodes.oscNode as OscillatorNode;
		osc.frequency.value = this._speed;
	}
}

class Filter extends SingleAudioNode {
	private _intensity!: number;
	private _gain!: number;
	private _filterType!: BiquadFilterType;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this.nodes = {
			gainNode: this.audioCtx.createGain() as GainNode,
			waveShaper: this.audioCtx.createWaveShaper() as WaveShaperNode,
			biquadFilterNode: this.audioCtx.createBiquadFilter() as BiquadFilterNode,
		};

		// Default oversample to '4x'
		const waveShaper = this.nodes.waveShaper as WaveShaperNode;
		waveShaper.oversample = "4x";

		// Set filter type defaults to 'lowpass'
		const filter = this.nodes.biquadFilterNode as BiquadFilterNode;
		filter.type = "lowpass";
	}

	// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
	private calculateCurve(intensity: number | string): Float32Array {
		const num: number = Number(intensity);
		const intenseVal: number = num || 100;
		const samples: number = 44100;
		const degrees: number = Math.PI / 180;
		const curve: Float32Array = new Float32Array(samples);

		let i: number = 0;
		let x: number;

		for (i < samples; i++; ) {
			x = (i * 2) / samples - 1;
			curve[i] =
				((3 + intenseVal) * x * 20 * degrees) /
				(Math.PI + intenseVal * Math.abs(x));
		}

		return curve;
	}

	public get filterType(): BiquadFilterType {
		if (!this._filterType) {
			return "lowpass";
		} else {
			return this._filterType;
		}
	}
	public set filterType(type: BiquadFilterType) {
		this._filterType = type;
		// apply filter type to BiquadFilterNode
		const filter = this.nodes.biquadFilterNode as BiquadFilterNode;
		filter.type = type;
	}
	public get intensity(): number {
		return this._intensity;
	}
	public set intensity(value: number | string) {
		const val = Number(value);
		this._intensity = val;

		// apply filter type to BiquadFilterNode
		const waveShaper = this.nodes.waveShaper as WaveShaperNode;
		waveShaper.curve = this.calculateCurve(val);
	}
	public get gain(): number {
		return this._gain;
	}
	public set gain(value: number | string) {
		const val = Number(value);
		this._gain = val;

		const gainNode = this.nodes.gainNode as GainNode;
		gainNode.gain.value = val;
	}
}

class Reverb extends MultiAudioNode {
	private _dryAmount!: number;
	private _wetAmount!: number;
	private _impulseBuffer!: ArrayBuffer | AudioBuffer;
	// private _impulsePath: URL | string;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this.nodes = {
			dryNode: audioCtx.createGain(),
			wetNode: audioCtx.createConvolver(),
			wetGain: audioCtx.createGain(),
		};
	}

	public async impulseSrc(srcPath: string): Promise<ArrayBuffer | AudioBuffer> {
		const response = await fetch(srcPath);
		const buffer = await response.arrayBuffer();
		this._impulseBuffer = buffer;
		return buffer;
	}

	public get wet(): number {
		return this._wetAmount;
	}
	public set wet(amount: number | string) {
		this._wetAmount = Number(amount);
	}
	public get dry(): number {
		return this._dryAmount;
	}
	public set dry(amount: number | string) {
		this._dryAmount = Number(amount);
	}
}

export { Tremolo, Filter, Reverb };
