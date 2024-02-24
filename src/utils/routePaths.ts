export const root = [
  ['/', 'home'],
  ['/dashboard', 'dashboard'],
  ['/expensive', 'expensive lazy'],
  ['/layout-a', 'layout a'],
  ['/layout-b', 'layout b lazy'],
  ['/profile', 'profile'],
  ['/login', 'login'],
] as const;

export const dashboard = [
  ['/dashboard', 'summary', true],
  ['/dashboard/invoices', 'invoices'],
  ['/dashboard/users', 'users'],
] as const;
