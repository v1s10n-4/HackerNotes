import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_TD, SoftBreakPluginOptions } from '@udecode/slate-plugins';

export const optionsSoftBreakPlugin: SoftBreakPluginOptions = {
	rules: [
		{ hotkey: 'shift+enter' },
		{
			hotkey: 'enter',
			query: {
				allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
			},
		},
	],
};
