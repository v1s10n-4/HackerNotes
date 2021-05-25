import { ThemeOptions } from '@material-ui/core';
import type {} from '@material-ui/lab/themeAugmentation';
import { HNTheme } from './FormatTheme';

export type CreateTransition = (
	props: string | string[],
	options?: Partial<{ duration: number | string; easing: string; delay: number | string }>
) => string;

export const createTransition: CreateTransition = (_, options) => {
	if (options?.duration && typeof options.duration === 'number')
		return `${options.duration} steps(${Math.floor((options.duration / 1000) * 16)}, end) ${options.delay || ''}`;
	else return 'none';
};

export type HNMuiThemeOverrides = (theme: HNTheme) => ThemeOptions;

export const HNMuiThemeOverrides: HNMuiThemeOverrides = (theme) => ({
	overrides: {
		MuiButton: {
			root: {
				transition: 'none',
			},
			contained: {
				backgroundColor: theme.color.primaryMain,
				'&:focus, &:hover': {
					color: theme.color.primaryMain,
					backgroundColor: [theme.color.backgroundDefault, '!important'],
				},
				'&:active': {
					animation: 'boxShadow 1.6s infinite, textShadow 1.6s infinite',
				},
			},
			outlined: {
				backgroundColor: theme.color.backgroundDefault,
				border: 'none !important',
				'&:focus, &:hover': {
					color: theme.color.backgroundDefault,
					backgroundColor: [theme.color.primaryMain, '!important'],
					boxShadow: `inset 0 0 0 5px ${theme.color.backgroundDefault}`,
				},
				'&:active': {
					animation: 'textShadow 1.6s infinite',
				},
			},
			text: {
				padding: 0,
				fontSize: '1em',
				textTransform: 'unset',
				'&:active': {
					color: theme.color.backgroundDefault,
				},
				'&:focus, &:hover': {
					animation: 'textShadow 1.6s infinite',
					backgroundColor: [theme.color.backgroundDefault, '!important'],
				},
			},
			label: {
				zIndex: 1,
				'&::before, &::after': {
					content: '""',
					display: 'block',
					position: 'absolute',
				},
				'$contained &': {
					'&::before': {
						top: 3,
						bottom: 3,
						left: -3,
						right: -3,
						borderLeft: `5px solid ${theme.color.primaryMain}`,
						borderRight: `5px solid ${theme.color.primaryMain}`,
					},
					'&::after': {
						top: -3,
						bottom: -3,
						left: 3,
						right: 3,
						borderBottom: `5px solid ${theme.color.primaryMain}`,
						borderTop: `5px solid ${theme.color.primaryMain}`,
					},
					'&:focus, &:hover': {
						'&::before': {
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
						},
						'&::after': {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
						},
					},
				},
				'$outlined &': {
					'&::before': {
						top: 0,
						bottom: 0,
						left: -5,
						right: -5,
						borderLeft: `5px solid ${theme.color.primaryMain}`,
						borderRight: `5px solid ${theme.color.primaryMain}`,
					},
					'&::after': {
						top: -5,
						bottom: -5,
						left: 0,
						right: 0,
						borderBottom: `5px solid ${theme.color.primaryMain}`,
						borderTop: `5px solid ${theme.color.primaryMain}`,
					},
					'&:focus, &:hover': {
						'&::before': {
							top: 5,
							bottom: 5,
							left: 0,
							right: 0,
						},
						'&::after': {
							top: 0,
							bottom: 0,
							left: 5,
							right: 5,
						},
					},
				},
			},
		},
		MuiDialog: {
			paper: {
				padding: 20,
				border: `7px double ${theme.color.primaryMain}`,
			},
		},
		MuiAutocomplete: {
			root: {
				height: '100%',
			},
			paper: {
				margin: 0,
				backgroundColor: 'transparent',
			},
			listbox: { padding: 0 },
			inputRoot: {
				position: 'relative',
				paddingLeft: '40px !important',
				'&:before': {
					content: "'>'",
					fontSize: '1.5rem',
					position: 'absolute',
					bottom: '25%',
					left: 25,
				},
			},
			popper: {
				transform: 'translate3d(0, 70px, 0px) !important',
				zIndex: 0,
			},
			noOptions: {
				display: 'none',
			},
			option: {
				justifyContent: 'space-between',
				'&[data-focus="true"]': {
					color: theme.color.backgroundDefault,
					backgroundColor: theme.color.primaryMain,
					'& button': {
						visibility: 'visible',
					},
				},
			},
		},
		MuiAppBar: {
			root: {
				border: 'none',
				backgroundColor: 'transparent !important',
				borderTop: `3px solid ${theme.color.primaryMain}`,
				zIndex: 0,
				padding: '5px 15px',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
		},
		MuiOutlinedInput: {
			notchedOutline: {
				border: 'none',
			},
		},
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
		MuiButton: {
			variant: 'outlined',
			color: 'primary',
		},
	},
	shape: {
		borderRadius: 0,
	},
	transitions: {
		duration: {
			shortest: 250,
			shorter: 500,
			short: 750,
			standard: 1000,
			complex: 1250,
			enteringScreen: 1000,
			leavingScreen: 750,
		},
		create: createTransition,
	},
});
