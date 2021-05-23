import {
	ELEMENT_BLOCKQUOTE,
	ELEMENT_PARAGRAPH,
	ELEMENT_TODO_LI,
	isBlockAboveEmpty,
	isSelectionAtBlockStart,
	ResetBlockTypePluginOptions,
} from '@udecode/slate-plugins';

const resetBlockTypesCommonRule = {
	types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
	defaultType: ELEMENT_PARAGRAPH,
};

export const optionsResetBlockTypePlugin: ResetBlockTypePluginOptions = {
	rules: [
		{
			...resetBlockTypesCommonRule,
			hotkey: 'Enter',
			predicate: isBlockAboveEmpty,
		},
		{
			...resetBlockTypesCommonRule,
			hotkey: 'Backspace',
			predicate: isSelectionAtBlockStart,
		},
	],
};
