import { difference, filter, forEach } from 'lodash';
import moment from 'moment';
import { getDistance } from 'geolib';
import React, { FC } from 'react';
import { useGetList } from 'ra-core';
import { Datagrid, NumberField } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Helper, Requirement } from '../../../types/records';
import HelperLinkField from '../../helpers/HelperLinkField';
import { FieldProps } from '../../../types/core';
import AssignButton from './AssignButton';
import { RecordMap } from 'ra-core/esm/types';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

const HelperActivityField: FC<FieldProps<Helper>> = ({ record }) => {
  const requirements = useGetList<Helper>(
    'requirements',
    { perPage: 1, page: 1 },
    { field: 'id', order: 'ASC' },
    {
      'helperId||$eq': record ? record.id : 0,
      'createdAt||$gte': moment().startOf('d').subtract(7, 'd').toDate().toISOString(),
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

const HelperList: FC<{ record: Requirement; onSelect: (ev: React.MouseEvent, helper: Helper) => void }> = ({
  record,
  onSelect,
}) => {
  const classes = useStyles();
  const helpers = useGetList<Helper>(
    'helpers',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isActive||$eq': true },
  );
  const [ids, setIds] = React.useState<Array<string>>([]);
  const [data, setData] = React.useState<RecordMap<Helper>>({});

  React.useEffect(() => {
    setData(helpers.data || {});
  }, [helpers.loaded, setData]);

  React.useEffect(() => {
    const required: string[] = (record.demands || [])
      .map((d) => d.service)
      .filter((s) => !s.isInternal)
      .map((s) => s.id);

    if (required.length === 0 || !record.location) {
      // Nothing is needed ... Do not offer helpers
      setIds([]);
    } else {
      forEach(data, (h) => {
        Object.assign(h, { distance: getDistance(record.location, h.location) });
      });

      setIds(
        // Filter helpers that provide all required services
        // difference([1,2,3], [1,2]) => [ 3 ]
        // difference([1,2,3], [1,2,3,4]) => []
        filter(data, (h) => difference(required, h.provideIds).length === 0)
          .sort((a, b) => a.distance - b.distance)
          .map((h) => h.id)
          .slice(0, 50),
      );
    }
  }, [data, record.demands, record.location, setIds]);

  return (
    <Datagrid
      {...helpers}
      data={data}
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
      <HelperActivityField cellClassName={classes.cell} headerClassName={classes.cell} />
      <AssignButton cellClassName={classes.cell} headerClassName={classes.cell} onClick={onSelect} />
    </Datagrid>
  );
};

export default HelperList;
