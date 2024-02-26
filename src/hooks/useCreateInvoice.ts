import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { postInvoice } from '../utils/mockTodos';

export default function useUpdateInvoice() {
  const router = useRouter();

  return useMutation({
    mutationFn: postInvoice,
    onSuccess: () => {
      router.invalidate();
    },
  });
}
