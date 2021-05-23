import React from 'react';
import { themes } from '@storybook/theming';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import formatTheme from '../src/design-system/FormatTheme';
import defaultTheme from '../src/design-system/defaultTheme';
import '../src/index.css';
import { CssBaseline } from '@material-ui/core';

export const parameters = {
  docs: {
    theme: themes.dark,
  },
  layout: 'centered',
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: defaultTheme.color.backgroundDefault
      },
      {
        name: 'paper',
        value: defaultTheme.color.backgroundPaper
      }
    ]
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {
    const theme = createMuiTheme(formatTheme(defaultTheme));
    return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
      )
    },
];
