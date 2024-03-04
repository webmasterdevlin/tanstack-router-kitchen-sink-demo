import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(stocks)/apple-inc')({
  component: () => {
    return <div>Hello /(stocks)/apple-inc!</div>;
  },
});
