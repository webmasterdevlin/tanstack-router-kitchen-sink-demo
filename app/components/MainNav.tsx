import { Link } from '@tanstack/react-router';
import { root } from '../utils/routePaths';

function MainNav() {
  return (
    <div className={'w-56 divide-y'}>
      {root.map(([to, label]) => {
        return (
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
            className={'block px-3 py-2 capitalize text-indigo-700'}
            // Make "active" links bold
            activeProps={{ className: 'font-bold' }}
          >
            {label}
          </Link>
        );
      })}
      <Link className={'block px-3 py-2 capitalize text-indigo-700'} to="/contact-us" mask={{ to: '/about-us' }}>
        contact us (masked to about us)
      </Link>
    </div>
  );
}

export default MainNav;
