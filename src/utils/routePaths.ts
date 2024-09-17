export const root = [
  ['/', 'home'],
  ['/dashboard', 'dashboard (preloaded)'],
  ['/layout-a', 'layout a'],
  ['/layout-b', 'layout b'],
  ['/expensive', 'expensive (lazy)'],
  ['/deferred-data', 'deferred data'],
  // ['/profile', 'profile'], // type error
] as const;

export const dashboard = [
  ['/dashboard', 'summary', true],
  ['/dashboard/invoices', 'invoices'],
  ['/dashboard/users', 'users'],
] as const;
