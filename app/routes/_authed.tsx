import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/tanstack-start'
import { authStateFn } from '@/functions/auth'

export const Route = createFileRoute('/_authed')({
    beforeLoad: async () => {
        const { userId } = await authStateFn()

        return {
            userId,
        }
    },
    errorComponent: ({ error }) => {
        if (error.message === 'Not authenticated') {
            return (
                <div className="flex items-center justify-center p-12">
                    <SignIn routing="hash" forceRedirectUrl={window.location.href} />
                </div>
            )
        }

        throw error
    },
})
