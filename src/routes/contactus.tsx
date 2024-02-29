import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contactus')({
  component: () => {
    return <div>Hello /contactus!</div>;
  },
});
