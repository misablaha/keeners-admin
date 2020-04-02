import React from 'react';
import { Create } from 'react-admin';
import SupervisorForm from './SupervisorForm';

const SupervisorCreate = (props: any) => (
  <Create {...props} component={'form'} action="list">
    <SupervisorForm />
  </Create>
);

export default SupervisorCreate;
