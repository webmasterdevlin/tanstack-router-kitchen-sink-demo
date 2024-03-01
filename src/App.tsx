import { MsalProvider, UnauthenticatedTemplate, AuthenticatedTemplate } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import Login from './Login';
import { Spinner } from './components/Spinner';
import useAuth from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import type { IPublicClientApplication } from '@azure/msal-browser';

export const queryClient = new QueryClient();

const router = createRouter({
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient: queryClient,
  },
  defaultErrorComponent: ({ error }) => {
    return <ErrorComponent error={error} />;
  },
  defaultPendingComponent: () => {
    return (
      <div className={'p-2 text-2xl'}>
        <Spinner />
      </div>
    );
  },
  defaultPreload: 'intent',
  routeTree, // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router; // By registering your router with the module, you can now use the exported hooks, components, and utilities with your router's exact types.
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

type Props = {
  msalInstance: IPublicClientApplication;
};

function App({ msalInstance }: Props) {
  return (
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <>
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <QueryClientProvider client={queryClient}>
              <InnerApp />
            </QueryClientProvider>
          </AuthenticatedTemplate>
        </>
      </MsalProvider>
    </StrictMode>
  );
}
export default App;
