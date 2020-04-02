import React, { FC } from 'react';
import { ChipField, Link } from 'react-admin';
import { Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';

const HelperLinkField: FC<FieldProps<Requirement>> = props => {
  return props.record && props.record.helper ? (
    <Link
      key={props.record.helper.id}
      to={`/helpers/${props.record.helper.id}`}
      onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
    >
      <ChipField record={props.record.helper} source="name" clickable color={'primary'} />
    </Link>
  ) : null;
};

HelperLinkField.defaultProps = {
  addLabel: true,
  resource: 'requirements',
  source: 'helper',
  sortable: false,
};

export default HelperLinkField;
