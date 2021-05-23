import { ThemeOptions } from '@material-ui/core';
import defaultTheme from './defaultTheme';

export type CreateTransition = (
	props: string | string[],
	options?: Partial<{ duration: number | string; easing: string; delay: number | string }>
) => string;

export const createTransition: CreateTransition = (_, options) => {
	if (options?.duration && typeof options.duration === 'number')
		return `${options.duration} steps(${Math.floor((options.duration / 1000) * 16)}, end) ${options.delay}`;
	else
		return 'none';
}

export const HNMuiThemeOverrides: ThemeOptions = {
	overrides: {
		MuiButton: {
			root: {
				transition: 'none',
			},
			contained: {
				backgroundColor: defaultTheme.color.primaryMain,
				'&:focus, &:hover': {
					color: defaultTheme.color.primaryMain,
					backgroundColor: [defaultTheme.color.backgroundDefault, '!important']
				},
				'&:active': {
					animation: 'boxShadow 1.6s infinite, textShadow 1.6s infinite',
				},

			},
			outlined: {
				backgroundColor: defaultTheme.color.backgroundDefault,
				border: 'none !important',
				'&:focus, &:hover': {
					color: defaultTheme.color.backgroundDefault,
					backgroundColor: [defaultTheme.color.primaryMain, '!important'],
					boxShadow: `inset 0 0 0 5px ${defaultTheme.color.backgroundDefault}`
				},
				'&:active': {
					animation: 'textShadow 1.6s infinite',
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
						borderLeft: `5px solid ${defaultTheme.color.primaryMain}`,
						borderRight: `5px solid ${defaultTheme.color.primaryMain}`,
					},
					'&::after': {
						top: -3,
						bottom: -3,
						left: 3,
						right: 3,
						borderBottom: `5px solid ${defaultTheme.color.primaryMain}`,
						borderTop: `5px solid ${defaultTheme.color.primaryMain}`,
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
					}
				},
				'$outlined &': {
					'&::before': {
						top: 0,
						bottom: 0,
						left: -5,
						right: -5,
						borderLeft: `5px solid ${defaultTheme.color.primaryMain}`,
						borderRight: `5px solid ${defaultTheme.color.primaryMain}`,
					},
					'&::after': {
						top: -5,
						bottom: -5,
						left: 0,
						right: 0,
						borderBottom: `5px solid ${defaultTheme.color.primaryMain}`,
						borderTop: `5px solid ${defaultTheme.color.primaryMain}`,
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
					}
				}
			}
		}
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
		MuiButton: {
			variant: 'outlined',
			color: 'primary'
		}
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
};
