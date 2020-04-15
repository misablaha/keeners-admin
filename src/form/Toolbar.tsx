import React, { FC } from 'react';
import { CloneButton, DeleteWithConfirmButton, SaveButton, Toolbar as RAToolbar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { pickToolbarProps } from './utils';
import { BaseRecord } from '../types/records';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
  },
}));

const Toolbar: FC<{ record?: Partial<BaseRecord>; showClone?: boolean }> = (props) => {
  const classes = useStyles();

  return (
    <RAToolbar className={classes.container} submitOnEnter={false} {...pickToolbarProps(props)}>
      <SaveButton {...props} />
      <Box display={'flex'} flex={1} />
      <ButtonGroup variant="text">
        {props.record && props.record.id && props.showClone && <CloneButton {...props} />}
        {props.record && props.record.id && <DeleteWithConfirmButton {...props} />}
      </ButtonGroup>
    </RAToolbar>
  );
};

export default Toolbar;
