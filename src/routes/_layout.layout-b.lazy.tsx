import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/layout-b')({
  component: LayoutBComponent,
});

function LayoutBComponent() {
  return <div>I'm B but lazy!</div>;
}
