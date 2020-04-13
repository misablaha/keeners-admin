import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory } from 'history';
import NestJSCrudProvider, { fetchJsonSigned } from './NestJSCrudProvider';
import { i18nProvider } from './i18n';
import InitGoogle from './InitGoogle';
import { Auth0Provider, useAuth0 } from './auth/Auth0';
import { Layout } from './layout';
import themeReducer from './layout/themeReducer';
import fontSizeReducer from './layout/fontSizeReducer';

import helpers from './resources/helpers';
import clients from './resources/clients';
import requirements from './resources/requirements';
import services from './resources/services';
import supervisors from './resources/supervisors';
import Auth0AppProvider from './auth/Auth0AppProvider';
import LoginPage from './layout/LoginPage';

const history = createBrowserHistory();

const onRedirectCallback = (appState: any) =>
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);

const App = () => {
  const auth0 = useAuth0();
  const [dataProvider, setDataProvider] = React.useState(new NestJSCrudProvider('/api'));
  const [authProvider] = React.useState(new Auth0AppProvider(auth0));

  React.useEffect(() => {
    if (auth0.isAuthenticated) {
      setDataProvider(new NestJSCrudProvider('/api', fetchJsonSigned(auth0.getTokenSilently)));
    }
  }, [auth0.isAuthenticated, setDataProvider]);

  React.useEffect(() => {
    authProvider.context = auth0;
  }, [authProvider, auth0]);

  return auth0.loaded ? (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
      history={history}
      customReducers={{
        theme: themeReducer,
        fontSize: fontSizeReducer,
      }}
      i18nProvider={i18nProvider}
      layout={Layout}
    >
      <Resource {...requirements} />
      <Resource {...helpers} />
      <Resource {...clients} />
      <Resource {...services} />
      <Resource {...supervisors} />
    </Admin>
  ) : null;
};

export default () => (
  <InitGoogle>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </InitGoogle>
);
