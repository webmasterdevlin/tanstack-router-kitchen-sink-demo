import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { patchInvoice } from '../utils/mockTodos';

export default function useUpdateInvoice() {
  const router = useRouter();

  return useMutation({
    mutationFn: patchInvoice,
    onSuccess: () => {
      router.invalidate();
    },
  });
}
