/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600
    dark:bg-gray-900"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // eslint-disable-next-line max-len
            src="https://cdn.prod.website-files.com/5fdaca5a4d51110c2f760a05/651ee756e790fe1817276c02_SpireLogo-2z-p-500.png"
            className="h-9"
            alt="Flowbite Logo"
          />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex">
          <a
            href="/"
            className="mx-3 font-medium text-gray-900 no-underline hover:text-blue-700 dark:text-white
            dark:hover:text-blue-500"
          >
            Home
          </a>
          <a
            href="/"
            className="mx-3 font-medium text-gray-900 no-underline hover:text-blue-700 dark:text-white
            dark:hover:text-blue-500"
          >
            Admin
          </a>
          <a
            href="/"
            className="mx-3 font-medium text-gray-900 no-underline hover:text-blue-700 dark:text-white
            dark:hover:text-blue-500"
          >
            Auditor
          </a>
          <a
            href="/"
            className="mx-3 font-medium text-gray-900 no-underline hover:text-blue-700 dark:text-white
            dark:hover:text-blue-500"
          >
            Analyst
          </a>
          <a
            href="/"
            className="mx-3 font-medium text-gray-900 no-underline hover:text-blue-700 dark:text-white
            dark:hover:text-blue-500"
          >
            Executive
          </a>
        </div>

        {/* Get Started Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <a href="/auth/signin" className="no-underline">
              <button
                type="button"
                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm
                font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
                focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="text-white-800 size-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="2 0.25 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13
                    16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span>Login</span>
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
            dark:focus:ring-gray-600 md:hidden"
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
