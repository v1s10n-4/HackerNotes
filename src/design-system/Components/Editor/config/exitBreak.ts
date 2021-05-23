import { ExitBreakPluginOptions, KEYS_HEADING } from '@udecode/slate-plugins';

export const optionsExitBreakPlugin: ExitBreakPluginOptions = {
	rules: [
		{
			hotkey: 'mod+enter',
		},
		{
			hotkey: 'mod+shift+enter',
			before: true,
		},
		{
			hotkey: 'enter',
			query: {
				start: true,
				end: true,
				allow: KEYS_HEADING,
			},
		},
	],
};
