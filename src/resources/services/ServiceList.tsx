import React from 'react';
import { Datagrid, List, BooleanField, TextField } from 'react-admin';

const ServiceList = (props: any) => (
  <List {...props} perPage={25} sort={{ field: 'name', order: 'ASC' }} bulkActionButtons={false}>
    <Datagrid optimized rowClick="edit">
      <TextField source="name" />
      <BooleanField source="isInternal" />
    </Datagrid>
  </List>
);

export default ServiceList;
