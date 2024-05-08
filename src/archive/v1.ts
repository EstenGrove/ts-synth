import "./style.css";
import "./synth.css";

// UI & Markup
import { generateSynthNotes } from "../synth";
import { Input } from "../audio/nodes";
import { SynthUI } from "../ui/SynthUI";

const features = {
	showSynth: false,
};

const heading = `
<h1>Web Audio Synth | Vite | TS-Synth</h1>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${heading}

    <div class="keys">
      ${generateSynthNotes()}
    </div>

    <!-- Synth UI Markup
    ${features.showSynth ? SynthUI : null}
    -->
  </div>
`;

// SYNTH AUDIO CODE //
const WAVE_TYPES: Array<OscillatorType> = [
	"custom",
	"sawtooth",
	"square",
	"triangle",
];
const WAVE: OscillatorType = WAVE_TYPES[2];

// AUDIO REFS
interface ActiveOscs {
	[key: string]: OscillatorNode;
}
let audioCtx: AudioContext;
let mainGainNode: GainNode;
let volume: number = 0.7;
const activeOscillators: ActiveOscs = {};

// ELEMENT REFS
const noteButtons: Array<Element> = [
	...document.querySelectorAll("button[class='SynthWhiteKey']"),
];

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const volumeInput = document.getElementById("volume");

// Waveforms
const createCustomWave = () => {
	const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	const cosineTerms = new Float32Array(sineTerms.length);
	return audioCtx.createPeriodicWave(cosineTerms, sineTerms);
};

const changeVolume = () => {
	mainGainNode.gain.value = Number(volumeInput?.value ?? ("0.7" as string));
};

// Play a given freq
const playNote = (freq: number): OscillatorNode => {
	const osc: OscillatorNode = audioCtx.createOscillator();
	osc.connect(mainGainNode);
	const type = WAVE;

	if (type === "custom") {
		const custom: PeriodicWave = createCustomWave();
		osc.setPeriodicWave(custom);
	} else {
		osc.type = type;
	}

	osc.frequency.value = freq;

	osc.start();

	return osc;
};

// creates & sets audio context, gain/volume node & connects last-in-chain node to our output (defaults to speakers)
const loadSynth = (initialVol: number) => {
	audioCtx = new AudioContext();
	mainGainNode = audioCtx.createGain();
	mainGainNode.connect(audioCtx.destination);
	mainGainNode.gain.value = initialVol;
};

const killSynth = (activeOscs: ActiveOscs): void => {
	// no oscillators to kill/mute
	if (!(Object.keys(activeOscs)?.length > 0)) return;
	Object.entries(activeOscs).map(
		([key, osc]: [key: string, osc: OscillatorNode]) => {
			// stop/kill any active oscillators
			osc.stop();
			// delete all oscillators from map
			delete activeOscs[key];
		}
	);
};

volumeInput?.addEventListener("change", (e: Event) => {
	const { value: raw } = e.target;
	const value = Number(raw);
	volume = value;

	if (!audioCtx) {
		return loadSynth(value);
	}
	changeVolume();
});

startBtn?.addEventListener("click", async () => {
	loadSynth(volume);
	// const input = new Input(audioCtx);
	// const stream = await input.getUserMedia();
	// console.log("input", input);
	// console.log("response", stream);
});
stopBtn?.addEventListener("click", () => {
	killSynth(activeOscillators);
});

// Add event listeners to note buttons
noteButtons.forEach((noteBtn: Element) => {
	// play note & add to active list
	noteBtn.addEventListener("mousedown", () => {
		if (!audioCtx) return alert("❌ Audio Context is NOT loaded yet!");
		changeVolume();

		const note = noteBtn.getAttribute("data-note") as string;
		const freq = Number(noteBtn.getAttribute("data-freq")) as number;
		const newOsc: OscillatorNode = playNote(freq);
		activeOscillators[note] = newOsc;
		noteBtn.setAttribute("pressed", "true");
	});
	// Remove oscillator from 'active' on mouseup
	noteBtn.addEventListener("mouseup", () => {
		const note = noteBtn.getAttribute("data-note") as string;
		activeOscillators[note].stop();
		delete activeOscillators[note];
		noteBtn.setAttribute("pressed", "false");
	});
	noteBtn.addEventListener("mouseover", (e) => {
		const note = noteBtn.getAttribute("data-note") as string;
		const freq = Number(noteBtn.getAttribute("data-freq")) as number;
		const pressed = noteBtn.getAttribute("data-pressed");
		const isPressed = pressed === "true";
		if (!isPressed) {
			// activeOscillators[note].start();
			const osc = playNote(freq);
			activeOscillators[note] = osc;
			noteBtn.setAttribute("pressed", "true");
			return;
		}
		if (activeOscillators[note]) {
			activeOscillators[note].stop();
			delete activeOscillators[note];
		}
	});
	noteBtn.addEventListener("mouseleave", () => {
		const note = noteBtn.getAttribute("data-note") as string;
		if (!activeOscillators[note]) return;
		noteBtn.setAttribute("pressed", "false");

		activeOscillators[note].stop();
		delete activeOscillators[note];
	});
});

console.log("volume", volume);
