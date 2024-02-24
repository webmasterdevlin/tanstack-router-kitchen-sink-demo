import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <div>Layout (pathless)</div>
      <hr />
      <Outlet />
    </div>
  );
}
