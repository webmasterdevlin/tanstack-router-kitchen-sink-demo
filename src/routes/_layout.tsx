import { Outlet, createFileRoute } from '@tanstack/react-router';

/**
 * `Pathless Routes` are prefixed with an underscore (`_`) are considered "pathless". and are used to wrap child routes with additional components and logic, without requiring a matching `path` in the URL
 */
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
