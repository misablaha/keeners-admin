import React from 'react';
import { Create } from 'react-admin';
import RequirementForm from './form/RequirementForm';

const RequirementCreate = (props: any) => (
  <Create {...props} component="form" action="list">
    <RequirementForm />
  </Create>
);

export default RequirementCreate;
