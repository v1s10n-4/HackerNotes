import * as React from 'react';
import { AppBar, Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useActions } from '../actions';
import { Fragment, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import * as NoteActions from '../actions/note';
import { router } from '../Router';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import shortid from 'shortid';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete/useAutocomplete';
import SettingsDialog from '../design-system/Components/SettingsDialog/SettingsDialog';
import TimeAgo from 'timeago-react';
import { Note } from '../model';

const useStyles = makeStyles((theme) => ({
	'@global': {
		'*::selection': {
			color: theme.palette.background.default,
			backgroundColor: theme.palette.primary.main,
		},
	},
	delete: {
		visibility: 'hidden',
		color: theme.palette.primary.contrastText,
		fontSize: '1.5rem',
	},
	dialogContent: {
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column',
	},
}));

const getOptionLabel = (n: Note) =>
	'* ' + (n.text === 'new note' ? n.text : JSON.parse(n.text).shift().children[0].text || 'Untitled');

const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} autoFocus variant={'outlined'} />;

export const NoteList = () => {
	const classes = useStyles();
	const [value, setValue] = useState<string>('');
	const [isDeleting, setIsDeleting] = useState(false);
	const noteList = useSelector((state: RootState) => state.noteList);
	const noteActions = useActions(NoteActions);
	const history = useHistory();
	const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
	const toggleSettingsDialogOpen = useCallback(() => setSettingsDialogOpen((prev) => !prev), []);

	const createNote = useCallback(() => {
		const newNote = {
			id: shortid.generate(),
			text: JSON.stringify([{ type: 'p', children: [{ text: '' }] }]),
		};
		noteActions.addNote(newNote);
		history.push(router.note({ id: newNote.id }).$);
	}, [history, noteActions]);

	const deleteNote = useCallback(
		(id) => {
			if (id) noteActions.deleteNote(id);
		},
		[noteActions]
	);

	const goToNote = useCallback(
		(e, note) => {
			if (note) {
				if (!note.id) createNote();
				else if (note && isDeleting) {
					deleteNote(note.id);
					setTimeout(() => setValue(''), 1);
				} else history.push(router.note({ id: note.id }).$);
			}
		},
		[history, createNote, deleteNote, isDeleting]
	);

	const checkCommand: KeyboardEventHandler = (e) => {
		const lastValue = (e.target as HTMLInputElement).value.trim();
		const isNewNoteCommand = (lastValue === '/new' || lastValue === '/create') && e.key === 'Enter';
		const isSettingsCommand = lastValue === '/settings' && e.key === 'Enter';
		if (isNewNoteCommand) {
			e.preventDefault();
			createNote();
		} else if (isSettingsCommand) {
			toggleSettingsDialogOpen();
		}
	};

	const checkShortcut: KeyboardEventHandler = (e) => {
		if (e.metaKey) {
			e.preventDefault();
			if (e.key === 'd') createNote();
			if (e.key === '/') toggleSettingsDialogOpen();
		}
	};

	const onInputChange = useCallback((_, v) => setValue(v), []);

	const filterOption = useCallback((options: Note[], state: FilterOptionsState<Note>) => {
		const inputValue = state.inputValue;
		return options.filter((note: Note) => {
			const input = inputValue.replace(/(\/delete |\/remove |\/rm )/, '');
			const s = state.getOptionLabel(note).substr(2);
			return s.includes(input);
		}).sort((a, b) => b.updated_at - a.updated_at);
	}, []);

	const renderLabel = (options: Note) => {
		return (
			<Fragment>
				<Typography>{getOptionLabel(options)}</Typography>
				{options.text !== 'new note' && (
						<Typography>
							<TimeAgo datetime={options.updated_at} />
							<IconButton
								className={classes.delete}
								size={'small'}
								onClick={(e) => {
									e.stopPropagation();
									deleteNote(options.id);
								}}
							>
								<DeleteForeverSharpIcon />
							</IconButton>
						</Typography>
				)}
			</Fragment>
		);
	};

	useEffect(() => setIsDeleting(/(\/delete |\/remove |\/rm )/.test(value)), [value]);

	return (
		<Fragment>
			<Autocomplete
				open
				inputValue={value}
				options={[...noteList, { text: 'new note', id: '', updated_at: 0 }]}
				getOptionLabel={getOptionLabel}
				renderInput={renderInput}
				onChange={goToNote}
				closeIcon={null}
				forcePopupIcon={false}
				filterOptions={filterOption}
				onInputChange={onInputChange}
				onKeyPress={checkCommand}
				onKeyDown={checkShortcut}
				fullWidth
				renderOption={renderLabel}
			/>
			<AppBar variant={'outlined'} position={'relative'} component={'footer'}>
				<Typography color={'textPrimary'} variant={'caption'}>
					Type <b>/new</b> or <b>/create</b> or press <b>&lt;Cmd&gt;+&lt;d&gt;</b> to{' '}
					<Button tabIndex={-1} variant={'text'} onClick={createNote}>
						create a new note
					</Button>
				</Typography>
				<Typography color={'textPrimary'} variant={'caption'}>
					Type <b>/settings</b> or press <b>&lt;cmd&gt;+&lt;/&gt;</b> to{' '}
					<Button tabIndex={-1} variant={'text'} onClick={toggleSettingsDialogOpen}>
						open settings
					</Button>
				</Typography>
			</AppBar>
			<SettingsDialog open={settingsDialogOpen} onClose={toggleSettingsDialogOpen} />
		</Fragment>
	);
};

export default NoteList;
