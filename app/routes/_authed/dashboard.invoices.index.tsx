import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { InvoiceFields } from '@/components/InvoiceFields'
import { Spinner } from '@/components/Spinner'
import { type Invoice } from '@/utils/mockTodos'
import { useServerFn } from '@tanstack/start'
import { postInvoiceFn } from '@/functions/todos'

export const Route = createFileRoute('/_authed/dashboard/invoices/')({
  component: InvoicesIndexComponent,
})

function InvoicesIndexComponent() {
  const router = useRouter()

  const postInvoice = useServerFn(postInvoiceFn)
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const formData = new FormData(event.target as HTMLFormElement)
    setStatus('pending')
    try {
      await postInvoice({
        data: {
          body: formData.get('body') as string,
          title: formData.get('title') as string,
        },
      })
      router.invalidate()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="p-2">
        <form onSubmit={handleOnSubmit} className="space-y-2">
          <div>Create a new Invoice:</div>
          <InvoiceFields invoice={{} as Invoice} />
          <div>
            <button
              className="rounded bg-indigo-500 p-2 font-black uppercase text-white disabled:opacity-50"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? (
                <>
                  Creating <Spinner />
                </>
              ) : (
                'Create'
              )}
            </button>
          </div>
          {status === 'success' ? (
            <div className="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Created!
            </div>
          ) : status === 'error' ? (
            <div className="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to create.
            </div>
          ) : null}
        </form>
      </div>
    </>
  )
}
