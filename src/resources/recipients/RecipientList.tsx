import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

const RecipientList = (props: any) => (
  <List {...props} perPage={25} sort={{ field: 'createdTime', order: 'ASC' }}>
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
