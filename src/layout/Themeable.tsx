import React, { Children, cloneElement, FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, darkTheme, lightTheme } from './themes';
import { AppState } from '../types/core';

const Themeable: FC = ({ children }) => {
  const themeConfig = useSelector((state: AppState) => (state.theme === 'dark' ? darkTheme : lightTheme));
  const fontSize = useSelector((state: AppState) => state.fontSize);
  const [theme, setTheme] = React.useState(createTheme(themeConfig, fontSize));

  React.useEffect(() => {
    setTheme(createTheme(themeConfig, fontSize));
  }, [themeConfig, fontSize, setTheme]);

  return <Fragment>{Children.map(children, (child: any) => cloneElement(child, { theme }))}</Fragment>;
};

export default Themeable;
