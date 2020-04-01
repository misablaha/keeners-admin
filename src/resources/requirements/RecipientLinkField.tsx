import React, { FC } from 'react';
import { ChipField, Link } from 'react-admin';
import { Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';

const RecipientLinkField: FC<FieldProps<Requirement>> = props => {
  return props.record && props.record.recipient ? (
    <Link
      key={props.record.recipient.id}
      to={`recipients/${props.record.recipient.id}`}
      onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
    >
      <ChipField record={props.record.recipient} source="name" clickable color={'primary'} />
    </Link>
  ) : null;
};

RecipientLinkField.defaultProps = {
  resource: 'requirements',
  source: 'recipient',
  sortable: false,
};

export default RecipientLinkField;
