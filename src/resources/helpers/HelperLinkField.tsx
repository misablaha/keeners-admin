import React, { FC } from 'react';
import { Link } from 'react-admin';
import Chip from '@material-ui/core/Chip';
import { Helper } from '../../types/records';
import { FieldProps } from '../../types/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    alignItems: 'center',
    display: 'flex',
  },
  callSign: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.contrastText,
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

const HelperLinkField: FC<FieldProps<Helper>> = ({ record }) => {
  const classes = useStyles();

  return record ? (
    <Link key={record.id} to={`/helpers/${record.id}`} onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
      <Chip
        color={'primary'}
        label={
          <span className={classes.label}>
            {record.callSign && <span className={classes.callSign}>{record.callSign}</span>}
            {record.name}
          </span>
        }
        clickable
      />
    </Link>
  ) : null;
};

HelperLinkField.defaultProps = {
  addLabel: true,
  label: `resources.requirements.fields.helper`,
  resource: 'requirements',
  source: 'helper',
  sortable: false,
};

export default HelperLinkField;
