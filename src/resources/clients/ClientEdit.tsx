import React from 'react';
import { Edit } from 'react-admin';
import ClientForm from './ClientForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="form">
    <ClientForm />
  </Edit>
);

export default SupervisorCreate;
