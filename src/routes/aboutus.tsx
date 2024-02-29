import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/aboutus')({
  component: () => {
    return <div>Hello /aboutus!</div>;
  },
});
