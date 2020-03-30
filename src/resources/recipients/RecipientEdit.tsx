import React from 'react';
import { Edit } from 'react-admin';
import RecipientForm from './RecipientForm';
import Typography from '@material-ui/core/Typography';

const Aside = () => (
  <div style={{ width: 500, margin: '1em' }}>
    <Typography variant={'h6'}>Seznam požadavků</Typography>
  </div>
);

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="div" aside={<Aside />}>
    <RecipientForm />
  </Edit>
);

export default SupervisorCreate;
