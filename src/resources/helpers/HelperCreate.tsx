import React from 'react';
import { Create } from 'react-admin';
import HelperForm from './HelperForm';

const HelperCreate = (props: any) => (
  <Create {...props} component="form" action="list">
    <HelperForm />
  </Create>
);

export default HelperCreate;
