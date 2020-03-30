import React from 'react';
import { Create } from 'react-admin';
import Card from '@material-ui/core/Card';
import SupervisorForm from './SupervisorForm';

const SupervisorCreate = (props: any) => (
  <Create {...props} component={Card} action="list">
    <SupervisorForm />
  </Create>
);

export default SupervisorCreate;
