import React from 'react';
import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin';

const RecipientFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label={`resources.helpers.fields.firstName`} source={'firstName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.lastName`} source={'lastName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.phoneNumber`} source={'phoneNumber'} alwaysOn />
  </Filter>
);

const RecipientList = (props: any) => (
  <List
    {...props}
    filters={<RecipientFilter />}
    perPage={25}
    sort={{ field: 'createdTime', order: 'ASC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="age" />
      <TextField source="phoneNumber" />
      <TextField source="address" />
    </Datagrid>
  </List>
);

export default RecipientList;
