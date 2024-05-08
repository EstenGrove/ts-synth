import { NotesMap, NOTES_MAP as notesMap } from "./notes/notesMap";
import { INote, NOTES_LIST as notesList } from "./notes/notesList";

type NoteProps = {
	note: string;
	freq: number;
};

const NoteButton = ({ note, freq }: NoteProps) => {
	return `
    <div data-key="white" class="SynthKey">
      <button
				type="button"
				data-note="${note}"
        data-freq="${freq}"
				data-octave="UNKNOWN"
				class="SynthWhiteKey"
			>
				<div class="SynthWhiteKey">${note}</div>
			</button>
		</div>
  `;
};

const generateSynthNotes = () => {
	const notes = notesList.map((note: INote) => {
		return NoteButton(note);
	});
	return notes.join("");
};

export { generateSynthNotes };
