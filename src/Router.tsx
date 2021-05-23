import { Router } from 'react-typesafe-routes';
import { Terminal, TodoPage, HomePage } from './pages';

// Read more about writing a middleware or add query parameter etc.
// https://github.com/innFactory/react-typesafe-routes

export const router = Router(route => ({
	terminal: route('/', {
		component: Terminal,
	}),
	todo: route('todo', {
		component: TodoPage,
	}),
	home: route('home', {
		component: HomePage,
	}),
}));
