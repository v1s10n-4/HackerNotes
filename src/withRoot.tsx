import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import formatTheme from './design-system/FormatTheme';
import defaultTheme from './design-system/defaultTheme';
import AmberTheme from './design-system/AmberTheme';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';

export const themes = {
	'IBM 3270 (green)': defaultTheme,
	'IBM 3290 (amber)': AmberTheme,
};

export function withRoot(Component: any) {
	function WithRoot(props: object) {
		const config = useSelector((state: RootState) => state.config);
		// @ts-ignore
		const theme = createMuiTheme(formatTheme(themes[config.theme], config.fontSize));
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
