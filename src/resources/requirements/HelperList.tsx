import { difference, filter, forEach } from 'lodash';
import moment from 'moment';
import { getDistance } from 'geolib';
import React, { FC } from 'react';
import { Datagrid, NumberField } from 'react-admin';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Helper, Requirement, Service } from '../../types/records';
import { useGetList, useTranslate } from 'ra-core';
import HelperLinkField from '../helpers/HelperLinkField';
import { FieldProps } from '../../types/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

interface RequirementFormState extends Requirement {
  demandIds: string[];
  helperId: string;
  recipientId: string;
  supervisorId: string;
}

const HelperActivityField: FC<FieldProps<Helper>> = ({ record }) => {
  const requirements = useGetList<Helper>(
    'requirements',
    { perPage: 1, page: 1 },
    { field: 'id', order: 'ASC' },
    {
      'helperId||$eq': record ? record.id : 0,
      'createdTime||$gte': moment()
        .startOf('d')
        .subtract(7, 'd')
        .toDate()
        .toISOString(),
    },
  );

  return requirements.loading ? (
    <CircularProgress size={24} />
  ) : (
    <Typography variant={'body2'} align={'right'}>
      {requirements.total}
    </Typography>
  );
};

HelperActivityField.defaultProps = {
  textAlign: 'right',
  sortable: false,
  label: 'resources.helpers.fields.activity',
};

const AssignButton: FC<FieldProps<Helper> & { onClick: (record: Helper) => void }> = ({ record, onClick }) => {
  const translate = useTranslate();
  const handleClick = React.useCallback(() => {
    record && onClick(record);
  }, [onClick, record]);

  return (
    <Button color={'primary'} startIcon={<AssignmentIndIcon />} onClick={handleClick}>
      {translate('resources.requirements.actions.assign')}
    </Button>
  );
};

AssignButton.defaultProps = {
  textAlign: 'right',
};

function getRandomKey() {
  return Math.random()
    .toString(36)
    .substring(7);
}

const HelperList: FC<{ record: RequirementFormState; onSelect: (helper: Helper) => void }> = ({ record, onSelect }) => {
  const classes = useStyles();
  const helpers = useGetList<Helper>(
    'helpers',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isActive||$eq': true },
  );
  const services = useGetList<Service>(
    'services',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isInternal||$eq': false },
  );
  const [ids, setIds] = React.useState<Array<string>>([]);
  const [session, setSession] = React.useState<string>(getRandomKey());

  React.useEffect(() => {
    const required = filter(record.demandIds, id => services.data && services.data[id]);
    if (required.length === 0 || !record.location) {
      // Nothing is needed ... Do not offer helpers
      setIds([]);
    } else {
      forEach(helpers.data, h => {
        Object.assign(h, { distance: getDistance(record.location, h.location) });
      });

      setIds(
        // Filter helpers that provide all required services
        // difference([1,2,3], [1,2]) => [ 3 ]
        // difference([1,2,3], [1,2,3,4]) => []
        filter(helpers.data, h => difference(required, h.provideIds).length === 0)
          .sort((a, b) => a.distance - b.distance)
          .map(h => h.id)
          .slice(0, 15),
      );
      setSession(getRandomKey());
    }
  }, [setIds, setSession, helpers.loaded, services.loaded, record.demandIds, record.location]);

  return (
    <Datagrid
      {...helpers}
      ids={ids}
      currentSort={{ field: 'distance', order: 'ASC' }}
      optimized
      hasBulkActions={false}
      rowClick={null}
      selectedIds={[]}
    >
      <HelperLinkField cellClassName={classes.cell} headerClassName={classes.cell} />
      <NumberField
        cellClassName={classes.cell}
        headerClassName={classes.cell}
        label={`resources.helpers.fields.distance`}
        source="distance"
        sortable={false}
      />
      <HelperActivityField key={session} cellClassName={classes.cell} headerClassName={classes.cell} />
      <AssignButton cellClassName={classes.cell} headerClassName={classes.cell} onClick={onSelect} />
    </Datagrid>
  );
};

export default HelperList;
