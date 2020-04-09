import React, { FC, Fragment } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { useTranslate } from 'ra-core';
import HelperList from './HelperList';
import { Helper, Requirement } from '../../../types/records';

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 800,
  },
}));

const HelperAssignInput: FC<{
  record: Requirement;
  onSelect: (ev: React.MouseEvent, helper: Helper) => void;
}> = props => {
  const classes = useStyles();
  const translate = useTranslate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" startIcon={<SupervisedUserCircleIcon />} onClick={handleClickOpen}>
        {translate('resources.requirements.actions.chooseHelper')}
      </Button>
      <Dialog classes={classes} open={open} onClose={handleClose}>
        <DialogTitle>{translate('resources.requirements.actions.chooseHelper')}</DialogTitle>
        <HelperList {...props} />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {translate('ra.action.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default HelperAssignInput;
