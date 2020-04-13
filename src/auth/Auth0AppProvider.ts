import { AuthProvider } from 'ra-core';
import { Auth0Context } from './Auth0';

class Auth0AppProvider implements AuthProvider {
  constructor(context: Auth0Context) {
    this._context = context;
  }

  private _context: Auth0Context;

  set context(context: Auth0Context) {
    this._context = context;
  }

  login = () => this._context.loginWithRedirect();

  checkAuth = () => (this._context.isAuthenticated ? Promise.resolve() : Promise.reject());

  checkError = () => Promise.resolve();

  getPermissions = () => Promise.resolve();

  logout = () => Promise.resolve(this._context.isAuthenticated ? this._context.logout() : void 0);
}

export default Auth0AppProvider;
