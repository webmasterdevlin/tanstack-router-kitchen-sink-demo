import { createMiddleware } from '@tanstack/start';

export const bananaMiddleware = createMiddleware().server(({ next, context }) => {
  console.log('bananaMiddleware:', context);

  return next();
});
