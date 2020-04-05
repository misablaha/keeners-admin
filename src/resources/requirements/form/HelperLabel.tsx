import React, { FC } from 'react';
import { Link } from 'react-admin';
import { useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Helper } from '../../../types/records';

const useStyles = makeStyles((theme) => ({
  label: {
    alignItems: 'center',
    display: 'flex',
  },
  callSign: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    color: theme.palette.primary.main,
    display: 'flex',
    fontWeight: 'bold',
    height: 24,
    marginLeft: -8,
    marginRight: 4,
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
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
          color={'primary'}
          label={
            <span className={classes.label}>
              {record.callSign && <span className={classes.callSign}>{record.callSign}</span>}
              {record.name}
            </span>
          }
          clickable
          onDelete={onDelete}
        />
      </Link>
    </FormControl>
  );
};

export default HelperLabel;
