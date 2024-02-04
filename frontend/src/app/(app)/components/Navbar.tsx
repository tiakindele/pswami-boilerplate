"use client";
import Link from "next/link";
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from 'next/navigation';
import { useUser, useLogout } from '@/services/users';
import { useCustomerPortal } from '@/services/stripe';
import SearchBar from "./SearchBar";

const i18n = {
  appName: 'AppName',
};

type Props = {
  sidebarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

export default function AppNavbar(props: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = props.sidebarState;
  const { data: user, isLoading } = useUser();
  const q = useCustomerPortal();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutateAsync().then(() => {
      router.push('/');
      setTimeout(() => { queryClient.setQueryData(['user'], null); }, 1000);
    });
  }

  const navToCustomerPortal = () => {
    q.refetch();
  };

  return (
    <Navbar fluid className="fixed z-30 w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center justify-center mr-2 p-1 text-gray-600 rounded cursor-pointer  lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="material-symbols-outlined"> menu </span>
        </button>
        <Navbar.Brand as={Link} href="/home" className="md:mr-32">
          <img src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg" className="mr-3 h-6 sm:h-9" alt={i18n.appName} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{i18n.appName}</span>
        </Navbar.Brand>

        <div className="lg:w-96">
          <SearchBar formClassName="hidden lg:block" />
        </div>
      </div>


      <div className="flex md:order-2">
        {user?.id ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={navToCustomerPortal}>Plan: {user.friendly_plan_name}</Dropdown.Item>
            <Link href="/settings"><Dropdown.Item>Settings</Dropdown.Item></Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button className="mr-2">Sign in</Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
