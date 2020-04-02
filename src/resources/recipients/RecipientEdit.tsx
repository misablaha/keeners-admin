import React from 'react';
import { Edit } from 'react-admin';
import RecipientForm from './RecipientForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="form">
    <RecipientForm />
  </Edit>
);

export default SupervisorCreate;
