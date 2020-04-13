import React from 'react';
import { Datagrid, List, BooleanField, TextField, Pagination } from 'react-admin';

const ServiceList = (props: any) => (
  <List
    {...props}
    perPage={25}
    pagination={<Pagination rowsPerPageOptions={[25, 50, 100, 250]} />}
    sort={{ field: 'name', order: 'ASC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <TextField source="name" emptyText={' '} />
      <BooleanField source="isInternal" />
    </Datagrid>
  </List>
);

export default ServiceList;
