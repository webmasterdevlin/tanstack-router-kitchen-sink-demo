import { MsalProvider, UnauthenticatedTemplate, AuthenticatedTemplate } from '@azure/msal-react';
import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import Login from './Login';
import { Spinner } from './components/Spinner';
import { routeTree } from './routeTree.gen';
import { auth } from './utils/auth';

const router = createRouter({
  context: {
    auth: undefined!, // We'll inject this when we render
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
    router: typeof router;
  }
}

function App({ msalInstance }: any) {
  return (
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <>
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <RouterProvider
              router={router}
              context={{
                auth,
              }}
            />
          </AuthenticatedTemplate>
        </>
      </MsalProvider>
    </StrictMode>
  );
}
export default App;
