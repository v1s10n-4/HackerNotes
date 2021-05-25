import { History } from 'history';
import { combineReducers } from 'redux';
import { Note } from '../model';
import * as configReducer from './config';
import * as noteReducer from './note';

export interface RootState {
	drawerOpen: boolean;
	noteList: Note[];
}

export default (history: History) =>
	combineReducers({
		...configReducer,
		...noteReducer,
	});
