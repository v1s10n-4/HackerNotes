import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

export interface EditorHelpDialogProps {
	open: boolean;
	onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
	content: {
		marginBottom: 20,
	},
}));
// prettier-ignore
const EditorHelpDialog: FC<EditorHelpDialogProps> = ({ open, onClose }) => {
	const classes = useStyles();
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Help</DialogTitle>
			<DialogContent dividers className={classes.content}>
				<Typography variant={'caption'} paragraph>
					** or __ around text then space: **bold**.
				</Typography>
				<Typography variant={'caption'} paragraph>
					* or _ around text then space: *italicize*.
				</Typography>
				<Typography variant={'caption'} paragraph>
					` around text then space: create `inline code`.
				</Typography>
				<Typography variant={'caption'} paragraph>
					~~ around text then space: ~~strikethrough~~.
				</Typography>
				<Typography variant={'caption'} paragraph>
					``` to create a code block below.
				</Typography>
				<Typography variant={'caption'} paragraph>
					At the beginning of a line, try these:
				</Typography>
				<Typography variant={'caption'} paragraph>
					*, - or + then space: bulleted list.
				</Typography>
				<Typography variant={'caption'} paragraph>
					1. or 1) then space: numbered list.
				</Typography>
				<Typography variant={'caption'} paragraph>
					&gt; then space: block quote.
				</Typography>
				<Typography variant={'caption'} paragraph>
					``` to create a code block.
				</Typography>
				<Typography variant={'caption'} paragraph>
					# then space: H1.
				</Typography>
				<Typography variant={'caption'} paragraph>
					## then space: H2.
				</Typography>
				<Typography variant={'caption'} paragraph>
					### then space: H3.
				</Typography>
				<Typography variant={'caption'} paragraph>
					#### then space: H4.
				</Typography>
				<Typography variant={'caption'} paragraph>
					##### then space: H5.
				</Typography>
				<Typography variant={'caption'} paragraph>
					###### then space: H6.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditorHelpDialog;
