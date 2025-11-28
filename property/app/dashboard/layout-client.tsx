"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ResponsiveSidebar from "@/components/Dashboard/Layout/SideBar/ResponsiveSidebar";
import TopBar from "@/components/Dashboard/Layout/TopBar/TopBar";

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    session: {
        email: string;
        name?: string;
        uniqueId?: string;
    };
}

export default function DashboardLayoutClient({ children, session }: DashboardLayoutClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle navigation
    const handleNavigate = (href: string) => {
        router.push(href);
    };

    // Handle mobile menu toggle
    const handleMobileMenuToggle = (isOpen: boolean) => {
        setIsMobileMenuOpen(isOpen);
    };

    return (
        <div className="w-full h-screen flex bg-gray-50">

            {/* Responsive Sidebar */}
            <ResponsiveSidebar
                currentPath={pathname}
                onNavigate={handleNavigate}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={handleMobileMenuToggle}
            />

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Topbar */}
                <TopBar
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                    userName={session.name}
                    userEmail={session.email}
                    uniqueId={session.uniqueId}
                />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
