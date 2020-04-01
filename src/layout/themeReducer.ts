import { CHANGE_THEME, ChangeThemeAction } from './ThemeSwitchButton';
import { ThemeName } from '../types/core';

const defaultTheme: ThemeName =
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') || 'light';

export default (previousState = defaultTheme, { type, payload }: ChangeThemeAction) => {
  if (type === CHANGE_THEME) {
    return payload;
  }
  return previousState;
};
