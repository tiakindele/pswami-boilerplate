'use client';
import { Navbar, Button } from 'flowbite-react';
import Link from "next/link";
import { Toaster } from 'react-hot-toast';
import * as Landing from './components/Landing';

export default function Home() {
  return (
   <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      {/* Navbar */}
      <Navbar fluid rounded theme={{ root: { base: 'bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-900 sm:px-4' }}}>
        <Navbar.Brand as={Link} href="/home">
          <img src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg" className="mr-3 h-6 sm:h-9" alt={'AppName'} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{'AppName'}</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link href="/home"><Button>Go to App</Button></Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Landing.HeroSection />
      <Landing.InfoSection />
      <Landing.PricingSection />
      <Landing.Footer />
   </>
  );
}
