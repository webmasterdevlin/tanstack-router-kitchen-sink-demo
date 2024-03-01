import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { InvoiceFields } from '../components/InvoiceFields';
import useUpdateInvoice from '../hooks/useUpdateInvoice';
import { fetchInvoiceById } from '../utils/mockTodos';

export const Route = createFileRoute('/dashboard/invoices/$invoiceId')({
  component: InvoiceComponent,
  loader: ({ params: { invoiceId } }) => {
    return fetchInvoiceById(Number(invoiceId));
  },
  parseParams: params => {
    return {
      invoiceId: z.number().int().parse(Number(params.invoiceId)),
    };
  },
  stringifyParams: ({ invoiceId }) => {
    return { invoiceId: `${invoiceId}` };
  },
  validateSearch: search => {
    return z
      .object({
        notes: z.string().optional(),
        showNotes: z.boolean().optional(),
      })
      .parse(search);
  },
});

function InvoiceComponent() {
  const search = Route.useSearch();
  const invoice = Route.useLoaderData();

  const navigate = useNavigate({ from: Route.fullPath });

  const { mutateAsync: updateInvoiceMutation, status, variables, submittedAt } = useUpdateInvoice();

  const [notes, setNotes] = useState(search.notes ?? '');

  useEffect(() => {
    navigate({
      params: true,
      replace: true,
      search: old => {
        return {
          ...old,
          notes: notes ? notes : undefined,
        };
      },
    });
  }, [notes]);

  return (
    <form
      key={invoice.id}
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        updateInvoiceMutation({
          body: formData.get('body') as string,
          id: invoice.id,
          title: formData.get('title') as string,
        });
      }}
      className="space-y-2 p-2"
    >
      <InvoiceFields invoice={invoice} disabled={status === 'pending'} />
      <div>
        <Link
          from={Route.fullPath}
          search={old => {
            return {
              ...old,
              showNotes: old?.showNotes ? undefined : true,
            };
          }}
          className="text-indigo-700"
          params={true}
        >
          {search.showNotes ? 'Close Notes' : 'Show Notes'}{' '}
        </Link>
        {search.showNotes ? (
          <>
            <div>
              <div className="h-2" />
              <textarea
                value={notes}
                onChange={e => {
                  setNotes(e.target.value);
                }}
                rows={5}
                className="w-full rounded p-2 shadow"
                placeholder="Write some notes here..."
              />
              <div className="text-xs italic">Notes are stored in the URL. Try copying the URL into a new tab!</div>
            </div>
          </>
        ) : null}
      </div>
      <div>
        <button
          className="rounded bg-indigo-500 p-2 font-black uppercase text-white disabled:opacity-50"
          disabled={status === 'pending'}
        >
          Save
        </button>
      </div>
      {variables?.id === invoice.id ? (
        <div key={submittedAt}>
          {status === 'success' ? (
            <div className="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Saved!
            </div>
          ) : status === 'error' ? (
            <div className="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to save.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
