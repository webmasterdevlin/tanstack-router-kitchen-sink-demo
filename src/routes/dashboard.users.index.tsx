import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/')({
  beforeLoad: () => {
    // Pass the devlin function to the route context. It creates or replaces a function.
    return {
      devlin: () => {
        return console.log('devlin');
      },
    };
  },
  component: UsersIndexComponent,
  loader: ({ context }) => {
    context.devlin();
  },
});

function UsersIndexComponent() {
  return (
    <div className="space-y-2 p-2">
      <p>
        Normally, setting default search parameters would either need to be done manually in every link to a page, or as
        a side-effect (not a great experience).
      </p>
      <p>
        Instead, we can use <strong>search filters</strong> to provide defaults or even persist search params for links
        to routes (and child routes).
      </p>
      <p>
        A good example of this is the sorting and filtering of the users list. In a traditional router, both would be
        lost while navigating around individual users or even changing each sort/filter option unless each state was
        manually passed from the current route into each new link we created (that is a lot of tedious and error-prone
        work). With TanStack router and search filters, they are persisted with little effort.
      </p>
    </div>
  );
}
