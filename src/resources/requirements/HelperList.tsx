import { difference, filter, forEach } from 'lodash';
import { getDistance } from 'geolib';
import React, { FC } from 'react';
import { Datagrid, NumberField } from 'react-admin';
import Button from '@material-ui/core/Button';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Helper, Requirement, Service } from '../../types/records';
import { useGetList } from 'ra-core';
import HelperLinkField from '../helpers/HelperLinkField';

interface RequirementFormState extends Requirement {
  demandIds: string[];
  helperId: string;
  recipientId: string;
  supervisorId: string;
}

const AssignButton: FC<{ record?: Helper; onClick: (record: Helper) => void }> = ({ record, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(record!);
  }, [record]);

  return (
    <Button color={'primary'} startIcon={<AssignmentIndIcon />} onClick={handleClick}>
      Přiřadit
    </Button>
  );
};

const HelperList: FC<{ record: RequirementFormState; onSelect: (helper: Helper) => void }> = ({ record, onSelect }) => {
  const helpers = useGetList<Helper>(
    'helpers',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isActive||$eq': true },
  );
  const services = useGetList<Service>(
    'services',
    { perPage: 5000, page: 1 },
    { field: 'id', order: 'ASC' },
    { 'isInternal||$eq': false },
  );
  const [ids, setIds] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const required = filter(record.demandIds, id => services.data && services.data[id]);
    if (required.length === 0 || !record.location) {
      // Nothing is needed ... Do not offer helpers
      setIds([]);
    } else {
      forEach(helpers.data, h => {
        Object.assign(h, { distance: getDistance(record.location, h.location) });
      });

      setIds(
        // Filter helpers that provide all required services
        // difference([1,2,3], [1,2]) => [ 3 ]
        // difference([1,2,3], [1,2,3,4]) => []
        filter(helpers.data, h => difference(required, h.provideIds).length === 0)
          .sort((a, b) => a.distance - b.distance)
          .map(h => h.id)
          .slice(0, 15),
      );
    }
  }, [setIds, helpers.loaded, services.loaded, record.demandIds, record.location]);

  return (
    <Datagrid
      {...helpers}
      ids={ids}
      currentSort={{ field: 'distance', order: 'ASC' }}
      optimized
      hasBulkActions={false}
      rowClick={null}
      selectedIds={[]}
    >
      <HelperLinkField />
      <NumberField label={`resources.helpers.fields.distance`} source="distance" sortable={false} />
      <AssignButton onClick={onSelect} />
    </Datagrid>
  );
};

export default HelperList;
