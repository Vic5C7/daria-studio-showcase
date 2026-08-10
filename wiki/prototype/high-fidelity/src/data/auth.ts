export type AuthRole = "admin" | "client";

export type AuthUser = {
  email: string;
  role: AuthRole;
};

export const demoAccounts: Array<AuthUser & { password: string }> = [
  {
    email: "boss@qq.com",
    password: "123456",
    role: "admin"
  },
  {
    email: "client@qq.com",
    password: "123456",
    role: "client"
  }
];

const authStorageKey = "daria-studio-auth-user:v1";

export function readSavedAuthUser(): AuthUser | null {
  try {
    const savedUser = window.sessionStorage.getItem(authStorageKey);
    return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function saveAuthUser(user: AuthUser) {
  window.sessionStorage.setItem(authStorageKey, JSON.stringify(user));
}

export function clearAuthUser() {
  window.sessionStorage.removeItem(authStorageKey);
}

export function findDemoAccount(email: string, password: string): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const account = demoAccounts.find(
    (demoAccount) =>
      demoAccount.email.toLowerCase() === normalizedEmail && demoAccount.password === password
  );

  return account ? { email: account.email, role: account.role } : null;
}
