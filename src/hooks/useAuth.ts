import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { loginRequest } from '../auth/config';
import type { Auth } from '../utils/auth';
export default function useAuth(): Auth {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    instance
      ?.acquireTokenSilent({
        account: accounts[0],
        scopes: ['https://reactazureadb2cdemo.onmicrosoft.com/tests-api/tests.read'],
      })
      .then(token => {
        console.log('accessToken:', token.accessToken);
        console.log('user:', accounts[0]);
      });
  }, []);

  return {
    login: () => {
      instance?.loginRedirect(loginRequest);
    },
    logout: () => {
      instance?.logout({ postLogoutRedirectUri: '/' });
    },
    status: accounts.length === 0 ? 'loggedOut' : 'loggedIn',
    username: accounts[0]?.username,
  };
}
