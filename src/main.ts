import "./style.css";
import "./synth.css";
import { generateSynthNotes } from "./synth";

// UI & Markup
import { SynthUI } from "./ui/SynthUI";
import { Input } from "./audio/nodes";

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
let isPlaying = false;
const WAVE_TYPES: Array<OscillatorType> = [
	"custom",
	"sine",
	"sawtooth",
	"square",
	"triangle",
];
const WAVE: OscillatorType = WAVE_TYPES[1];

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
		isPlaying = true;
	});
	// Remove oscillator from 'active' on mouseup
	noteBtn.addEventListener("mouseup", () => {
		const note = noteBtn.getAttribute("data-note") as string;

		activeOscillators[note].stop();
		delete activeOscillators[note];
		noteBtn.setAttribute("pressed", "false");
		isPlaying = false;
	});
	noteBtn.addEventListener("mouseover", () => {
		if (!audioCtx) return;
		if (!isPlaying) return;

		const note = noteBtn.getAttribute("data-note") as string;
		const freq = Number(noteBtn.getAttribute("data-freq")) as number;
		const pressed = noteBtn.getAttribute("data-pressed");

		if (!pressed || pressed === "false") {
			const osc = playNote(freq);
			activeOscillators[note] = osc;
		}
	});
	noteBtn.addEventListener("mouseleave", async () => {
		if (!isPlaying) return;

		const note = noteBtn.getAttribute("data-note") as string;
		activeOscillators[note].stop();
		delete activeOscillators[note];
		noteBtn.setAttribute("pressed", "false");
	});
});

console.log("volume", volume);
