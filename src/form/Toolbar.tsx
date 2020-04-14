import React, { FC } from 'react';
import { Toolbar as RAToolbar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { pickToolbarProps } from './utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
  },
}));

const Toolbar: FC = (props) => {
  const classes = useStyles();

  return <RAToolbar className={classes.container} submitOnEnter={false} {...pickToolbarProps(props)} />;
};

export default Toolbar;
