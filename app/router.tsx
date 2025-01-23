import { createRouter as createTanStackRouter, ErrorComponent } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Spinner } from './components/Spinner';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import { NotFound } from './components/NotFound';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'viewport',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
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
