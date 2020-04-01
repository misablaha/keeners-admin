import { CHANGE_THEME, ChangeThemeAction } from './ThemeSwitchButton';

export default (previousState = 'light', { type, payload }: ChangeThemeAction) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};
