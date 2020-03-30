import React from 'react';
import { Admin, Resource } from 'react-admin';
import crudProvider from './NestjsCrudProvider';
import { i18nProvider } from './i18n';

import helpers from './resources/helpers';
import recipients from './resources/recipients';
import services from './resources/services';
import supervisors from './resources/supervisors';
import InitGoogle from './InitGoogle';

const dataProvider = crudProvider('/api');
const App = () => (
  <InitGoogle>
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource {...helpers} />
      <Resource {...recipients} />
      <Resource {...supervisors} />
      <Resource {...services} />
    </Admin>
  </InitGoogle>
);
export default App;
