import React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import Themeable from './Themeable';

export default (props: any) => (
  <Themeable>
    <Layout {...props} appBar={AppBar} />
  </Themeable>
);
