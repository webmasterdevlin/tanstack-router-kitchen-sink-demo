import { SignIn } from '@clerk/tanstack-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in/$')({
  component: () => {
    return <div
      className='flex items-center justify-center p-12'
    >
      <SignIn />
    </div>
  }
});