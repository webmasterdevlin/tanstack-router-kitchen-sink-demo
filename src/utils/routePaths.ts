export const root = [
  ["/", "home"],
  ["/dashboard", "dashboard"],
  ["/expensive", "expensive"],
  ["/layout-a", "layout a"],
  ["/layout-b", "layout b"],
  ["/profile", "profile"],
  ["/login", "login"],
] as const;

export const dashboard = [
  ["/dashboard", "summary", true],
  ["/dashboard/invoices", "invoices"],
  ["/dashboard/users", "users"],
] as const;
