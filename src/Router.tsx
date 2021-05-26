import { Router, stringParser } from 'react-typesafe-routes';
import { Terminal, NoteList } from './pages';

// Read more about writing a middleware or add query parameter etc.
// https://github.com/innFactory/react-typesafe-routes

export const router = Router((route) => ({
	default: route('/', {
		component: NoteList,
	}),
	note: route('note/:id', {
		component: Terminal,
		params: {
			id: stringParser,
		},
	}),
	list: route('list', {
		component: NoteList,
	}),
}));
