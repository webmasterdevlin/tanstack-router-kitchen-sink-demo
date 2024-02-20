
import { createFileRoute, Outlet } from "@tanstack/react-router";
import DashboardNav from "../components/DashboardNav";

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <>
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Dashboard</h2>
      </div>
      <DashboardNav/>
      <hr />
      <Outlet />
    </>
  );
}
