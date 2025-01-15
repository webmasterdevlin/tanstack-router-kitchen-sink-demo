import React, { useState, useEffect } from 'react';
import { createFileRoute, Link, MatchRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { Spinner } from '@/components/Spinner';
import { fetchUsersFn } from '@/functions/todos';

type UsersViewSortBy = 'name' | 'id' | 'email';

export const Route = createFileRoute('/dashboard/users')({
  component: UsersComponent,
  preSearchFilters: [
    // Persist (or set as default) the usersView search param
    // while navigating within or to this route (or it's children!)
    search => {
      return {
        ...search,
        usersView: {
          ...search.usersView,
        },
      };
    },
  ],
  validateSearch: z.object({
    usersView: z
      .object({
        filterBy: z.string().optional(),
        sortBy: z.enum(['name', 'id', 'email']).optional(),
      })
      .optional(),
  }).parse,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loaderDeps: ({ search }) => {
    return {
      filterBy: search.usersView?.filterBy,
      sortBy: search.usersView?.sortBy,
    };
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ deps }) => {
    return fetchUsersFn({ data: deps });
  },
});

function UsersComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { usersView } = Route.useSearch();
  const users = Route.useLoaderData();
  const sortBy = usersView?.sortBy ?? 'name';
  const filterBy = usersView?.filterBy;

  const [filterDraft, setFilterDraft] = useState(filterBy ?? '');

  useEffect(() => {
    setFilterDraft(filterBy ?? '');
  }, [filterBy]);

  const setSortBy = (sortBy: UsersViewSortBy) => {
    return navigate({
      replace: true,
      search: old => {
        return {
          ...old,
          usersView: {
            ...(old?.usersView ?? {}),
            sortBy,
          },
        };
      },
    });
  };

  React.useEffect(() => {
    navigate({
      replace: true,
      search: old => {
        return {
          ...old,
          usersView: {
            ...old?.usersView,
            filterBy: filterDraft || undefined,
          },
        };
      },
    });
  }, [filterDraft]);

  return (
    <div className="flex flex-1">
      <div className="divide-y">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2">
          <div>Sort By:</div>
          <select
            value={sortBy}
            onChange={e => {
              return setSortBy(e.target.value as UsersViewSortBy);
            }}
            className="flex-1 rounded border p-1 px-2"
          >
            {['name', 'id', 'email'].map(d => {
              return (
                <option key={d} value={d}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2">
          <div>Filter By:</div>
          <input
            value={filterDraft}
            onChange={e => {
              return setFilterDraft(e.target.value);
            }}
            placeholder="Search Names..."
            className="min-w-0 flex-1 rounded border p-1 px-2"
          />
        </div>
        {users?.map(user => {
          return (
            <div key={user.id}>
              <Link
                to="/dashboard/users/user"
                search={d => {
                  return {
                    ...d,
                    userId: user.id,
                  };
                }}
                className="block px-3 py-2 text-indigo-700"
                activeProps={{ className: 'font-bold' }}
              >
                <pre className="text-sm">
                  {user.name}{' '}
                  <MatchRoute
                    to="/dashboard/users/user"
                    search={{ userId: user.id, }}
                    pending
                  >
                    {match => {
                      return <Spinner show={!!match} wait="delay-50" />;
                    }}
                  </MatchRoute>
                </pre>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex-initial border-l border-gray-200">
        <Outlet />
      </div>
    </div>
  );
}
