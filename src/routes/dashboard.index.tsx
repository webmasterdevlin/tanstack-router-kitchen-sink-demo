import { useMsal } from '@azure/msal-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { invoicesQueryOptions } from '../utils/queryOptions.ts';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndexComponent,
  // Use the `loader` option to ensure that the data is loaded
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(invoicesQueryOptions());
  },
});

function DashboardIndexComponent() {
  const { instance, accounts } = useMsal();
  // Read the data from the cache and subscribe to updates
  const { data: invoices } = useSuspenseQuery(invoicesQueryOptions());
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
