"use client";
import { redirect } from 'next/navigation'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useUser } from '@/services/users';
import AppLayout from '@/app/(app)/components/AppLayout';
import { useEffect } from 'react';

export default function Layout({ children, }: { children: React.ReactNode }) {
  const { data: user, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    if (user?.id === undefined) {
      redirect("/login");
    } else if (user) {
      if (user.onboarding_completed_at === null) {
        redirect("/onboarding");
      }
    }
  }, [user]);

  if (isUserLoading) { return null; }

  return (
    <>
      <AppLayout>{children}</AppLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
