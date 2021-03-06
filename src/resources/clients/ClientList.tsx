import React from 'react';
import { Datagrid, Filter, List, Pagination, TextField, TextInput } from 'react-admin';

const ClientFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label={`resources.helpers.fields.firstName`} source={'firstName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.lastName`} source={'lastName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.phoneNumber`} source={'phoneNumber'} alwaysOn />
  </Filter>
);

const ClientList = (props: any) => (
  <List
    {...props}
    filters={<ClientFilter />}
    perPage={25}
    pagination={<Pagination rowsPerPageOptions={[25, 50, 100, 250]} />}
    sort={{ field: 'createdAt', order: 'ASC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <TextField source="firstName" emptyText={' '} />
      <TextField source="lastName" emptyText={' '} />
      <TextField source="age" emptyText={' '} />
      <TextField source="phoneNumber" emptyText={' '} />
      <TextField source="address" emptyText={' '} />
    </Datagrid>
  </List>
);

export default ClientList;
