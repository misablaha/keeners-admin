import React from 'react';
import { Datagrid, List, Pagination, TextField } from 'react-admin';

const SupervisorList = (props: any) => (
  <List
    {...props}
    perPage={25}
    pagination={<Pagination rowsPerPageOptions={[25, 50, 100, 250]} />}
    sort={{ field: 'name', order: 'ASC' }}
    bulkActionButtons={false}
  >
    <Datagrid optimized rowClick="edit">
      <TextField source="name" />
    </Datagrid>
  </List>
);

export default SupervisorList;
