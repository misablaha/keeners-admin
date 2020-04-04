import React, { FC } from 'react';
import { ChipField, Link } from 'react-admin';
import { Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';

const ClientLinkField: FC<FieldProps<Requirement>> = (props) => {
  return props.record && props.record.client ? (
    <Link
      key={props.record.client.id}
      to={`/clients/${props.record.client.id}`}
      onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
    >
      <ChipField record={props.record.client} source="name" clickable color={'primary'} />
    </Link>
  ) : null;
};

ClientLinkField.defaultProps = {
  addLabel: true,
  resource: 'requirements',
  source: 'client',
  sortable: false,
};

export default ClientLinkField;
