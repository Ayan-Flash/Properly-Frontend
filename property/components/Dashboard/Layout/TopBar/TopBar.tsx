"use client";

import React, { useState } from 'react';
import { Menu, Copy, HelpCircle, Bell, ChevronDown } from 'lucide-react';
import { logout } from '@/app/actions/auth';

interface TopBarProps {
  onMenuClick?: () => void;
  userName?: string;
  userRole?: string;
  userEmail?: string;
  uniqueId?: string;
  notificationCount?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  onMenuClick,
  userName = 'Anuj Jain',
  userRole = 'Property Investor',
  userEmail = '6146915272@email.thepa.au',
  uniqueId = 'ID-0000',
  notificationCount = 1,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const displayUniqueId = `Unique ID : ${uniqueId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueId);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600 hidden sm:inline">{displayUniqueId}</span>
          <span className="text-sm text-gray-600 sm:hidden">ID: {uniqueId}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label="Copy ID"
          >
            <Copy size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Help Button */}
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <HelpCircle size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Help</span>
        </button>

        {/* Help Icon Only (Mobile) */}
        <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <HelpCircle size={20} className="text-gray-600" />
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-semibold text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop for mobile */}
              <div
                className="fixed inset-0 z-30 lg:hidden"
                onClick={() => setShowUserMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
                <a href="/dashboard/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div>Profile Settings</div>
                </a>
                <a href="/dashboard/profile/activity" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <div>My Activity</div>
                </a>
                <form action={logout}>
                  <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100 transition-colors">
                    Sign Out
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;