import { createFileRoute, Outlet } from '@tanstack/react-router'
import DashboardNav from '@/components/DashboardNav'

export const Route = createFileRoute('/_authed/dashboard')({
  staleTime: 1000 * 60 * 5,
  preload: true,
  component: () => {

    return (
      <>
        <div className="flex items-center border-b">
          <h2 className="p-2 text-xl">Dashboard</h2>
        </div>
        <DashboardNav />
        <hr />
        <Outlet />
      </>
    )
  },
})
