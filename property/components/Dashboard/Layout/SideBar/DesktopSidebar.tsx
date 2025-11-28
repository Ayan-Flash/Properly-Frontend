"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuItems } from "./SidebarLinks";

interface DesktopSidebarProps {
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  currentPath = '/dashboard',
  onNavigate
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % menuItems.length;
      document.getElementById(`desktop-menu-item-${nextIndex}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
      document.getElementById(`desktop-menu-item-${prevIndex}`)?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = menuItems[index];
      if (onNavigate) {
        onNavigate(item.href);
      }
    }
  };

  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  // Check if current path matches or is a child route
  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath?.startsWith(href);
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="ml-4 border-b border-gray-200 flex items-center text-justify gap-3">
        {!isCollapsed ? (
          <h1 className="text-blue-500 font-bold text-2xl">
            TheProperly.com
          </h1>
        ) : (
          <h1 className="text-blue-500 font-extrabold text-2xl text-center animate-fadeIn">P</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 my-4"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-4" role="navigation">
        {menuItems.map((item, index) => {
          const isActive = isActiveRoute(item.href);
          return (
            <div key={item.id} className="relative group my-3">
              <button
                id={`desktop-menu-item-${index}`}
                onClick={() => handleClick(item.href)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 rounded-xl my-1 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                tabIndex={0}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium animate-fadeIn">{item.label}</span>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopSidebar;