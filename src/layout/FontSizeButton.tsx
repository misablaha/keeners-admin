import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import { AppState, FontSize } from '../types/core';

export const CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE';

export interface ChangeFontSizeAction {
  type: typeof CHANGE_FONT_SIZE;
  payload: FontSize;
}

export const changeTheme = (size: FontSize): ChangeFontSizeAction => ({
  type: CHANGE_FONT_SIZE,
  payload: size,
});

const FontSizeButton: FC = (props) => {
  const fontSize = useSelector((state: AppState) => state.fontSize);
  const dispatch = useDispatch();

  return (
    <IconButton color="inherit" onClick={() => dispatch(changeTheme(fontSize === 'large' ? 'medium' : 'large'))}>
      <FormatSizeIcon />
    </IconButton>
  );
};

export default FontSizeButton;
