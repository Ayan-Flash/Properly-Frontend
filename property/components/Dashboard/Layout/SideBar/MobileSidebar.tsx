"use client";

import React from 'react';
import { X } from "lucide-react";
import { menuItems } from "./SidebarLinks";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isOpen,
  onClose,
  currentPath = '/dashboard',
  onNavigate
}) => {

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % menuItems.length;
      document.getElementById(`mobile-menu-item-${nextIndex}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
      document.getElementById(`mobile-menu-item-${prevIndex}`)?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = menuItems[index];
      if (onNavigate) {
        onNavigate(item.href);
      }
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
    onClose();
  };

  // Check if current path matches or is a child route
  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath?.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shadow-2xl">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-blue-500 font-bold text-3xl">
              Properly
            </h1>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-4" role="navigation">
            {menuItems.map((item, index) => {
              const isActive = isActiveRoute(item.href);
              return (
                <div key={item.id}>
                  <button
                    id={`mobile-menu-item-${index}`}
                    onClick={() => handleClick(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-full flex items-center gap-2 px-6 py-3 text-left transition-all duration-200 rounded-xl my-2 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                    tabIndex={0}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;