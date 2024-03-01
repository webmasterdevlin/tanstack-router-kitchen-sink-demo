import { createFileRoute } from '@tanstack/react-router';
import { InvoiceFields } from '../components/InvoiceFields';
import { Spinner } from '../components/Spinner';
import useCreateInvoice from '../hooks/useCreateInvoice';
import type { Invoice } from '../utils/mockTodos';

export const Route = createFileRoute('/dashboard/invoices/')({
  component: InvoicesIndexComponent,
});

function InvoicesIndexComponent() {
  const { mutateAsync: createInvoiceMutation, status } = useCreateInvoice();

  return (
    <>
      <div className="p-2">
        <form
          onSubmit={event => {
            event.preventDefault();
            event.stopPropagation();
            const formData = new FormData(event.target as HTMLFormElement);
            createInvoiceMutation({
              body: formData.get('body') as string,
              title: formData.get('title') as string,
            });
          }}
          className="space-y-2"
        >
          <div>Create a new Invoice:</div>
          <InvoiceFields invoice={{} as Invoice} />
          <div>
            <button
              className="rounded bg-indigo-500 p-2 font-black uppercase text-white disabled:opacity-50"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? (
                <>
                  Creating <Spinner />
                </>
              ) : (
                'Create'
              )}
            </button>
          </div>
          {status === 'success' ? (
            <div className="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Created!
            </div>
          ) : status === 'error' ? (
            <div className="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to create.
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}
