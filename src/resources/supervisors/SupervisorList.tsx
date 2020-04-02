import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

const SupervisorList = (props: any) => (
  <List {...props} perPage={25} sort={{ field: 'name', order: 'ASC' }} bulkActionButtons={false}>
    <Datagrid optimized rowClick="edit">
      <TextField source="name" />
    </Datagrid>
  </List>
);

export default SupervisorList;
