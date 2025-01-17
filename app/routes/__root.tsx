import globalStyle from '../globals.css?url';
import { lazy, type ReactNode } from 'react';
import { Outlet, ScrollRestoration, createRootRoute, createRootRouteWithContext, useRouteContext } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { MsalProvider } from '@azure/msal-react';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import MainNav from '@/components/MainNav';
import { msalConfig } from '@/auth/config';
import useAuth from '@/hooks/useAuth';
import { Auth } from '@/models/auth';

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
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
            links: [
                {
                    rel: 'stylesheet',
                    href: globalStyle
                },
            ]
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


const AuthenticatedUser = () => {
    const auth = useAuth();
    const routeContext = useRouteContext({ from: '__root__' });
    routeContext.auth = auth;

    return <pre className="text-indigo-500">{auth?.username}</pre>
}
export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const msalInstance = new PublicClientApplication(msalConfig);

    msalInstance.initialize().then(() => {
        // Account selection logic is app dependent. Adjust as needed for different use cases.
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
        }

        msalInstance.addEventCallback((event: any) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
                const account = event.payload.account;
                msalInstance.setActiveAccount(account);
            }
        });
    });

    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}


function RootComponent() {

    return (
        <AuthProvider>
            <RootDocument>
                <div className={'flex min-h-screen flex-col'}>
                    <div className={'flex items-center gap-2 border-b'}>
                        <div className="flex w-full items-center justify-between">
                            <h1 className={'p-2 text-3xl'}>Kitchen Sink 🍴</h1>
                            <AuthenticatedUser />
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
                <TanStackRouterDevtools position="bottom-left" />
            </RootDocument>
        </AuthProvider>
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
