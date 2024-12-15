import { createLazyFileRoute } from '@tanstack/react-router';
import Expensive from './-components/Expensive';

/**
 * The `createLazyFileRoute` function is used for creating a partial file-based route route instance that is lazily loaded when matched. This route instance can only be used to configure the non-critical properties of the route, such as `component`, `pendingComponent`, `errorComponent`, and the `notFoundComponent`.
 */
export const Route = createLazyFileRoute('/expensive/')({
  component: Expensive,
  errorComponent: () => {
    return <div>Failed to load</div>;
  },
  pendingComponent: () => {
    return <div>Loading...</div>;
  },
});
