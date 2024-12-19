import { Await, createFileRoute, defer, useAwaited } from '@tanstack/react-router';
import axios from 'axios';

/**
 * The `defer` function wraps a promise with a deferred state object that can be used to inspect the promise's state. This deferred promise can then be passed to the `useAwaited` hook or the `<Await>` component for suspending until the promise is resolved or rejected.
 */
export const Route = createFileRoute('/deferred-data')({
  component: DeferComponent,
  loader: async () => {
    // comments and photos are deferred because they are not needed immediately
    const deferredComments = defer(axios.get('https://jsonplaceholder.typicode.com/comments'));
    const deferredPhotos = defer(axios.get('https://jsonplaceholder.typicode.com/photos'));

    const users = await axios.get('https://jsonplaceholder.typicode.com/users');

    return { deferredComments, deferredPhotos, users };
  },
});


function DeferComponent() {
  const { deferredComments, deferredPhotos, users } = Route.useLoaderData();

  // useAwaited and Await are used to handle the deferred promises but returns different data types
  const resultsPhotos = useAwaited({ promise: deferredPhotos });

  return (
    <div className="container p-4">
      <h1>Defer Page</h1>
      <p>Users: {JSON.stringify(users?.data).length}</p>

      <p>Photos (deferred): {JSON.stringify(resultsPhotos[0].data.length)}</p>

      <Await promise={deferredComments}>
        {resultsComments => {
          return <p>Comments (deferred): {JSON.stringify(resultsComments.data.length)}</p>;
        }}
      </Await>
    </div>
  );
}
