import React from 'react';
import { Edit } from 'react-admin';
import Card from '@material-ui/core/Card';
import ServiceForm from './ServiceForm';

const SupervisorCreate = (props: any) => (
  <Edit {...props} component={Card}>
    <ServiceForm />
  </Edit>
);

export default SupervisorCreate;
