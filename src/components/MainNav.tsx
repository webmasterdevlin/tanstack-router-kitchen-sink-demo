import { Link, useRouter } from '@tanstack/react-router';
import useAuth from '../hooks/useAuth';
import { root } from '../utils/routePaths';

function MainNav() {
  const auth = useAuth();
  const router = useRouter();

  function handleLogout() {
    auth.logout();
    router.invalidate();
    router.navigate({ to: '/' });
  }

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
              className={'block px-3 py-2 capitalize text-indigo-700'}
              // Make "active" links bold
              activeProps={{ className: 'font-bold' }}
            >
              {label}
            </Link>
          </div>
        );
      })}
      <Link
        className={'block px-3 py-2 capitalize text-indigo-700'}
        to="https://twitter.com/DevlinDuldulao"
        target="_blank"
      >
        twitter
      </Link>
      <Link className={'block px-3 py-2 capitalize text-indigo-700'} to="/contactus" mask={{ to: '/aboutus' }}>
        contact us (masked to about us)
      </Link>
      <div>
        <button onClick={handleLogout} className={'block px-3 py-2 capitalize text-indigo-700'}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default MainNav;
