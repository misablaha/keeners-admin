import React, { FC } from 'react';
import { FieldProps } from '../../../types/core';
import { Helper } from '../../../types/records';
import { useGetList } from 'ra-core';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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

export default HelperActivityField;
