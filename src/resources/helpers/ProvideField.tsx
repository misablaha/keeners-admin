import React, { FC, Fragment } from 'react';
import { ChipField } from 'react-admin';
import { Helper } from '../../types/records';
import { FieldProps } from '../../types/core';

const ProvideField: FC<FieldProps<Helper>> = ({ record }) => (
  <Fragment>{record && record.provide && record.provide.map((s) => <ChipField record={s} source="name" />)}</Fragment>
);

ProvideField.defaultProps = {
  addLabel: true,
  resource: 'helpers',
  source: 'provide',
  sortable: false,
};

export default ProvideField;
