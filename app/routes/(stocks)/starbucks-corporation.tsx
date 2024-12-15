import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(stocks)/starbucks-corporation')({
  component: () => {
    return <div>Hello /(stocks)/starbucks-corporation!</div>;
  },
});
