import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@/auth/config';

export default function Login() {
  const { instance } = useMsal();

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2">Tanstack Router Demo</h1>
        <button
          className="rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700"
          onClick={() => {
            return instance?.loginRedirect(loginRequest);
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}
