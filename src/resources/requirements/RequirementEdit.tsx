import React from 'react';
import { Edit } from 'react-admin';
import RequirementForm from './form/RequirementForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="form">
    <RequirementForm />
  </Edit>
);

export default SupervisorCreate;
