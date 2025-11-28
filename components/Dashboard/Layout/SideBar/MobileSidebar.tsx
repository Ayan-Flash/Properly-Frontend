"use client";

import React from "react";
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
  currentPath = "/dashboard",
  onNavigate,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % menuItems.length;
      document.getElementById(`mobile-menu-item-${nextIndex}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
      document.getElementById(`mobile-menu-item-${prevIndex}`)?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = menuItems[index];
      onNavigate?.(item.href);
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleClick = (href: string) => {
    onNavigate?.(href);
    onClose();
  };

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") return currentPath === "/dashboard";
    return currentPath?.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-blue-500">Properly</h1>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-4" role="navigation">
            {menuItems.map((item, index) => {
              const isActive = isActiveRoute(item.href);
              return (
                <button
                  key={item.id}
                  id={`mobile-menu-item-${index}`}
                  onClick={() => handleClick(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`my-2 flex w-full items-center gap-2 rounded-xl px-6 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                  tabIndex={0}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`transition-colors ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
