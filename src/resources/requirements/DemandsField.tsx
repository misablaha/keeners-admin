import React, { FC, Fragment } from 'react';
import { useDataProvider } from 'ra-core';
import { Demand, DemandStatus, Requirement } from '../../types/records';
import { FieldProps } from '../../types/core';
import DemandChip from './DemandChip';

const DemandsField: FC<FieldProps<Requirement>> = ({ record }) => {
  const dataProvider = useDataProvider();

  const handleChangeStatus = React.useCallback(
    (demand: Demand, status: DemandStatus) => () => {
      if (record) {
        dataProvider
          .update(`requirements/${record.id}/demands`, { id: demand.id, data: { status }, previousData: demand })
          .then(() => dataProvider.getOne('requirements', { id: record.id }));
      }
    },
    [record, dataProvider],
  );

  const nextStatusMap: { [key in DemandStatus]: DemandStatus | null } = {
    [DemandStatus.NEW]: DemandStatus.SUBMITTED,
    [DemandStatus.SUBMITTED]: DemandStatus.DONE,
    [DemandStatus.DONE]: null,
    [DemandStatus.CANCELED]: null,
  };

  return record && record.demands ? (
    <Fragment>
      {record.demands.map((d) => {
        const nextStatus = nextStatusMap[d.status];
        return (
          <DemandChip key={d.id} record={d} onDelete={nextStatus ? handleChangeStatus(d, nextStatus) : undefined} />
        );
      })}
    </Fragment>
  ) : null;
};

DemandsField.defaultProps = {
  addLabel: true,
  resource: 'requirements',
  source: 'demands',
  sortable: false,
};

export default DemandsField;
