import React, { FC, useContext, useEffect, useState } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export type Auth0Context = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  loaded: boolean;
  popupOpen: boolean;
} & Pick<
  Auth0Client,
  | 'loginWithPopup'
  | 'handleRedirectCallback'
  | 'getIdTokenClaims'
  | 'loginWithRedirect'
  | 'getTokenSilently'
  | 'getTokenWithPopup'
  | 'logout'
>;

// eslint-disable-next-line
// @ts-ignore
const Context = React.createContext<Auth0Context>();
export const useAuth0 = (): Auth0Context => useContext(Context);
export const Auth0Provider: FC<Auth0ClientOptions> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        const redirectLoginResult = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(redirectLoginResult.appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loaded: !loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options?: getIdTokenClaimsOptions) => auth0Client!.getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) => auth0Client!.loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) => auth0Client!.getTokenSilently(options),
        getTokenWithPopup: (options?: GetTokenWithPopupOptions, config?: PopupConfigOptions) =>
          auth0Client!.getTokenWithPopup(options, config),
        logout: (options?: LogoutOptions) => auth0Client && auth0Client.logout(options),
      }}
    >
      {children}
    </Context.Provider>
  );
};
