import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about-us')({
  component: () => {
    return <div>Hello /about-us!</div>;
  },
});
