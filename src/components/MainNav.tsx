import { useMsal } from '@azure/msal-react';
import { Link, useRouter } from '@tanstack/react-router';
import { loginRequest } from '../auth/config';
import useAuth from '../hooks/useAuth';
import { root } from '../utils/routePaths';

function MainNav() {
  const { instance } = useMsal();
  const auth = useAuth();
  const router = useRouter();

  function handleLogout() {
    auth.logout();
    router.invalidate();
    router.navigate({ to: '/' });
  }

  function handleLogin() {
    instance.loginRedirect(loginRequest);
    router.invalidate();
  }

  return (
    <div className={'w-56 divide-y'}>
      {root.map(([to, label]) => {
        if (to === '/dashboard' && auth.status !== 'loggedIn') {
          return null;
        }
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
      <Link className={'block px-3 py-2 capitalize text-indigo-700'} to="/contact-us" mask={{ to: '/about-us' }}>
        contact us (masked to about us)
      </Link>
      <div>
        {auth.status === 'loggedIn' ? (
          <button onClick={handleLogout} className={'block px-3 py-2 capitalize text-indigo-700'}>
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className={'block px-3 py-2 capitalize text-indigo-700'}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default MainNav;
