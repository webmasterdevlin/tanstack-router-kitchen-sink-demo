import { createLazyFileRoute } from '@tanstack/react-router';
import Expensive from './-components/Expensive';

export const Route = createLazyFileRoute('/expensive/')({
  component: Expensive,
  errorComponent: () => {
    return <div>Failed to load</div>;
  },
  pendingComponent: () => {
    return <div>Loading...</div>;
  },
});
