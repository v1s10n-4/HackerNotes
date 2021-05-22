import { CssBaseline, ThemeOptions } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";

// A theme with custom primary and secondary color.
// It's optional.
const themeOptions: ThemeOptions = {
	palette: {
		type: 'dark',
		primary: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		secondary: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		background: {
			default: '#000000',
			paper: '#000000',
		},
		text: {
			primary: '#00ff54',
			secondary: '#00ff54',
			disabled: '#00ff54',
			hint: '#00ff54',
		},
		error: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		warning: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		info: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		success: {
			main: '#00ff54',
			light: '#00ff54',
			dark: '#00ff54',
			contrastText: '#000000',
		},
		divider: '#00ff54',
	},
	typography: {
		fontFamily: "'3270-Regular'",
		fontSize: 24,
	},
	shape: {
		borderRadius: 0,
	},
};
const theme = createMuiTheme(themeOptions);

export function withRoot(Component: any) {
	function WithRoot(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<ThemeProvider theme={theme}>
				{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
