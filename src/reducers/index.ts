import { History } from 'history';
import { combineReducers } from 'redux';
import { Config, Note } from '../model';
import * as configReducer from './config';
import * as noteReducer from './note';

export interface RootState {
	config: Config;
	noteList: Note[];
}

export default (history: History) =>
	combineReducers({
		...configReducer,
		...noteReducer,
	});
