import { keyBy } from 'lodash';
import React, { FC } from 'react';
import { useGetList, useTranslate } from 'ra-core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Demand, DemandStatus, Service } from '../../../types/records';

type ServiceState = {
  demandId?: string;
  serviceId: string;
  status: DemandStatus;
};

interface ServiceStateMap {
  [id: string]: ServiceState;
}

type DemandTmp = Partial<Demand> & Pick<Demand, 'serviceId' | 'status'>;

const DemandList: FC<{ demands: DemandTmp[]; onChange: (demands: DemandTmp[]) => void }> = ({ demands, onChange }) => {
  const translate = useTranslate();
  const [services, setServices] = React.useState<ServiceStateMap>({});
  const { data = {}, ids = [], loading } = useGetList<Service>(
    'services',
    { perPage: 5000, page: 1 },
    { field: 'name', order: 'ASC' },
    {},
  );

  React.useEffect(() => {
    setServices(
      keyBy(
        demands.map<ServiceState>((d) => ({
          demandId: d.id,
          serviceId: d.serviceId,
          status: d.status,
        })),
        'serviceId',
      ),
    );
  }, [setServices, loading, demands]);

  const handleServiceToggle = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const serviceId = ev.target.name;
      if (checked) {
        onChange([...demands, { serviceId, service: data[serviceId], status: DemandStatus.NEW }]);
      } else {
        onChange(demands.filter((d) => d.serviceId !== serviceId));
      }
    },
    [services, onChange],
  );

  return (
    <FormControl margin={'dense'} fullWidth>
      <Typography variant={'caption'} color={'textSecondary'} gutterBottom>
        {translate('resources.requirements.fields.demands')}
      </Typography>
      <Table size={'medium'}>
        <TableBody>
          {ids.map((id) => (
            <TableRow key={id}>
              <TableCell padding={'checkbox'}>
                <Checkbox
                  checked={!!services[id]}
                  // Do not allow remove stored demand
                  disabled={!!(services[id] && services[id].demandId)}
                  name={id as string}
                  onChange={handleServiceToggle}
                />
              </TableCell>
              <TableCell padding={'none'}>
                {services[id] ? (
                  <Chip color={'secondary'} label={data[id].name} />
                ) : (
                  <Chip disabled label={data[id].name} />
                )}
              </TableCell>
              <TableCell align={'right'}>{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormControl>
  );
};

DemandList.defaultProps = {
  demands: [],
};

export default DemandList;
