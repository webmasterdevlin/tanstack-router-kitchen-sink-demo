import { createMiddleware } from '@tanstack/react-start';

export const bananaMiddleware = createMiddleware().server(({ next, context }) => {
  console.log('bananaMiddleware:', context);

  return next();
});
