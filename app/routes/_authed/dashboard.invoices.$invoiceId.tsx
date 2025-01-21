import { useState, useEffect } from 'react'
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { InvoiceFields } from '@/components/InvoiceFields'
import { fetchInvoiceByIdFn, patchInvoiceFn } from '@/functions/invoice'
import { useServerFn } from '@tanstack/start'
import { z } from 'zod'
import { NotFound } from '@/components/NotFound'

/**
 * `Flat Routes` gives you the ability to use `.`s to denote route nesting levels.
 */
export const Route = createFileRoute('/_authed/dashboard/invoices/$invoiceId')({
  component: InvoiceComponent,
  notFoundComponent: () => {
    return <NotFound>Invoice not found</NotFound>
  },
  params: {
    parse: (params) => {
      return {
        invoiceId: z.number().int().parse(Number(params.invoiceId)),
      }
    },
    stringify: ({ invoiceId }) => {
      return { invoiceId: `${invoiceId}` }
    },
  },
  validateSearch: (search) => {
    return z
      .object({
        notes: z.string().optional(),
        showNotes: z.boolean().optional(),
      })
      .parse(search)
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ params: { invoiceId } }) => {
    console.log('Loading invoice', invoiceId)
    return fetchInvoiceByIdFn({ data: invoiceId })
  },
})

function InvoiceComponent() {
  const search = Route.useSearch()
  const invoice = Route.useLoaderData()
  const router = useRouter()
  const navigate = useNavigate({ from: Route.fullPath })

  const patchInvoice = useServerFn(patchInvoiceFn)

  const [submittedAt, setSubmittedAt] = useState<number | undefined>()
  const [variables, setVariables] = useState<any | undefined>()
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const formData = new FormData(event.target as HTMLFormElement)
    setStatus('pending')
    setSubmittedAt(Date.now())
    const payload = {
      body: formData.get('body') as string,
      id: invoice.id,
      title: formData.get('title') as string,
    }
    setVariables(payload)
    try {
      await patchInvoice({
        data: payload,
      })
      setStatus('success')
      router.invalidate()
    } catch (err: any) {
      setStatus('error')
    }
  }

  const [notes, setNotes] = useState(search.notes ?? '')

  useEffect(() => {
    navigate({
      params: true,
      replace: true,
      search: (old) => {
        return {
          ...old,
          notes: notes ? notes : undefined,
        }
      },
    })
  }, [notes])

  return (
    <form key={invoice.id} onSubmit={handleOnSubmit} className="space-y-2 p-2">
      <InvoiceFields invoice={invoice} disabled={status === 'pending'} />
      <div>
        <Link
          from={Route.fullPath}
          search={(old) => {
            return {
              ...old,
              showNotes: old?.showNotes ? undefined : true,
            }
          }}
          className="text-indigo-700"
          params={true}
        >
          {search.showNotes ? 'Close Notes' : 'Show Notes'}{' '}
        </Link>
        {search.showNotes ? (
          <>
            <div>
              <div className="h-2" />
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value)
                }}
                rows={5}
                className="w-full rounded p-2 shadow"
                placeholder="Write some notes here..."
              />
              <div className="text-xs italic">
                Notes are stored in the URL. Try copying the URL into a new tab!
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div>
        <button
          className="rounded bg-indigo-500 p-2 font-black uppercase text-white disabled:opacity-50"
          disabled={status === 'pending'}
        >
          Save
        </button>
      </div>
      {variables?.id === invoice.id ? (
        <div key={submittedAt}>
          {status === 'success' ? (
            <div className="inline-block animate-bounce rounded bg-green-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Saved!
            </div>
          ) : status === 'error' ? (
            <div className="inline-block animate-bounce rounded bg-red-500 px-2 py-1 text-white [animation-duration:.3s] [animation-iteration-count:2.5]">
              Failed to save.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
