import {
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grow,
	makeStyles,
	Radio,
	RadioGroup,
	Slide,
	Slider,
	Typography,
} from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import { themes } from '../../../withRoot';
import { useActions } from '../../../actions';
import * as ConfigActions from '../../../actions/config';
import { TransitionProps } from '@material-ui/core/transitions';

export interface SettingsDialogProps {
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

const SettingsDialog: FC<SettingsDialogProps> = ({ open, onClose }) => {
	const classes = useStyles();
	const config = useSelector((state: RootState) => state.config);
	const configActions = useActions(ConfigActions);
	const onUserThemeChamge = useCallback((_, theme) => {
		document.body.className = 'off';
		setTimeout(() => {
			configActions.setTheme(theme);
			document.body.className = 'on';
		}, 1000);
	}, []);
	const onFontSizeChange = useCallback((_, fontSize) => {
		configActions.setFontSize(fontSize);
	}, []);
	const themeChoices = Object.keys(themes);
	const marks = [
		{
			value: 16,
			label: 'XXS',
		},
		{
			value: 18,
			label: 'XS',
		},
		{
			value: 20,
			label: 'S',
		},
		{
			value: 22,
			label: 'M',
		},
		{
			value: 24,
			label: 'L',
		},
		{
			value: 26,
			label: 'XL',
		},
		{
			value: 28,
			label: 'XXL',
		},
	];
	return (
		<Dialog open={open} keepMounted onClose={onClose} TransitionComponent={Transition} hideBackdrop>
			<DialogTitle>Settings</DialogTitle>
			<DialogContent dividers className={classes.content}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Color theme</FormLabel>
					<RadioGroup aria-label="theme" name="theme" value={config.theme} onChange={onUserThemeChamge}>
						{themeChoices.map((themeChoice) => (
							<FormControlLabel
								value={themeChoice}
								control={
									<Radio
										icon={<span>&#xff00;</span>}
										checkedIcon={<span>&#x25CF;</span>}
										disableRipple
									/>
								}
								label={themeChoice}
							/>
						))}
					</RadioGroup>
				</FormControl>
				<FormControl component="fieldset" style={{ margin: '20px 0 10px' }}>
					<FormLabel component="legend">Text size</FormLabel>
					<Slider
						min={marks[0].value}
						max={marks[marks.length - 1].value}
						step={null}
						marks={marks}
						valueLabelDisplay="off"
						value={config.fontSize}
						onChange={onFontSizeChange}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SettingsDialog;
