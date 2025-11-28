"use client";

import React, { useState, useEffect } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

interface ResponsiveSidebarProps {
  currentPath?: string;
  onNavigate?: (href: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({ 
  currentPath = '/dashboard',
  onNavigate,
  isMobileMenuOpen = false,
  onMobileMenuToggle
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(isMobileMenuOpen);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync internal state with external prop
  useEffect(() => {
    setMobileMenuOpen(isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleMobileClose = () => {
    setMobileMenuOpen(false);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      {!isMobile && (
        <aside className="hidden md:block">
          <DesktopSidebar 
            currentPath={currentPath}
            onNavigate={onNavigate}
          />
        </aside>
      )}

      {/* Mobile Sidebar - Only on mobile */}
      {isMobile && (
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={handleMobileClose}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};

export default ResponsiveSidebar;