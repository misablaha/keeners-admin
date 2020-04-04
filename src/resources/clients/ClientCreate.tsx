import React from 'react';
import { Create } from 'react-admin';
import ClientForm from './ClientForm';

const ClientCreate = (props: any) => (
  <Create {...props} component="form" action="list">
    <ClientForm />
  </Create>
);

export default ClientCreate;
