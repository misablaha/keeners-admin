import React, { FC } from 'react';
// import Auth0Lock from 'auth0-lock';
import { useAuth0 } from '../auth/Auth0';

const LoginPage: FC<{ loadingElement?: React.ReactNode }> = props => {
  const auth0 = useAuth0();
  // const [lock] = React.useState(
  //   new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID!, process.env.REACT_APP_AUTH0_DOMAIN!, {
  //     language: 'cs',
  //   }),
  // );

  React.useEffect(() => {
    if (auth0.loaded) {
      // lock.show();
      auth0.loginWithRedirect();
    }
  }, [auth0.loaded]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return (
    <>
      {props.loadingElement}
    </>
  );
};

export default LoginPage;
