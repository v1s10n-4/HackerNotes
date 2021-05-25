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
	withPlaceholders,
} from '@udecode/slate-plugins';
import React, { FC, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
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
		height: '100%',
		overflow: 'auto',
		caretColor: theme.palette.text.primary,
		caretShape: 'block',
		paddingLeft: '3.5rem',
		'& [data-slate-node="element"]': {
			position: 'relative',
		},
		'& [data-slate-node="element"]:before': {
			content: "'>'",
			fontSize: '1.5rem',
			position: 'absolute',
			bottom: '15%',
			left: -25,
		},
		'& .slate-ul:before, & .slate-ol:before, & .slate-li:before': {
			content: "''",
		},
		'& [class^="slate-"]': {
			fontFamily: theme.typography.fontFamily,
			color: 'transparent',
			textShadow: `0 0 0 ${theme.palette.text.primary}`,
		},
		'& li div:not([class^="slate-"])': {
			'&:before': {
				bottom: 0,
				left: -50,
			},
		},
		'& div:not([class^="slate-"])': {
			'&:before': {
				bottom: 0,
			},
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
		'& input': {
			filter: 'hue-rotate(100deg) invert(1)',
		},
	},
}));

let components = withPlaceholders(createSlatePluginsComponents(), []);

const options = createSlatePluginsOptions();
const Editor: FC<EditorProps> = ({ initialValue, onChange }) => {
	const classes = useStyles();
	const editableProps = { autoFocus: true, className: `mousetrap ${classes.root}` };

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
