import * as React from 'react';
import { AppBar, Button, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import Editor from '../design-system/Components/Editor/Editor';
import { useActions } from '../actions';
import { Fragment, useCallback, useState } from 'react';
import * as NoteActions from '../actions/note';
import { useHotkeys } from 'reakeys';
import { useRouteParams } from 'react-typesafe-routes';
import { router } from '../Router';
import { useHistory } from 'react-router-dom';
import EditorHelpDialog from '../design-system/Components/EditorHelpDialog/EditorHelpDialog';

const useStyles = makeStyles((theme) => ({
	'@global': {
		'*::selection': {
			color: theme.palette.background.default,
			backgroundColor: theme.palette.primary.main,
		},
	},
}));

export const Terminal = () => {
	useStyles();
	const history = useHistory();
	const noteActions = useActions(NoteActions);

	const { id } = useRouteParams(router.note);
	const lastNote = useSelector((state: RootState) => state.noteList.find((x) => x.id === id));
	const currentNoteValue = lastNote && JSON.parse(lastNote.text);

	const [helpDialogOpen, setHelpDialogOpen] = useState(false);
	const toggleHelpDialogOpen = useCallback(() => setHelpDialogOpen((prev) => !prev), []);

	const onChange = useCallback(
		(note) => {
			if (id) noteActions.editNote({ id: id, text: JSON.stringify(note) });
		},
		[noteActions, id]
	);

	const goToList = useCallback(() => history.push(router.list().$), [history]);

	const shortcuts = useHotkeys([
		{
			name: 'save & exit',
			description: 'Press <Esc> to',
			keys: 'esc',
			callback: goToList,
		},
		{
			name: 'help',
			description: 'Press <cmd>+</> for',
			keys: 'mod+/',
			callback: toggleHelpDialogOpen,
		},
	]);

	return (
		<Fragment>
			<Editor initialValue={currentNoteValue} onChange={onChange} />
			<AppBar variant={'outlined'} position={'relative'} component={'footer'}>
				{shortcuts.map((shortcut) => (
					<Typography color={'textPrimary'} variant={'caption'} key={shortcut.keys}>
						{shortcut.description}
						<Button variant={'text'} onClick={shortcut.callback}>
							{shortcut.name}
						</Button>
					</Typography>
				))}
			</AppBar>
			<EditorHelpDialog open={helpDialogOpen} onClose={toggleHelpDialogOpen} />
		</Fragment>
	);
};

export default Terminal;
