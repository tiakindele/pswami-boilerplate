"use client";
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google";

import AppNavbar from '@/app/(app)/components/Navbar';
import AppSidebar from '@/app/(app)/components/Sidebar';
import { useUser } from '@/services/users';

const inter = Inter({ subsets: ["latin"] });

const InactiveView = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Your account is not active</h1>
      <p className="text-center">Please go to settings to Renew Plan.</p>
    </div>
  </div>
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading: isLoading } = useUser();
  const sidebarState = useState(true);

  return (
    <div className={`bg-white dark:bg-gray-800 min-h-screen ${inter.className}`}>
      {/* Top Container */}
      <AppNavbar sidebarState={sidebarState} />

      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Left Side Container */}
        <div className="z-10 flex">
          <AppSidebar sidebarState={sidebarState} />
        </div>

        {/* Main Container */}
        <div className={`relative w-full min-h-[calc(100vh-4rem)] overflow-y-auto md:ml-64 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:text-bg-900`}>
          {user?.active && children}
          {!user?.active && <InactiveView />}
        </div>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
