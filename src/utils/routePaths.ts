export const root = [
  ['/', 'home'],
  ['/dashboard', 'dashboard (preloaded)'],
  ['/expensive', 'expensive (lazy)'],
  ['/layout-a', 'layout a'],
  ['/layout-b', 'layout b'],
  ['/profile', 'profile'],
] as const;

export const dashboard = [
  ['/dashboard', 'summary', true],
  ['/dashboard/invoices', 'invoices'],
  ['/dashboard/users', 'users'],
] as const;
