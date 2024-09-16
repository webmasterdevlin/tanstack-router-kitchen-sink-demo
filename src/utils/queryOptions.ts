import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchInvoiceById, fetchInvoices, fetchUserById, fetchUsers, patchInvoice, postInvoice } from './mockTodos';

export const invoicesQueryOptions = () => {
  return queryOptions({
    queryFn: () => {
      return fetchInvoices();
    },
    queryKey: ['invoices'],
  });
};

export const invoiceQueryOptions = (invoiceId: number) => {
  return queryOptions({
    queryFn: () => {
      return fetchInvoiceById(invoiceId);
    },
    queryKey: ['invoices', invoiceId],
  });
};

export const usersQueryOptions = (opts: { filterBy?: string; sortBy?: 'name' | 'id' | 'email' }) => {
  return queryOptions({
    queryFn: () => {
      return fetchUsers(opts);
    },
    queryKey: ['users', opts],
  });
};

export const userQueryOptions = (userId: number) => {
  return queryOptions({
    queryFn: () => {
      return fetchUserById(userId);
    },
    queryKey: ['users', userId],
  });
};

export const useCreateInvoiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ['invoices', 'create'],
    mutationFn: postInvoice,
    onSuccess: () => {
      return queryClient.invalidateQueries();
    },
  });
};

export const useUpdateInvoiceMutation = (invoiceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    gcTime: 1000 * 10,
    mutationFn: patchInvoice,
    mutationKey: ['invoices', 'update', invoiceId],
    onSuccess: () => {
      return queryClient.invalidateQueries();
    },
  });
};
