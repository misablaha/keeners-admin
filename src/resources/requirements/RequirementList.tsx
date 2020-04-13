import React from 'react';
import { Datagrid, DateField, DateInput, Filter, List, ReferenceInput, SelectInput, TextField } from 'react-admin';
import DemandsField from './DemandsField';
import ClientLinkField from './ClientLinkField';
import HelperLinkField from './HelperLinkField';
import SupervisorLinkField from './SupervisorLinkField';
import demandStatuses from './form/demandStatuses';

const RequirementFilter = (props: any) => (
  <Filter {...props}>
    <DateInput label={`resources.requirements.fields.createdAt`} source="createdAt||$gte" alwaysOn />
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
    filters={<RequirementFilter />}
    perPage={25}
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
