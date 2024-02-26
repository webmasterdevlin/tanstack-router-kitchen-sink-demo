import { Link } from '@tanstack/react-router';
import { root } from '../utils/routePaths';

function MainNav() {
  return (
    <div className={'w-56 divide-y'}>
      {root.map(([to, label]) => {
        return (
          <div key={to}>
            <Link
              to={to}
              key={to}
              activeOptions={
                {
                  // If the route points to the root of it's parent,
                  // make sure it's only active if it's exact
                  // exact: to === '.',
                }
              }
              preload="intent"
              className={'block px-3 py-2 capitalize text-blue-700'}
              // Make "active" links bold
              activeProps={{ className: 'font-bold' }}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MainNav;
