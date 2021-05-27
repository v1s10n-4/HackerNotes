export interface Note {
	id: string;
	text: string;
	updated_at: number;
}

export enum NoteActions {
	ADD_NOTE = 'ADD_NOTE',
	EDIT_NOTE = 'EDIT_NOTE',
	DELETE_NOTE = 'DELETE_NOTE',
}

interface NoteActionType<T, P> {
	type: T;
	payload: P;
}

export type NoteAction =
	| NoteActionType<typeof NoteActions.ADD_NOTE, Note>
	| NoteActionType<typeof NoteActions.EDIT_NOTE, Note>
	| NoteActionType<typeof NoteActions.DELETE_NOTE, string>;
