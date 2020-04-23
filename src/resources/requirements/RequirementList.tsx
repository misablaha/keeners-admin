import moment from 'moment-timezone';
import { pick } from 'lodash';
import React from 'react';
import {
  Datagrid,
  DateField,
  DateInput,
  downloadCSV,
  Filter,
  List,
  Pagination,
  ReferenceInput,
  SelectInput,
  TextField,
} from 'react-admin';
import DemandsField from './DemandsField';
import ClientLinkField from './ClientLinkField';
import HelperLinkField from './HelperLinkField';
import SupervisorLinkField from './SupervisorLinkField';
import demandStatuses from './form/demandStatuses';
import { Requirement } from '../../types/records';
import ListActions from '../../components/ListActions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonExport = require('jsonexport/dist');

const columnToExport = [
  'createdAt',
  'address',
  'region',
  'client.firstName',
  'client.lastName',
  'client.phoneNumber',
  'demands',
  'note',
];
const exporter = (data: Requirement[]) => {
  const forExport = data
    .map((ride) => pick(ride, columnToExport))
    .map((row: Pick<Requirement, 'createdAt' | 'address' | 'region' | 'client' | 'demands' | 'note'>) => {
      return {
        ...row,
        demands: row.demands.map((d) => d.service.name).join(', '),
      };
    });

  console.log(forExport);

  const jsonConfig = {
    headers: columnToExport, // order fields in the export
    rowDelimiter: ';',
    typeHandlers: {
      Date: (value: string) => moment(value).format('YYYY-MM-DD HH:mm:SS'),
      Number: (value: number) => value.toString().replace('.', ','),
    },
  };
  jsonExport(forExport, jsonConfig, (err: any, csv: any) => {
    downloadCSV(
      '\ufeff' + csv, // prepend UTF-8 BOM
      'pozadavky-' + moment().format('YYYY-MM-DD'),
    );
  });
};

const RequirementFilter = (props: any) => (
  <Filter {...props}>
    <DateInput
      label={`resources.requirements.fields.createdAt`}
      source="createdAt||$gte"
      parse={(val?: string) => val && moment.tz(val, moment.tz.guess()).toJSON()}
      alwaysOn
    />
    <ReferenceInput
      label={`resources.requirements.fields.demands`}
      reference="services"
      source="demands.serviceId||$eq"
      alwaysOn
    >
      <SelectInput source={'name'} />
    </ReferenceInput>
    <SelectInput
      label={`resources.requirements.fields.status`}
      source={'demands.status||$eq'}
      choices={demandStatuses}
      alwaysOn
    />
    <DateInput
      label={`resources.requirements.filter.supplySince`}
      source="supplyDate||$gte"
      parse={(val?: string) => val && moment.tz(val, moment.tz.guess()).toJSON()}
      alwaysOn
    />
    <ReferenceInput
      label={`resources.requirements.fields.supervisor`}
      reference="supervisors"
      source="supervisorId||$eq"
      alwaysOn
    >
      <SelectInput source={'name'} />
    </ReferenceInput>
  </Filter>
);

const RequirementList = (props: any) => (
  <List
    {...props}
    actions={<ListActions maxResults={10000} />}
    filters={<RequirementFilter />}
    perPage={25}
    pagination={<Pagination rowsPerPageOptions={[25, 50, 100, 250]} />}
    exporter={exporter}
    sort={{ field: 'createdAt', order: 'DESC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <DateField source="createdAt" showTime />
      <ClientLinkField />
      <TextField label={`resources.clients.fields.age`} source="client.age" emptyText={' '} sortable={false} noWrap />
      <TextField
        label={`resources.clients.fields.phoneNumber`}
        source="client.phoneNumber"
        emptyText={' '}
        sortable={false}
        noWrap
      />
      <TextField label={`resources.clients.fields.region`} source="region" emptyText={' '} sortable={false} noWrap />
      <DemandsField />
      <DateField source="supplyDate" noWrap />
      <HelperLinkField />
      <SupervisorLinkField />
    </Datagrid>
  </List>
);

export default RequirementList;
