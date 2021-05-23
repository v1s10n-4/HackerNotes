import {
	createAlignPlugin,
	createAutoformatPlugin,
	createBlockquotePlugin,
	createBoldPlugin,
	createCodeBlockPlugin,
	createCodePlugin,
	createDeserializeMDPlugin,
	createExitBreakPlugin,
	createHeadingPlugin,
	createHighlightPlugin,
	createHistoryPlugin,
	createImagePlugin,
	createItalicPlugin,
	createKbdPlugin,
	createLinkPlugin,
	createListPlugin,
	createMediaEmbedPlugin,
	createNodeIdPlugin,
	createNormalizeTypesPlugin,
	createParagraphPlugin,
	createReactPlugin,
	createResetNodePlugin,
	createSelectOnBackspacePlugin,
	createSlatePluginsComponents,
	createSlatePluginsOptions,
	createSoftBreakPlugin,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createTablePlugin,
	createTodoListPlugin,
	createTrailingBlockPlugin,
	createUnderlinePlugin,
	ELEMENT_H1,
	ELEMENT_IMAGE,
	ELEMENT_PARAGRAPH,
	SlatePlugins,
	TNode,
	withPlaceholders,
} from '@udecode/slate-plugins';
import React, { FC, useMemo, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { optionsAutoformat } from './config/autoFormat';
import { optionsResetBlockTypePlugin } from './config/resetBlockType';
import { optionsSoftBreakPlugin } from './config/softBreak';
import { optionsExitBreakPlugin } from './config/exitBreak';
import defaultTheme from '../../defaultTheme';
import { TDescendant } from '@udecode/slate-plugins-core/dist/types/TDescendant';

export interface EditorProps {
	initialValue?: TDescendant[];
	onChange?: (note: TDescendant[]) => void;
}

const useStyles = makeStyles((theme) => ({
	root: {
		caretColor: theme.palette.text.primary,
		caretShape: 'block',
		paddingLeft: '3.5rem',
		'& [data-slate-node="element"]:before': {
			content: "'>'",
			position: 'absolute',
			bottom: '0%',
			left: '-2.5rem',
		},
		'& *': {
			fontFamily: theme.typography.fontFamily,
			color: 'transparent',
			textShadow: `0 0 0 ${theme.palette.text.primary}`,
		},
		'& blockquote': {
			borderLeft: `2px solid ${theme.palette.primary.main}`,
		},
		'& .slate-code, & .slate-code_block': {
			border: `1px solid ${defaultTheme.color.primaryMain}`,
			borderRadius: 0,
			backgroundColor: defaultTheme.color.backgroundDefault,
		},
		'& .slate-li': {
			color: `${theme.palette.text.primary} !important`,
		},
	},
}));

let components = withPlaceholders(createSlatePluginsComponents(), []);

const options = createSlatePluginsOptions();

export const createElement = (
	text = '',
	{
		type = ELEMENT_PARAGRAPH,
		mark,
	}: {
		type?: string;
		mark?: string;
	} = {}
) => {
	const leaf = { text };
	if (mark) {
		// @ts-ignore
		leaf[mark] = true;
	}

	return {
		type,
		children: [leaf],
	};
};

const Editor: FC<EditorProps> = ({ initialValue, onChange }) => {
	const classes = useStyles();
	const editableProps = { autoFocus: true, className: classes.root };

	const pluginsMemo = useMemo(() => {
		const plugins = [
			createReactPlugin(),
			createHistoryPlugin(),
			createParagraphPlugin(),
			createBlockquotePlugin(),
			createTodoListPlugin(),
			createHeadingPlugin(),
			createImagePlugin(),
			createLinkPlugin(),
			createListPlugin(),
			createTablePlugin(),
			createMediaEmbedPlugin(),
			createCodeBlockPlugin(),
			createAlignPlugin(),
			createBoldPlugin(),
			createCodePlugin(),
			createItalicPlugin(),
			createHighlightPlugin(),
			createUnderlinePlugin(),
			createStrikethroughPlugin(),
			createSubscriptPlugin(),
			createSuperscriptPlugin(),
			createKbdPlugin(),
			createNodeIdPlugin(),
			createAutoformatPlugin(optionsAutoformat),
			createResetNodePlugin(optionsResetBlockTypePlugin),
			createSoftBreakPlugin(optionsSoftBreakPlugin),
			createExitBreakPlugin(optionsExitBreakPlugin),
			createNormalizeTypesPlugin({
				rules: [{ path: [0, 0], strictType: ELEMENT_H1 }],
			}),
			createTrailingBlockPlugin({
				type: ELEMENT_PARAGRAPH,
				level: 1,
			}),
			createSelectOnBackspacePlugin({ allow: ELEMENT_IMAGE }),
		];

		// @ts-ignore
		plugins.push(createDeserializeMDPlugin({ plugins }));

		return plugins;
	}, []);

	return (
		<SlatePlugins
			id={'main'}
			components={components}
			initialValue={initialValue}
			editableProps={editableProps}
			onChange={onChange}
			plugins={pluginsMemo}
			options={options}
		/>
	);
};

export default Editor;
