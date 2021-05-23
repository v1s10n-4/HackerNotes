import * as React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import Editor from '../design-system/Components/Editor/Editor';
import { useActions } from '../actions';
import { useCallback } from 'react';
import * as NoteActions from '../actions/note';

// const useStyles = makeStyles({
//
// });

export function Terminal() {
	// const classes = useStyles();
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
		<Box height={'100%'} p={4}>
			{/*<Box width={'100%'} display={'flex'} justifyContent={'space-between'}>*/}
			{/*	<Typography variant="h4">You have {todoList.length} Note!</Typography>*/}
			{/*	<Button>create note</Button>*/}
			{/*</Box>*/}
			<Editor initialValue={currentNote} onChange={onChange} />
		</Box>
	);
}
