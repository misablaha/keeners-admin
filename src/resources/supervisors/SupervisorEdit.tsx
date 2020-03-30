import React from 'react';
import { Edit } from 'react-admin';
import Card from '@material-ui/core/Card';
import SupervisorForm from './SupervisorForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component={Card}>
    <SupervisorForm />
  </Edit>
);

export default SupervisorCreate;
