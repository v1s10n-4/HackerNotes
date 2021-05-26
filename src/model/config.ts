export enum ConfigActions {
	PURGE_STATE = 'PURGE_STATE',
	SET_THEME = 'SET_THEME',
	SET_FONT_SIZE = 'SET_FONT_SIZE',
}

export interface Config {
	theme: string;
	fontSize: number;
}

interface ConfigActionType<T, P> {
	type: T;
	payload: P;
}

export type ConfigAction =
	| ConfigActionType<typeof ConfigActions.SET_THEME, string>
	| ConfigActionType<typeof ConfigActions.SET_FONT_SIZE, number>;
