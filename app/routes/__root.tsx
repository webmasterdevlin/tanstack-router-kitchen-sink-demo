// app/routes/__root.tsx

import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { lazy, type ReactNode } from 'react';
import MainNav from '@/components/MainNav';

export const Route = createRootRoute({
    component: RootComponent,
    head: () => {
        return {
            meta: [
                {
                    charSet: 'utf-8',
                },
                {
                    content: 'width=device-width, initial-scale=1',
                    name: 'viewport',
                },
                {
                    title: 'TanStack Start Starter',
                },
            ],
        };
    },
});

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => {
            return null;
        } // Render nothing in production
        : lazy(() =>
        // Lazy load in development
        {
            return import('@tanstack/router-devtools').then(res => {
                return {
                    default: res.TanStackRouterDevtools,
                    // For Embedded Mode
                    // default: res.TanStackRouterDevtoolsPanel
                };
            });
        },
        );

function RootComponent() {
    return (
        <RootDocument>
            <div className={'flex min-h-screen flex-col'}>
                <div className={'flex items-center gap-2 border-b'}>
                    <div className="flex w-full items-center justify-between">
                        <h1 className={'p-2 text-3xl'}>Kitchen Sink 🍴</h1>
                    </div>
                </div>
                <div className={'flex flex-1'}>
                    <MainNav />
                    <div className={'flex-1 border-l border-gray-200'}>
                        {/* Render our first route match */}
                        <Outlet />
                    </div>
                </div>
            </div>
            <TanStackRouterDevtools position="bottom-right" />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <Meta />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
