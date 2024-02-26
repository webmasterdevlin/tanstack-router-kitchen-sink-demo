import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { username } = Route.useRouteContext();

  return (
    <div className="space-y-2 p-2">
      <div>
        Username:<strong>{username}</strong>
      </div>
    </div>
  );
}
