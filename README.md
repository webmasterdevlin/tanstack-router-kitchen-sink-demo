# Forked Tanstack Router Kitchen Sink Demo

To run this example:

- `bun install` or `pnpm`
- `bun run dev` or `pnpm start`


## The route loading lifecycle
Every time a URL/history update is detected, the router executes the following sequence:

- Route Matching (Top-Down)
    - route.params.parse
    - route.validateSearch
- Route Pre-Loading (Serial)
    - route.beforeLoad
    - route.onError
        - route.errorComponent / parentRoute.errorComponent / router.defaultErrorComponent
- Route Loading (Parallel)
    - route.component.preload?
    - route.loader
        - route.pendingComponent (Optional)
        - route.component
    - route.onError
        - route.errorComponent / parentRoute.errorComponent / router.defaultErrorComponent