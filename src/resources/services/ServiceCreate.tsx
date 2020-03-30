import React from 'react';
import { Create } from 'react-admin';
import Card from '@material-ui/core/Card';
import ServiceForm from './ServiceForm';

const ServiceCreate = (props: any) => (
  <Create {...props} component={Card} action="list">
    <ServiceForm />
  </Create>
);

export default ServiceCreate;
