import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

/**
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  authorities: {
    signUpSignIn: {
      authority: 'https://reactazureadb2cdemo.b2clogin.com/reactazureadb2cdemo.onmicrosoft.com/B2C_1_DEV',
    },
  },
  authorityDomain: 'reactazureadb2cdemo.b2clogin.com',
  names: {
    signUpSignIn: 'B2C_1_DEV',
    // forgotPassword: "<Forgot Password Name - in the form of B2C_1_xxx>",
    // editProfile: "<Edit Profile Name - in the form of B2C_1_xxx>",
  },
};

/**
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    clientId: '9dfb60be-c3ac-47cd-81e8-1587b9ccb8db',
    knownAuthorities: [b2cPolicies.authorityDomain],
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: '/',
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['openid', 'https://reactazureadb2cdemo.onmicrosoft.com/tests-api/tests.read'],
};
export const msalInstance = new PublicClientApplication(msalConfig);
