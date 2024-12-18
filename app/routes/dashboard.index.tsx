import { createFileRoute } from '@tanstack/react-router';
import { fetchInvoicesFn } from '@/functions/todos';

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
    return fetchInvoicesFn();
  },
});

function DashboardIndexComponent() {
  const invoices = Route.useLoaderData();

  return (
    <div className="p-2">
      <div className="p-2">
        Welcome to the dashboard! You have <strong>{invoices.length} total invoices</strong>.
      </div>
    </div>
  );
}
