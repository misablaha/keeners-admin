import React, { FC, Fragment } from 'react';
import { FieldProps } from '../../types/core';
import { openRequirementStatuses, Requirement, RequirementStatus } from '../../types/records';
import { useDataProvider, useTranslate } from 'ra-core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const StatusButtons: FC<FieldProps<Requirement>> = ({ record, resource }) => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();
  const [loading, setLoading] = React.useState(false);

  const handleClick = React.useCallback(
    (ev: React.MouseEvent, status: RequirementStatus) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (record && resource) {
        setLoading(true);
        dataProvider.update(resource, { id: record.id, previousData: record, data: { status } }).finally(() => {
          setLoading(false);
        });
      }
    },
    [dataProvider, resource, record],
  );

  return record && openRequirementStatuses.includes(record.status) ? (
    <Fragment>
      <Tooltip title={translate('resources.requirements.actions.done')}>
        <IconButton onClick={ev => handleClick(ev, RequirementStatus.DONE)} disabled={loading}>
          <CheckCircleOutlineIcon color={'secondary'} />
        </IconButton>
      </Tooltip>
      <Tooltip title={translate('resources.requirements.actions.cancel')}>
        <IconButton onClick={ev => handleClick(ev, RequirementStatus.CANCEL)} disabled={loading}>
          <HighlightOffIcon color={'error'} />
        </IconButton>
      </Tooltip>
    </Fragment>
  ) : null;
};

StatusButtons.defaultProps = {
  textAlign: 'right',
  resource: 'requirements',
};

export default StatusButtons;
