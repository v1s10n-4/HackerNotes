import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grow,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { TransitionProps } from '@material-ui/core/transitions';

export interface EditorHelpDialogProps {
	open: boolean;
	onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
	content: {
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column',
	},
}));

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Grow ref={ref} {...props} />;
});

const EditorHelpDialog: FC<EditorHelpDialogProps> = ({ open, onClose }) => {
	const classes = useStyles();
	return (
		<Dialog open={open} onClose={onClose} TransitionComponent={Transition} hideBackdrop>
			<DialogTitle>Help</DialogTitle>
			<DialogContent dividers className={classes.content}>
				<Typography variant={'caption'}>** or __ around text then space: **bold**.</Typography>
				<Typography variant={'caption'}>* or _ around text then space: *italicize*.</Typography>
				<Typography variant={'caption'}>` around text then space: create `inline code`.</Typography>
				<Typography variant={'caption'}>~~ around text then space: ~~strikethrough~~.</Typography>
				<Typography variant={'caption'} gutterBottom>
					``` to create a code block below.
				</Typography>
				<Typography variant={'caption'} paragraph>
					At the beginning of a line, try these:
				</Typography>
				<Typography variant={'caption'}>[] then space: todo list.</Typography>
				<Typography variant={'caption'}>*, - or + then space: bulleted list.</Typography>
				<Typography variant={'caption'}>1. or 1) then space: numbered list.</Typography>
				<Typography variant={'caption'}>&gt; then space: block quote.</Typography>
				<Typography variant={'caption'}>``` to create a code block.</Typography>
				<Typography variant={'caption'}># then space: H1.</Typography>
				<Typography variant={'caption'}>## then space: H2.</Typography>
				<Typography variant={'caption'}>### then space: H3.</Typography>
				<Typography variant={'caption'}>#### then space: H4.</Typography>
				<Typography variant={'caption'}>##### then space: H5.</Typography>
				<Typography variant={'caption'}>###### then space: H6.</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditorHelpDialog;
