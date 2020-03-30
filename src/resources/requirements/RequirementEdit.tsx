import React from 'react';
import { Edit } from 'react-admin';
import RequirementForm from './RequirementForm';
import Typography from '@material-ui/core/Typography';

const Aside = () => (
  <div style={{ width: 500, margin: '1em' }}>
    <Typography variant={'h6'}>Historie požadavku</Typography>
  </div>
);

const SupervisorCreate = (props: any) => (
  <Edit {...props} component="form" aside={<Aside />}>
    <RequirementForm />
  </Edit>
);

export default SupervisorCreate;
