import { Link } from "@tanstack/react-router";
import { dashboard } from "../utils/routePaths";

function DashboardNav() {
  return (
    <div className="flex flex-wrap divide-x">
    {dashboard.map(([to, label, exact]) => {
      return (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact }}
          activeProps={{ className: `font-bold` }}
          className="p-2 capitalize"
        >
          {label}
        </Link>
      );
    })}
  </div>
  )
}

export default DashboardNav