'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/auth/login');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Logout Confirmation</h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to log out of your account?
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Yes, Logout
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full"
          >
            Cancel
          </Button>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          You will be redirected to the login page after logout.
        </p>
      </Card>
    </div>
  );
}
