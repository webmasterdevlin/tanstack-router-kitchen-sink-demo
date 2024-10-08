import { createFileRoute, Link } from '@tanstack/react-router';

/**
 * The `createFileRoute` function is a factory that can be used to create a file-based route instance. This route instance can then be used to automatically generate a route tree with the `tsr generate` and `tsr watch` commands.
 */
export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className={'p-2'}>
      <div className={'text-lg'}>Welcome Home!</div>
      <hr className={'my-2'} />
      <Link
        to="/dashboard/invoices"
        params={{
          invoiceId: 3,
        }}
        className={'rounded-full bg-indigo-500 px-2 py-1 text-xs text-white'}
      >
        1 New Invoice
      </Link>
      <hr className={'my-2'} />
      <div className={'max-w-xl'}>
        As you navigate around take note of the UX. It should feel suspense-like, where routes are only rendered once
        all of their data and elements are ready.
        <hr className={'my-2'} />
        To exaggerate async effects, play with the artificial request delay slider in the bottom-left corner.
        <hr className={'my-2'} />
        The last 2 sliders determine if link-hover preloading is enabled (and how long those preloads stick around) and
        also whether to cache rendered route data (and for how long). Both of these default to 0 (or off).
      </div>
    </div>
  );
}
