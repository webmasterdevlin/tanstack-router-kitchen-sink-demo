import './index.css';

import { PublicClientApplication } from '@azure/msal-browser';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { msalConfig } from './auth/config';
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';
import { Spinner } from './components/Spinner';
import useAuth from './hooks/useAuth';
import { routeTree } from './routeTree.gen';


const queryClient = new QueryClient();

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
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  routeTree, // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router; // merge your router's exact types with exported hooks, components, and utilities.
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </MsalProvider>
  );
}

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
