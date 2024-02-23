"use client";
import { useRouter } from 'next/navigation'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useUser } from '@/services/users';
import AppLayout from '@/app/(app)/components/AppLayout';
import { useEffect } from 'react';

export default function Layout({ children, }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    if (user?.id === undefined) {
      router.push("/login");
    } else if (user) {
      if (user.onboarding_completed_at === null) {
        router.push("/onboarding");
      }
    }
  }, [router, user]);

  if (isUserLoading) { return null; }

  return (
    <>
      <AppLayout>{children}</AppLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
