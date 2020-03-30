import React from 'react';
import { BooleanField, BooleanInput, Datagrid, Filter, List, TextField, TextInput } from 'react-admin';
import { CondOperator } from '@nestjsx/crud-request';

const HelperFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label={`resources.helpers.fields.firstName`} source={'firstName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.lastName`} source={'lastName'} alwaysOn />
    <TextInput label={`resources.helpers.fields.phoneNumber`} source={'phoneNumber'} alwaysOn />
    <BooleanInput label={`resources.helpers.fields.isActive`} source={`isActive||${CondOperator.EQUALS}`} />
  </Filter>
);

const HelperList = (props: any) => (
  <List {...props} filters={<HelperFilter />} perPage={25} sort={{ field: 'createdTime', order: 'ASC' }}>
    <Datagrid optimized rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="phoneNumber" />
      <TextField source="email" />
      <TextField source="address" />
      <BooleanField source="isActive" />
    </Datagrid>
  </List>
);

export default HelperList;
