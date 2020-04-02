import React, { FC } from 'react';
import { ChipField, Link } from 'react-admin';
import { Helper } from '../../types/records';
import { FieldProps } from '../../types/core';

const HelperLinkField: FC<FieldProps<Helper>> = props => {
  return props.record ? (
    <Link
      key={props.record.id}
      to={`/helpers/${props.record.id}`}
      onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
    >
      <ChipField record={props.record} source="name" clickable color={'primary'} />
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
