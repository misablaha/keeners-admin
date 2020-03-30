import React from 'react';
import { BooleanInput, required, SimpleForm, TextInput } from 'react-admin';

const ServiceForm = (props: any) => (
  <SimpleForm {...props} redirect="list">
    <TextInput source="name" validate={required()} autoFocus />
    <TextInput source="note" multiline />
    <BooleanInput source="isInternal" />
  </SimpleForm>
);

export default ServiceForm;
