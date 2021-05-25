import { ConfigActions } from '../model';
import { Note, NoteAction, NoteActions } from '../model';
import createReducer from './createReducer';
import shortid from 'shortid';

const initialState: Note[] = [
	{
		id: shortid.generate(),
		text: JSON.stringify([{ type: 'p', children: [{ text: '' }] }]),
	},
];

export const noteList = createReducer<Note[]>(initialState, {
	[NoteActions.ADD_NOTE](state: Note[], action: NoteAction) {
		return [...state, action.payload];
	},
	[NoteActions.EDIT_NOTE](state: Note[], action: NoteAction) {
		console.log(action);
		// @ts-ignore
		return state.map((note) => (action.payload?.id === note.id ? action.payload : note));
	},
	[NoteActions.DELETE_NOTE](state: Note[], action: NoteAction) {
		return state.filter((note) => note.id !== action.payload);
	},
	[ConfigActions.PURGE_STATE](state: Note[], action: NoteAction) {
		return [];
	},
});
