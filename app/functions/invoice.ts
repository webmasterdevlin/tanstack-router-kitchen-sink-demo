import { fetchInvoiceById, fetchInvoices, patchInvoice, postInvoice } from '@/utils/mockTodos';
import { createServerFn } from '@tanstack/start';
import { z } from 'zod';

export const fetchInvoicesFn = createServerFn({ method: 'GET' }).handler(async () => {
  return await fetchInvoices();
});

export const fetchInvoiceByIdFn = createServerFn({ method: 'GET' })
  .validator((data: number) => data)
  .handler(async ({ data }) => {
    const invoice = await fetchInvoiceById(data);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  });

const PostInvoiceValidationSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  id: z.number().optional(),
});

export const postInvoiceFn = createServerFn({ method: 'POST' })
  .validator((invoice: unknown) => {
    return PostInvoiceValidationSchema.parse(invoice);
  })
  .handler(async ({ data }) => {
    return postInvoice(data);
  });

const PatchInvoiceValidationSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  id: z.number(),
});

export const patchInvoiceFn = createServerFn({ method: 'POST' })
  .validator((invoice: unknown) => {
    return PatchInvoiceValidationSchema.parse(invoice);
  })
  .handler(async ({ data }) => {
    return patchInvoice(data);
  });
