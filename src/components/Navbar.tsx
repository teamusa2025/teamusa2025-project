/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        {/* Logo Section */}
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Flowbite
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex">
          <a href="/" className="mx-3 font-medium text-blue-700">
            Home
          </a>
          <a
            href="/"
            className="mx-3 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
          >
            About
          </a>
          <a
            href="/"
            className="mx-3 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
          >
            Services
          </a>
          <a
            href="/"
            className="mx-3  text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
          >
            Contact
          </a>
        </div>

        {/* Get Started Button */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 top-16 w-full bg-white dark:bg-gray-900 md:hidden">
            <ul className="flex flex-col items-center space-y-4 p-4">
              <li>
                <a href="/" className="font-medium text-blue-700">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
