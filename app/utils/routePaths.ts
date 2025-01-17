export const root = [
  ['/', 'home'],
  ['/dashboard', 'dashboard (preloaded)'],
  ['/layout-a', 'layout a'],
  ['/layout-b', 'layout b'],
  ['/deferred-data', 'deferred data'],
  // ['/profile', 'profile'], // type error
] as const;

export const dashboard = [
  ['/dashboard', 'summary', true],
  ['/dashboard/invoices', 'invoices'],
  ['/dashboard/users', 'users'],
] as const;
