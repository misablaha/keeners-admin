import React, { FC } from 'react';
import { useLogin } from 'ra-core';
import Auth0Lock from 'auth0-lock';

const LoginPage: FC = () => {
  const login = useLogin();
  const [lock] = React.useState(
    new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID!, process.env.REACT_APP_AUTH0_DOMAIN!, {
      language: 'cs',
    }),
  );

  // lock.show();
  login({});
  return null;
};

export default LoginPage;
