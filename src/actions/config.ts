import { ConfigAction, ConfigActions } from '../model';

export function setTheme(theme: string): ConfigAction {
	return {
		type: ConfigActions.SET_THEME,
		payload: theme,
	};
}

export function setFontSize(fontSize: number): ConfigAction {
	return {
		type: ConfigActions.SET_FONT_SIZE,
		payload: fontSize,
	};
}
