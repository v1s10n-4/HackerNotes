import { History } from 'history';
import { combineReducers } from 'redux';
import { Note, Todo } from '../model';
import * as todoReducer from './todo';
import * as configReducer from './config';
import * as noteReducer from './note';

export interface RootState {
	drawerOpen: boolean;
	todoList: Todo[];
	noteList: Note[];
}

export default (history: History) =>
	combineReducers({
		...configReducer,
		...todoReducer,
		...noteReducer,
	});
