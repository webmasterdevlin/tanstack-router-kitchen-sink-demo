import { Link, useRouter } from '@tanstack/react-router';
import { root } from '../utils/routePaths';
import { useClerk, useUser } from '@clerk/tanstack-start';

function MainNav() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  function handleLogout() {
    signOut()
    router.invalidate();
    router.navigate({ to: '/' });
  }

  function handleLogin() {
    router.invalidate();
    router.navigate({ to: '/sign-in/$' });
  }

  return (
    <div className={'w-56 divide-y'}>
      {root.map(([to, label]) => {
        if (to === '/dashboard' && !isSignedIn) {
          return null;
        }
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
      <div>
        {isSignedIn ? (
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
