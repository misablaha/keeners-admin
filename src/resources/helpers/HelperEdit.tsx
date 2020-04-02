import React from 'react';
import { Edit } from 'react-admin';
import HelperForm from './HelperForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="form">
    <HelperForm />
  </Edit>
);

export default SupervisorCreate;
