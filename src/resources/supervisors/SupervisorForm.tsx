import React from 'react';
import { required, SimpleForm, TextInput } from 'react-admin';

const SupervisorForm = (props: any) => (
  <SimpleForm {...props} redirect="list">
    <TextInput source="name" validate={required()} autoFocus />
  </SimpleForm>
);

export default SupervisorForm;
