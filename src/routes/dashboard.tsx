import { UnauthenticatedTemplate, AuthenticatedTemplate } from '@azure/msal-react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import Login from '../Login';
import DashboardNav from '../components/DashboardNav';
import useAuth from '../hooks/useAuth';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (context.auth.status !== 'loggedIn') {
      // throw redirect({
      //   search: {
      //     redirect: location.href,
      //   },
      //   to: '/',
      // });
    }
  },
  component: () => {
    const auth = useAuth();
    if (auth.status !== 'loggedIn') {
      return <Login />;
    }
    return (
      <>
        <div className="flex items-center border-b">
          <h2 className="p-2 text-xl">Dashboard</h2>
        </div>
        <DashboardNav />
        <hr />
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Outlet />
        </AuthenticatedTemplate>
      </>
    );
  },
});
