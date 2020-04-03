import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DayIcon from '@material-ui/icons/Brightness7';
import NightIcon from '@material-ui/icons/Brightness4';
import { AppState, ThemeName } from '../types/core';

export const CHANGE_THEME = 'CHANGE_THEME';

export interface ChangeThemeAction {
  type: typeof CHANGE_THEME;
  payload: ThemeName;
}

export const changeTheme = (theme: ThemeName): ChangeThemeAction => ({
  type: CHANGE_THEME,
  payload: theme,
});

const ThemeSwitchButton: FC = (props) => {
  const theme = useSelector((state: AppState) => state.theme);
  const dispatch = useDispatch();

  return theme === 'dark' ? (
    <IconButton color="inherit" onClick={() => dispatch(changeTheme('light'))}>
      <DayIcon />
    </IconButton>
  ) : (
    <IconButton color="inherit" onClick={() => dispatch(changeTheme('dark'))}>
      <NightIcon />
    </IconButton>
  );
};

export default ThemeSwitchButton;
