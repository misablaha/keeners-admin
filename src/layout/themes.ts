import { merge } from 'lodash';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import { FontSize } from '../types/core';

export const darkTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#f9b700',
    },
    secondary: {
      main: '#58770b',
    },
    type: 'dark',
  },
};

export const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#6c2744',
    },
    secondary: {
      main: '#58770b',
    },
    type: 'light',
  },
};

export const createTheme = (themeConfig: ThemeOptions, fontSize: FontSize) => {
  return createMuiTheme(
    merge({}, themeConfig, {
      typography: {
        fontSize: fontSize === 'large' ? 16 : 14,
      },
    }),
  );
};
