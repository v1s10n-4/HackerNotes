import * as React from 'react';
import { AppBar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import Editor from '../design-system/Components/Editor/Editor';
import { useActions } from '../actions';
import { Fragment, useCallback } from 'react';
import * as NoteActions from '../actions/note';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
		top: 'auto',
		bottom: 0,
		backgroundColor: theme.palette.background.default,
		padding: 10,
	},
}));

export function Terminal() {
	const classes = useStyles();
	const lastNote = useSelector((state: RootState) => state.noteList[0]);
	const currentNote = JSON.parse(lastNote.text);
	const noteActions = useActions(NoteActions);
	const onChange = useCallback(
		(note) => {
			noteActions.editNote({ id: lastNote.id, text: JSON.stringify(note) });
		},
		[noteActions, currentNote]
	);
	return (
		<Fragment>
			{/*<Box width={'100%'} display={'flex'} justifyContent={'space-between'}>*/}
			{/*	<Typography variant="h4">You have {todoList.length} Note!</Typography>*/}
			{/*	<Button>create note</Button>*/}
			{/*</Box>*/}
			<Editor initialValue={currentNote} onChange={onChange} />
			<AppBar variant={'outlined'} position={'fixed'} className={classes.appBar} component={'footer'}>
				<Button>new note</Button>
			</AppBar>
		</Fragment>
	);
}
