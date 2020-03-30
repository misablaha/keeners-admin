import React from 'react';
import { Create } from 'react-admin';
import RecipientForm from './RecipientForm';

const RecipientCreate = (props: any) => (
  <Create {...props} component="div" action="list">
    <RecipientForm />
  </Create>
);

export default RecipientCreate;
