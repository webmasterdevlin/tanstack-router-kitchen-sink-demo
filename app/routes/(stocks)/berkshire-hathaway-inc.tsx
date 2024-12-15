import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(stocks)/berkshire-hathaway-inc')({
  component: () => {
    return <div>Hello /(stocks)/berkshire-hathaway-inc!</div>;
  },
});
