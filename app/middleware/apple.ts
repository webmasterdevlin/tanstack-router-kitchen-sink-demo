import { createMiddleware } from '@tanstack/start';

export const appleMiddleware = createMiddleware().server(({ next, context }) => {
  console.log('appleMiddleware:', context);

  return next();
});
