import { createFileRoute } from '@tanstack/react-router';

/**
 * Pathless Route Group Directories use `()` as a way to group routes files together regardless of their path. They are purely organizational and do not affect the route tree or component tree in any way.
 */
export const Route = createFileRoute('/(stocks)/apple-inc')({
  component: () => {
    return <div>Hello /(stocks)/apple-inc!</div>;
  },
});
