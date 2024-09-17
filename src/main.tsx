import './index.css';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { msalConfig } from './auth/config';
import { Spinner } from './components/Spinner';
import useAuth from './hooks/useAuth';
import { routeTree } from './routeTree.gen';

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
  defaultPreload: 'intent', // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
  routeTree,
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
      <InnerApp />
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
