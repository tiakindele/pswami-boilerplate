"use client";

import { redirect } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form';

import { useUser } from "@/services/users";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const form = useForm();
  const { data: user, isLoading } = useUser();

  if (!!user?.onboarding_completed_at) {
    redirect("/home");
  }

  return (
    <div className="flex h-screen w-screen p-4 items-center justify-center bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r">
      <div className="md:w-5/12 relative md:h-auto  flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg bg-white/50 dark:bg-black/50 pt-16 pb-4">
        <span className="absolute top-0 h-1 w-1/6 bg-blue-600"></span>
        <FormProvider {...form}>
          <form>
            {children}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
