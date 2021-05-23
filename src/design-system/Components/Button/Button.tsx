import React, { FC } from 'react';
import { Button as MuiButton, ButtonProps } from '@material-ui/core';

export type BP = ButtonProps;

export const Button: FC<BP> = props => <MuiButton {...props}/>;
