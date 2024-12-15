import { useMsal } from '@azure/msal-react';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { fetchInvoices } from '../utils/mockTodos';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndexComponent,
  /**
   * - preconnect and dns-prefetch are both about preparing the connection.
   * - prefetch and preload are about fetching resources, with preload
   prioritizing critical resources for the current
   page and prefetch targeting future needs with lower priority.

   * https://developer.mozilla.org/docs/Learn/Performance/Web_Performance_Basics
   */
  loader: () => {
    return fetchInvoices();
  },
});

function DashboardIndexComponent() {
  const invoices = Route.useLoaderData();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    instance
      ?.acquireTokenSilent({
        account: accounts[0],
        scopes: ['https://reactazureadb2cdemo.onmicrosoft.com/tests-api/tests.read'],
      })
      .then(token => {
        console.log('accessToken:', token.accessToken);
        console.log('user:', accounts[0]);
      });
  }, []);

  return (
    <div className="p-2">
      <div className="p-2">
        Welcome to the dashboard! You have <strong>{invoices.length} total invoices</strong>.
      </div>
    </div>
  );
}
