import React, { FC } from 'react';
import { Link } from 'react-admin';
import { useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import HelperIcon from '@material-ui/icons/SupervisedUserCircle';
import { Helper } from '../../../types/records';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 16,
  },
}));

const HelperLabel: FC<{ record: Helper; onDelete?: React.EventHandler<any> }> = ({ record, onDelete }) => {
  const translate = useTranslate();
  const classes = useStyles();

  return (
    <FormControl>
      <Typography variant={'caption'} color={'textSecondary'} gutterBottom>
        {translate('resources.requirements.fields.helper')}
      </Typography>
      <Link to={`/helpers/${record.id}`} onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
        <Chip
          classes={classes}
          icon={<HelperIcon />}
          color={'primary'}
          label={record.name}
          clickable
          onDelete={onDelete}
        />
      </Link>
    </FormControl>
  );
};

export default HelperLabel;
