import React from 'react';
import { Edit } from 'react-admin';
import SupervisorForm from './SupervisorForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component={'form'}>
    <SupervisorForm />
  </Edit>
);

export default SupervisorCreate;
