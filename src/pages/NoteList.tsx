import * as React from 'react';
import { AppBar, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useActions } from '../actions';
import { Fragment, KeyboardEventHandler, useCallback } from 'react';
import * as NoteActions from '../actions/note';
import { router } from '../Router';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import shortid from 'shortid';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';

const useStyles = makeStyles((theme) => ({
	'@global': {
		'*::selection': {
			color: theme.palette.background.default,
			backgroundColor: theme.palette.primary.main,
		},
	},
}));

const getOptionLabel = (n: { id?: string; text: string }) =>
	'* ' + (n.text === 'new note' ? n.text : JSON.parse(n.text).shift().children[0].text || 'Untitled');

const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} autoFocus variant={'outlined'} />;

export const NoteList = () => {
	useStyles();
	const noteList = useSelector((state: RootState) => state.noteList);
	console.log(noteList);
	const noteActions = useActions(NoteActions);
	const history = useHistory();

	const createNote = useCallback(() => {
		const newNote = {
			id: shortid.generate(),
			text: JSON.stringify([{ type: 'p', children: [{ text: '' }] }]),
		};
		noteActions.addNote(newNote);
		history.push(router.note({ id: newNote.id }).$);
	}, [history, noteActions]);

	const goToNote = useCallback(
		(_, note) => {
			if (!note.id) createNote();
			else history.push(router.note({ id: note.id }).$);
		},
		[history, createNote]
	);

	const toggleSettingsDialog = () => {};

	const checkCommand: KeyboardEventHandler = (e) => {
		const lastValue = (e.target as HTMLInputElement).value.trim();
		const isNewNoteCommand = (lastValue === '/new' || lastValue === '/create') && e.key === 'Enter';
		if (isNewNoteCommand || (e.metaKey && e.key === 'k')) {
			e.preventDefault();
			createNote();
		}
		console.log(lastValue, e);
	};

	const checkShortcut: KeyboardEventHandler = (e) => {
		if (e.metaKey) {
			e.preventDefault();
			if (e.key === 'd') createNote();
			if (e.key === '/') toggleSettingsDialog();
		}
	};

	return (
		<Fragment>
			<Autocomplete
				open
				options={[...noteList, { text: 'new note' }]}
				getOptionLabel={getOptionLabel}
				renderInput={renderInput}
				onChange={goToNote}
				closeIcon={null}
				forcePopupIcon={false}
				onKeyPress={checkCommand}
				onKeyDown={checkShortcut}
				fullWidth
			/>
			<AppBar variant={'outlined'} position={'relative'} component={'footer'}>
				<Typography color={'textPrimary'} variant={'caption'}>
					Type <b>/new</b> or <b>/create</b> or press <b>&lt;Cmd&gt;+&lt;d&gt;</b> to{' '}
					<Button variant={'text'} onClick={createNote}>
						create a new note
					</Button>
				</Typography>
				<Typography color={'textPrimary'} variant={'caption'}>
					Press <b>&lt;cmd&gt;+&lt;/&gt;</b> to <Button variant={'text'}>open settings</Button>
				</Typography>
			</AppBar>
		</Fragment>
	);
};

export default NoteList;
