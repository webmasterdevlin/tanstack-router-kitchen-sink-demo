import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';
import { auth } from './utils/auth';
import { Spinner } from './components/Spinner';
import { routeTree } from './routeTree.gen';
import { StrictMode } from 'react';

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
  },
  defaultPreload: 'intent', // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <StrictMode>
      <RouterProvider
        router={router}
        context={{
          auth,
        }}
      />
    </StrictMode>
  );
}
export default App;
