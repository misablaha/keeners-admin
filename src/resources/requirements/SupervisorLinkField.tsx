import React, { FC } from 'react';
import { ChipField, Link } from 'react-admin';
import { Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';

const SupervisorLinkField: FC<FieldProps<Requirement>> = props => {
  return props.record && props.record.supervisor ? (
    <Link
      key={props.record.supervisor.id}
      to={`supervisors/${props.record.supervisor.id}`}
      onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
    >
      <ChipField record={props.record.supervisor} source="name" clickable color={'primary'} />
    </Link>
  ) : null;
};

SupervisorLinkField.defaultProps = {
  addLabel: true,
  resource: 'requirements',
  source: 'supervisor',
  sortable: false,
};

export default SupervisorLinkField;
