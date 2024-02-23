"use client";

import { redirect } from 'next/navigation'
import { useUser } from "@/services/users";

export default function AppLayout({ children, }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();

  if (user?.id) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <a href="https://flowbite-admin-dashboard.vercel.app/" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
        <img src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg" className="mr-4 h-11" alt="FlowBite Logo" />
        <span>AppName</span>
      </a>

      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
