import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import DashboardNav from '../components/DashboardNav';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status !== 'loggedIn') {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/',
      });
    }
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="p-2 text-xl">Dashboard</h2>
      </div>
      <DashboardNav />
      <hr />
      <Outlet />
    </>
  );
}
