import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(stocks)/nike-inc')({
  component: () => {
    return <div>Hello /(stocks)/nike-inc!</div>;
  },
});
