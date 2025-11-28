import React from 'react';

const MyProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <p className="text-gray-600">Manage your account settings and preferences</p>

      {/* Personal Information Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        {/* Placeholder for personal info content */}
        <div className="flex items-center gap-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-sm font-medium text-gray-900">Demo User</div>
            <div className="text-sm text-gray-500">demo@properly.com</div>
          </div>
        </div>
      </div>

      {/* My Activity Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Activity</h2>
        {/* Placeholder for activity content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Last Login</p>
            <p className="text-sm text-gray-500">27/11/2025, 23:17:15</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Account Status</p>
            <p className="text-sm text-green-600">Active</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">MFA Enabled</p>
            <p className="text-sm text-gray-500">No</p>
          </div>
        </div>
      </div>

      {/* Credentials & Banking Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Credentials & Banking</h2>
        {/* Placeholder for banking content */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-gray-900">Primary Bank Account</p>
            <p className="text-sm text-gray-500">Ending in **** 4242</p>
          </div>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Connected
          </span>
        </div>
        <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Manage Payment Methods
        </button>
      </div>

      {/* Security Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
        {/* Placeholder for security content */}
        <div className="space-y-4">
          <button className="w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Change Password
          </button>
          <button className="w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

