export type TAudioNode =
	| AudioNode
	| GainNode
	| DelayNode
	| WaveShaperNode
	| BiquadFilterNode
	| OscillatorNode
	| ConvolverNode;

export interface LocalNodes {
	[key: string]: TAudioNode;
}

class SingleAudioNode {
	private _audioCtx: AudioContext;
	private _node!: AudioNode;

	// Map of active audio nodes in this chain
	public nodes: LocalNodes = {};

	constructor(audioCtx: AudioContext) {
		this._audioCtx = audioCtx;
	}

	public get audioCtx(): AudioContext {
		return this._audioCtx;
	}
	public set audioCtx(audioCtx: AudioContext) {
		this._audioCtx = audioCtx;
	}
	public get node(): AudioNode {
		return this._node;
	}
	public set node(node: AudioNode) {
		this._node = node;
	}
	public connect(node: AudioNode): AudioNode {
		this._node.connect(node);
		return this._node;
	}
	public disconnect(): AudioNode {
		this._node.disconnect();
		return this._node;
	}
	public destroy(): AudioNode {
		return this.disconnect();
	}
}

class MultiAudioNode extends SingleAudioNode {
	private _outputNode!: AudioNode;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);
	}

	public get output(): AudioNode {
		return this._outputNode;
	}
	public set output(output: AudioNode) {
		this._outputNode = output;
	}
	public destroyAll() {
		if (Object.keys(this.nodes)) {
			Object.keys(this.nodes).forEach((nodeKey) => {
				this.nodes[nodeKey].disconnect();
			});
		}
	}
}

/**
 * 'ConstantSourceNode'
 * - Allows controlling a given value for multiple different nodes at once without manually updating each node separately
 * - Eg. controlling volumne for several gain nodes at once via the 'this._offset'
 *                           _______N_______
 *                          |               |
 *                       <Node>          <Node>
 */
class SourceNode {
	private _node!: ConstantSourceNode;
	private _audioCtx: AudioContext;
	private _offset: number;

	constructor(audioCtx: AudioContext) {
		this._audioCtx = audioCtx;
		this._node = new ConstantSourceNode(audioCtx, {
			offset: 0,
		});
	}

	public set offset(offset: number) {
		this._offset = offset;
		this._node.offset.value = offset;
	}

	public get audioCtx(): AudioContext {
		return this._audioCtx;
	}
	public get node(): ConstantSourceNode {
		return this._node;
	}

	public connect(node: AudioNode) {
		this._node.connect(node);
	}
	public connectMany(nodes: AudioNode[]) {
		nodes.forEach((node) => {
			this._node.connect(node);
		});
	}
	public disconnect() {
		this._node.disconnect();
	}
}

class Output extends SingleAudioNode {
	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		if (this.audioCtx) {
			this.node = audioCtx.destination;
		}
	}
}

class Input extends SingleAudioNode {
	private _hasPermission: boolean;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this._hasPermission = false;
	}

	public hasPermission(): boolean {
		return this._hasPermission;
	}

	public get input(): AudioNode | MediaStream {
		return this.node;
	}
	public set input(stream: MediaStream) {
		this.node = this.audioCtx.createMediaStreamSource(stream);
	}

	public async getUserMedia(): Promise<MediaStream> {
		const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		this._hasPermission = !!stream;
		this.input = stream;

		return stream;
	}
	public async getAudioDevices(): Promise<Array<unknown>> {
		const deviceKinds = ["audioinput", "audiooutput"];
		if (this._hasPermission) {
			// returns an array of available audio devices such as mic, speakers, earbuds etc
			const devices: Array<MediaDeviceInfo | InputDeviceInfo> = (
				await navigator.mediaDevices.enumerateDevices()
			).filter((device) => deviceKinds.includes(device.kind));
			return devices;
		} else {
			return [];
		}
	}
}

class AudioPlayer extends Audio {
	private _url: string;
	private _src: any;

	constructor(url: string) {
		super(url);

		this._url = url;
	}
	public async getSrc(): Promise<ArrayBuffer> {
		const raw = await fetch(this._url);
		const source = await raw.arrayBuffer();
		this._src = source;
		return source;
	}
}

export {
	// Input/Output nodes
	Input,
	Output,
	SourceNode,
	// Reusable utility nodes
	SingleAudioNode,
	MultiAudioNode,
};
