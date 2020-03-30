import React from 'react';
import { Datagrid, Filter, List, SearchInput, TextField } from 'react-admin';

const HelperFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="phoneNumber" alwaysOn />
  </Filter>
);

const HelperList = (props: any) => (
  <List {...props} filters={<HelperFilter />} perPage={25} sort={{ field: 'createdTime', order: 'ASC' }}>
    <Datagrid optimized rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="phoneNumber" />
      <TextField source="address" />
    </Datagrid>
  </List>
);

export default HelperList;
