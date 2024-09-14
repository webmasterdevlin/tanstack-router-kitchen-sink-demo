import { Await, createFileRoute, defer, useAwaited } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/deferred-data')({
    loader: async () => {

        // comments and photos are deferred because they are not needed immediately
        const deferredComments = defer(axios.get("https://jsonplaceholder.typicode.com/comments"))
        const deferredPhotos = defer(axios.get("https://jsonplaceholder.typicode.com/photos"))

        const users = await (axios.get("https://jsonplaceholder.typicode.com/users"))

        return { deferredComments, deferredPhotos, users }
    },
    component: DeferComponent
});


function DeferComponent() {
    const { deferredComments, deferredPhotos, users } = Route.useLoaderData<LoaderDataType>()

    // useAwaited and Await are used to handle the deferred promises but returns different data types
    const resultsPhotos = useAwaited({ promise: deferredPhotos });

    return (
        <div className='container p-4'>
            <h1>Defer Page</h1>
            <p>Users: {JSON.stringify(users?.data).length}</p>

            <p>Photos (deferred): {JSON.stringify(resultsPhotos[0].data.length)}</p>

            <Await promise={deferredComments}>
                {(resultsComments) => <p>Comments (deferred): {JSON.stringify(resultsComments.data.length)}</p>}
            </Await>
        </div>
    )
}


interface LoaderDataType {
    users: { data: any[] },
    deferredPhotos: Promise<{ data: any[] }>,
    deferredComments: Promise<{ data: any[] }>,
}