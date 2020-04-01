import { CHANGE_FONT_SIZE, ChangeFontSizeAction } from './FontSizeButton';

export default (previousState = 'light', { type, payload }: ChangeFontSizeAction) => {
    if (type === CHANGE_FONT_SIZE) {
        return payload;
    }
    return previousState;
};
