import { keyBy } from 'lodash';
import React, { FC } from 'react';
import { useGetList, useTranslate } from 'ra-core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Demand, DemandStatus, Service } from '../../../types/records';
import demandStatuses from './demandStatuses';
import DemandChip from '../DemandChip';

type ServiceState = {
  demandId?: string;
  serviceId: string;
  service: Service;
  status: DemandStatus;
};

interface ServiceStateMap {
  [id: string]: ServiceState;
}

type DemandTmp = Partial<Demand> & Pick<Demand, 'serviceId' | 'status'>;

const DemandList: FC<{ demands: DemandTmp[]; onChange: (demands: DemandTmp[]) => void }> = ({ demands, onChange }) => {
  const translate = useTranslate();
  const [services, setServices] = React.useState<ServiceStateMap>({});
  const { data = {}, ids = [], loaded } = useGetList<Service>(
    'services',
    { perPage: 5000, page: 1 },
    { field: 'name', order: 'ASC' },
    {},
  );

  React.useEffect(() => {
    setServices(
      loaded
        ? keyBy(
            demands.map<ServiceState>((d) => ({
              demandId: d.id,
              serviceId: d.serviceId,
              service: data[d.serviceId],
              status: d.status,
            })),
            'serviceId',
          )
        : {},
    );
  }, [setServices, loaded, demands]);

  const handleServiceToggle = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const serviceId = ev.target.name;
      if (checked) {
        onChange([...demands, { serviceId, service: data[serviceId], status: DemandStatus.NEW }]);
      } else {
        onChange(demands.filter((d) => d.serviceId !== serviceId));
      }
    },
    [services, demands, onChange],
  );

  const handleStatusChange = React.useCallback(
    (serviceId: React.ReactText) => (ev: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      onChange(demands.map((d) => (d.serviceId === serviceId ? { ...d, status: ev.target.value as DemandStatus } : d)));
    },
    [demands, onChange],
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
                {services[id] ? <DemandChip record={services[id]} /> : <Chip disabled label={data[id].name} />}
              </TableCell>
              <TableCell padding={'checkbox'} align={'right'}>
                {services[id] && (
                  <Select
                    value={services[id].status}
                    onChange={handleStatusChange(id)}
                    input={<Input disableUnderline margin={'none'} />}
                  >
                    {demandStatuses.map((ds) => (
                      <MenuItem key={ds.id} value={ds.id}>
                        {translate(ds.name)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </TableCell>
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
