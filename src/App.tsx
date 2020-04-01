import React from 'react';
import { Admin, Resource } from 'react-admin';
import crudProvider from './NestjsCrudProvider';
import { i18nProvider } from './i18n';
import InitGoogle from './InitGoogle';
import { Layout } from './layout';
import themeReducer from './layout/themeReducer';
import fontSizeReducer from './layout/fontSizeReducer';

import helpers from './resources/helpers';
import recipients from './resources/recipients';
import requirements from './resources/requirements';
import services from './resources/services';
import supervisors from './resources/supervisors';

const dataProvider = crudProvider('/api');
const App = () => (
  <InitGoogle>
    <Admin
      dataProvider={dataProvider}
      customReducers={{
        theme: themeReducer,
        fontSize: fontSizeReducer,
      }}
      i18nProvider={i18nProvider}
      layout={Layout}
    >
      <Resource {...requirements} />
      <Resource {...helpers} />
      <Resource {...recipients} />
      <Resource {...services} />
      <Resource {...supervisors} />
    </Admin>
  </InitGoogle>
);
export default App;
