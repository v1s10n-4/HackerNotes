import defaultTheme from './defaultTheme';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Typography } from '@material-ui/core/styles/createTypography';
import { ThemeOptions } from '@material-ui/core';
import { HNMuiThemeOverrides } from './muiThemeOverrides';

export type HNTheme = typeof defaultTheme;
export type HNThemeTextStyles = typeof defaultTheme.textStyle;
export type FormatTheme = (theme: HNTheme) => ThemeOptions;
export type FormatPalette = (colors: typeof defaultTheme.color) => Partial<Palette>;
export type FormatTypography = (colors: typeof defaultTheme.textStyle) => Partial<Typography>;

export const formatPalette: FormatPalette = (colors) => {
	const palette: Partial<Palette> = {
		type: 'dark',
		primary: {
			main: colors.primaryMain,
			light: colors.primaryLight,
			dark: colors.primaryDark,
			contrastText: colors.primaryContrastText,
		},
		secondary: {
			main: colors.secondaryMain,
			light: colors.secondaryLight,
			dark: colors.secondaryDark,
			contrastText: colors.secondaryContrastText,
		},
		background: {
			default: colors.backgroundDefault,
			paper: colors.backgroundPaper,
		},
		text: {
			primary: colors.textPrimary,
			secondary: colors.textSecondary,
			disabled: colors.textDisabled,
			hint: colors.textHint,
		},
		error: {
			main: colors.errorMain,
			light: colors.errorLight,
			dark: colors.errorDark,
			contrastText: colors.errorContrastText,
		},
		warning: {
			main: colors.warningMain,
			light: colors.warningLight,
			dark: colors.warningDark,
			contrastText: colors.warningContrastText,
		},
		info: {
			main: colors.infoMain,
			light: colors.infoLight,
			dark: colors.infoDark,
			contrastText: colors.infoContrastText,
		},
		success: {
			main: colors.successMain,
			light: colors.successLight,
			dark: colors.successDark,
			contrastText: colors.successContrastText,
		},
		divider: colors.divider,
	};
	return palette;
};

export const formatTypography: FormatTypography = (textStyles) => ({
	fontFamily: `'${textStyles.fontFamily.font.family}'`,
	fontSize: textStyles.fontFamily.font.size,
});

export const formatTheme: FormatTheme = (theme) => ({
	...HNMuiThemeOverrides(theme),
	palette: formatPalette(theme.color),
	typography: formatTypography(theme.textStyle),
});

export default formatTheme;
