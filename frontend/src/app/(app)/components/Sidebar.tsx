"use client";
import Link from "next/link";
import { Sidebar } from 'flowbite-react';
import SearchBar from "./SearchBar";
// import { useUser } from '@/services/users';

type Props = {
  sidebarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

export default function AppSidebar(props: Props) {
  const [sidebarOpen, setSidebarOpen] = props.sidebarState;

  return (
    <div className={`fixed h-full border-r dark:border-gray-700`}>
      <Sidebar
        className={`top-0 left-0 z-20 flex-col flex-shrink-0 h-full font-normal duration-75 transition-width overflow-hidden ${sidebarOpen ? "w-64" : "w-0 md:w-64"}`}
        theme={{ root: { inner: "h-full overflow-y-auto overflow-x-hidden bg-white py-4 px-3 dark:bg-gray-800" } }}
      >
        <div className="mt-2 mb-4 lg:hidden block">
          <SearchBar />
        </div>

        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} href="/home">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined"> bar_chart_4_bars </span>
                Dashboard
              </div>
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/about" label="Pro" labelColor="dark">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined"> vibration </span>
                About
              </div>
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/" label="3">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined"> calendar_month </span>
                Something
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

    </div>
  );
}
