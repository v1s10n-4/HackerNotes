import { Config, ConfigAction, ConfigActions } from '../model';
import createReducer from './createReducer';
import defaultTheme from '../design-system/defaultTheme';

const initialState: Config = { theme: 'IBM 3270 (green)', fontSize: defaultTheme.textStyle.fontFamily.font.size };

export const config = createReducer<Config>(initialState, {
	[ConfigActions.SET_THEME](state: Config, action: ConfigAction) {
		return { ...state, theme: action.payload };
	},
	[ConfigActions.SET_FONT_SIZE](state: Config, action: ConfigAction) {
		return { ...state, fontSize: action.payload };
	},
});
