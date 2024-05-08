import { INotesList } from "../notes/notesList";
import { NotesMap } from "../notes/notesMap";

const processNotes = (notesMap: NotesMap): INotesList => {
	return Object.entries(notesMap).map(([noteKey, freq]) => {
		const newKey: string = noteKey.replace(/\d/gm, "");
		return {
			note: newKey,
			freq: freq,
		};
	});
};

export { processNotes };
