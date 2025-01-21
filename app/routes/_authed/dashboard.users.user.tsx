import { createFileRoute } from '@tanstack/react-router'
import { fetchUserByIdFn } from '@/functions/user'
import { z } from 'zod'

export const Route = createFileRoute('/_authed/dashboard/users/user')({
  component: UserComponent,
  validateSearch: z.object({
    userId: z.number(),
  }),
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loaderDeps: ({ search: { userId } }) => {
    return { userId }
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ deps: { userId } }) => {
    return fetchUserByIdFn({ data: userId })
  },
})

function UserComponent() {
  const user = Route.useLoaderData()

  return (
    <>
      <h4 className="p-2 font-bold">{user?.name}</h4>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
