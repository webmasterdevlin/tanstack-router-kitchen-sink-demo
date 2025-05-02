import { createMiddleware } from '@tanstack/react-start';

export const appleMiddleware = createMiddleware().server(({ next, context }) => {
  console.log('appleMiddleware:', context);

  return next();
});
