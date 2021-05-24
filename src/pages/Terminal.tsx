import * as React from 'react';
import { AppBar, Box, Button, Dialog, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import Editor from '../design-system/Components/Editor/Editor';
import { useActions } from '../actions';
import { Fragment, useCallback, useState } from 'react';
import * as NoteActions from '../actions/note';
import { useHotkeys } from 'reakeys';
import EditorHelpDialog from '../design-system/Components/EditorHelpDialog/EditorHelpDialog';
import { useRouteParams } from 'react-typesafe-routes';
import { router } from '../Router';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	'@global': {
		'*::selection': {
			color: theme.palette.background.default,
			backgroundColor: theme.palette.primary.main,
		},
	},
	appBar: {
		backgroundColor: theme.palette.background.default,
		border: 'none',

		borderTop: `3px solid ${theme.palette.primary.main}`,
		zIndex: 0,
		padding: '5px 15px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}));

export const Terminal = () => {
	const classes = useStyles();
	const history = useHistory();
	const noteActions = useActions(NoteActions);

	const { id } = useRouteParams(router.note);
	const lastNote = useSelector((state: RootState) => state.noteList.find((x) => x.id == id));
	const currentNoteValue = lastNote && JSON.parse(lastNote.text);

	const [helpDialogOpen, setHelpDialogOpen] = useState(false);
	const toggleHelpDialogOpen = useCallback(() => setHelpDialogOpen((prev) => !prev), []);

	const onChange = useCallback(
		(note) => {
			if (lastNote) noteActions.editNote({ id: lastNote.id, text: JSON.stringify(note) });
		},
		[noteActions, currentNoteValue]
	);

	console.log(id);

	const goToList = useCallback(() => history.push(router.list().$), []);

	const hotKeys = useHotkeys([
		{
			name: 'Save and exit',
			description: 'Save you current note then redirect to notes list',
			keys: 'esc',
			callback: goToList,
		},
		{
			name: 'Help',
			description: 'Display this help message',
			keys: 'mod+/',
			callback: toggleHelpDialogOpen,
		},
	]);

	return (
		<Fragment>
			<Editor initialValue={currentNoteValue} onChange={onChange} />
			<AppBar variant={'outlined'} position={'relative'} className={classes.appBar} component={'footer'}>
				<Typography color={'textPrimary'} variant={'caption'}>
					Press &lt;Esc&gt; to{' '}
					<Button variant={'text'} onClick={goToList}>
						save & exit
					</Button>
				</Typography>
				<Typography color={'textPrimary'} variant={'caption'}>
					Press &lt;cmd&gt;+&lt;/&gt; for
					<Button variant={'text'} onClick={toggleHelpDialogOpen}>
						help
					</Button>
				</Typography>
			</AppBar>
			<EditorHelpDialog open={helpDialogOpen} onClose={toggleHelpDialogOpen} />
		</Fragment>
	);
};

export default Terminal;
