import { createFileRoute, Link, MatchRoute, Outlet } from '@tanstack/react-router';
import { Spinner } from '@/components/Spinner';
import { fetchInvoicesFn } from '@/functions/todos';

export const Route = createFileRoute('/dashboard/invoices')({
  component: InvoicesComponent,
  preload: true,
  preloadStaleTime: 1000 * 60 * 1,
  pendingMs: 0,
  pendingMinMs: 0,
  loader: async () => {
    return await fetchInvoicesFn();
  },
});

function InvoicesComponent() {
  const invoices = Route.useLoaderData();

  return (
    <div className="flex flex-1">
      <div className="w-48 divide-y">
        {invoices?.map(invoice => {
          return (
            <div key={invoice.id}>
              <Link
                to="/dashboard/invoices/$invoiceId"
                params={{
                  invoiceId: invoice.id,
                }}
                preload="intent"
                className="block px-3 py-2 text-indigo-700"
                activeProps={{ className: 'font-bold' }}
              >
                <pre className="text-sm">
                  #{invoice.id} - {invoice.title.slice(0, 10)}{' '}
                  <MatchRoute
                    to="/dashboard/invoices/$invoiceId"
                    params={{
                      invoiceId: invoice.id,
                    }}
                    pending
                  >
                    {match => {
                      return <Spinner show={!!match} wait="delay-50" />;
                    }}
                  </MatchRoute>
                </pre>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex-1 border-l border-gray-200">
        <Outlet />
      </div>
    </div>
  );
}
