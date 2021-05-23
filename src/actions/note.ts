import { Note, NoteAction, NoteActions } from '../model';

export function addNote(note: Note): NoteAction {
	return {
		type: NoteActions.ADD_NOTE,
		payload: note,
	};
}

export function editNote(note: Note): NoteAction {
	return {
		type: NoteActions.EDIT_NOTE,
		payload: note,
	};
}

export function deleteNote(noteId: string): NoteAction {
	return {
		type: NoteActions.DELETE_NOTE,
		payload: noteId,
	};
}
