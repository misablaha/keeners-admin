import React, { FC } from 'react';
import { useTranslate } from 'ra-core';
import Button from '@material-ui/core/Button';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { FieldProps } from '../../../types/core';
import { Helper } from '../../../types/records';

const AssignButton: FC<FieldProps<Helper> & { onClick: (ev: React.MouseEvent, record: Helper) => void }> = ({
  record,
  onClick,
}) => {
  const translate = useTranslate();
  const handleClick = React.useCallback(
    (ev: React.MouseEvent) => {
      record && onClick(ev, record);
    },
    [onClick, record],
  );

  return (
    <Button color={'primary'} startIcon={<AssignmentIndIcon />} onClick={handleClick}>
      {translate('resources.requirements.actions.assign')}
    </Button>
  );
};

AssignButton.defaultProps = {
  textAlign: 'right',
};

export default AssignButton;
