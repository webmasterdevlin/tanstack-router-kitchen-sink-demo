import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import MainNav from '../components/MainNav';
import { Spinner } from '../components/Spinner';
import type { Auth } from '../utils/auth';
import type { QueryClient } from '@tanstack/react-query';

/* Show a global spinner when the router is transitioning */
function RouterSpinner() {
  const isLoading = useRouterState({
    select: s => {
      return s.status === 'pending';
    },
  });
  return <Spinner show={isLoading} />;
}

export const Route = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className={'flex min-h-screen flex-col'}>
        <div className={'flex items-center gap-2 border-b'}>
          <h1 className={'p-2 text-3xl'}>Kitchen Sink 🍴</h1>
          <div className={'text-3xl'}>
            <RouterSpinner />
          </div>
        </div>
        <div className={'flex flex-1'}>
          <MainNav />
          <div className={'flex-1 border-l border-gray-200'}>
            {/* Render our first route match */}
            <Outlet />
          </div>
        </div>
      </div>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
