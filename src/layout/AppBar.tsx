import React, { FC } from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ThemeSwitchButton from './ThemeSwitchButton';
import FontSizeButton from './FontSizeButton';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const CustomAppBar: FC = props => {
  const classes = useStyles();

  return (
    <AppBar {...props}>
      <Typography variant="h6" color="inherit" className={classes.title} id="react-admin-title" />
      <FontSizeButton />
      <ThemeSwitchButton />
    </AppBar>
  );
};

export default CustomAppBar;
