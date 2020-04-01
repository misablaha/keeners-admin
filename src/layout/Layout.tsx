import { merge } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'react-admin';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import AppBar from './AppBar';
import { darkTheme, lightTheme } from './themes';
import { AppState, FontSize } from '../types/core';

function getThemeConfig(themeConfig: ThemeOptions, fontSize: FontSize) {
  return merge({}, themeConfig, {
    typography: {
      fontSize: fontSize === 'large' ? 16 : 14,
    },
  });
}

export default (props: any) => {
  const themeConfig = useSelector((state: AppState) => (state.theme === 'dark' ? darkTheme : lightTheme));
  const fontSize = useSelector((state: AppState) => state.fontSize);
  const [theme, setTheme] = React.useState(createMuiTheme(getThemeConfig(themeConfig, fontSize)));

  React.useEffect(() => {
    setTheme(createMuiTheme(getThemeConfig(themeConfig, fontSize)));
  }, [themeConfig, fontSize, setTheme]);

  return <Layout {...props} appBar={AppBar} theme={theme} />;
};
