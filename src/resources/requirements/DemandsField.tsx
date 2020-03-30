import React, { FC, Fragment } from 'react';
import { ChipField } from 'react-admin';
import { Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';

const DemandsField: FC<FieldProps<Requirement>> = props => {
  return props.record && props.record.demands ? (
    <Fragment>
      {props.record.demands.map(s => (
        <ChipField key={s.id} record={s} source="name" />
      ))}
    </Fragment>
  ) : null;
};

DemandsField.defaultProps = {
  resource: 'requirements',
  source: 'demands',
  sortable: false,
};

export default DemandsField;
