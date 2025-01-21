import { fetchUserById, fetchUsers } from '@/utils/mockTodos';
import { createServerFn } from '@tanstack/start';
import { z } from 'zod';

const FetchUsersValidationSchema = z.object({
  filterBy: z.string().optional(),
  sortBy: z.union([z.literal('name'), z.literal('id'), z.literal('email')]).optional(),
});

export const fetchUsersFn = createServerFn({ method: 'GET' })
  .validator((users: unknown) => {
    return FetchUsersValidationSchema.parse(users);
  })
  .handler(async ({ data }) => {
    return await fetchUsers(data);
  });

export const fetchUserByIdFn = createServerFn({ method: 'GET' })
  .validator((id: number) => id)
  .handler(async ({ data }) => {
    return await fetchUserById(data);
  });
