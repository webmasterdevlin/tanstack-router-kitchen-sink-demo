// app/router.tsx
import './index.css';

import { createRouter as createTanStackRouter, ErrorComponent } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Spinner } from './components/Spinner';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
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
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
