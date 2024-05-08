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

class Filter extends MultiAudioNode {
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

/**
 * 'Envelope' node
 * - Custom ADSR envelope filter for web audio sound sources.
 */

class Envelope extends MultiAudioNode {
	private _attack: number; // 0.00s to 1.0s (eg. 0.00 is immediate attack)
	private _decay: number;
	private _sustain: number;
	private _release: number;
	// levels for each time value (eg. ADSR)
	private _attackLevel: number;
	private _decayLevel: number;
	private _sustainLevel: number;
	private _releaseLevel: number;
	// buffer source
	private _bufferSrc: AudioBufferSourceNode;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		// ADSR times (eg. attack at 0.00)
		this._attack = 0;
		this._decay = 0;
		this._sustain = 0;
		this._release = 0;
		// Levels (eg. gain level at Xseconds)
		this._attackLevel = 1;
		this._decayLevel = 1;
		this._sustainLevel = 1;
		this._releaseLevel = 1;

		this.nodes = {
			attackNode: audioCtx.createGain() as GainNode,
			decayNode: audioCtx.createGain() as GainNode,
			sustainNode: audioCtx.createGain() as GainNode,
			releaseNode: audioCtx.createGain() as GainNode,
			// outputNode: audioCtx.createGain()
			// outputNode: this.getBufferSource()
		};

		// Apply initial values to envelope
		const attackNode = this.nodes.attackNode as GainNode;
		const decayNode = this.nodes.decayNode as GainNode;
		const sustainNode = this.nodes.sustainNode as GainNode;
		const releaseNode = this.nodes.releaseNode as GainNode;

		attackNode.gain.setValueAtTime(this._attackLevel, this._attack);
		decayNode.gain.setValueAtTime(this._decayLevel, this._decay);
		sustainNode.gain.setValueAtTime(this._sustainLevel, this._sustain);
		releaseNode.gain.setValueAtTime(this._releaseLevel, this._release);

		// connect ADSR nodes to buffer
		this._bufferSrc = this._getBufferSource();
		this._bufferSrc.connect(this.nodes.attackNode);
		this._bufferSrc.connect(this.nodes.decayNode);
		this._bufferSrc.connect(this.nodes.sustainNode);
		this._bufferSrc.connect(this.nodes.releaseNode);
		this._bufferSrc.connect(this.output);
	}

	public get attack(): number {
		return this._attack;
	}
	public set attack(value: number | string) {
		const val = Number(value);
		this._attack = val;
	}
	public get decay(): number {
		return this._decay;
	}
	public set decay(value: number | string) {
		const val = Number(value);
		this._decay = val;
	}
	public get sustain(): number {
		return this._sustain;
	}
	public set sustain(value: number | string) {
		const val = Number(value);
		this._sustain = val;
	}
	public get release(): number {
		return this._release;
	}
	public set release(value: number | string) {
		const val = Number(value);
		this._release = val;
	}

	public applyADSR() {}
	// Generate buffer, with samples set to 1
	// Amended from: https://github.com/itsjoesullivan/envelope-generator/blob/master/envelope-generator.js#L133
	private _getBufferSource(): AudioBufferSourceNode {
		const ctx = this.audioCtx;
		const buffer = ctx.createBuffer(1, 2, ctx.sampleRate);
		const channelData = buffer.getChannelData(0);
		channelData[0] = 1;
		channelData[1] = 1;

		// const source = ctx.createBufferSource();
		// source.buffer = buffer;
		// source.loop = true;

		const source = new AudioBufferSourceNode(ctx, {
			buffer: buffer,
			loop: true,
		});

		return source;
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

export {
	// Filters
	Envelope,
	Filter,
	// LFOs & IIRs
	Tremolo,
	Reverb,
};
