import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import formatTheme from './design-system/FormatTheme';
import defaultTheme from './design-system/defaultTheme';

const theme = createMuiTheme(formatTheme(defaultTheme));

export function withRoot(Component: any) {
	function WithRoot(props: object) {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
