/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const currentUsername = session?.user?.username;
  const currentSubrole = session?.user?.subrole;
  console.log(currentSubrole);
  const userWithRole = session?.user as unknown as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // test
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current
        && !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Define the navigation links array
  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'admin', label: 'Admin', href: '/admin' },
    { id: 'auditor', label: 'Auditor', href: '/auditor' },
    { id: 'analyst', label: 'Analyst', href: '/analyst' },
    { id: 'executive', label: 'Executive', href: '/executive' },
  ];

  const filteredNavLinks = session
    ? navLinks.filter(
      (link) => link.id === 'home'
          || link.id === currentSubrole?.toLowerCase(),
    )
    : navLinks.filter((link) => link.id === 'home');

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
          {filteredNavLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mx-3 inline-block font-medium no-underline transition duration-100 ${
                hoveredLink === link.id
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white'
              }`}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Image Button */}
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300
                  dark:focus:ring-gray-600"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 rounded-full"
                    // eslint-disable-next-line max-len
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q"
                    alt="User"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg
                  dark:border-gray-600 dark:bg-gray-700"
                  >
                    <div className="border-bottom px-4 py-3">
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        {currentUsername || 'Unknown User'}
                      </span>
                      <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                        {currentUser}
                      </span>
                    </div>
                    <ul className="p-0">
                      <li>
                        <a
                          href="/auth/change-password"
                          className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100
                          dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/signout"
                          className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100
                          dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-gray-700
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300
            dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block size-6 text-gray-700 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
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
          <div
            ref={mobileMenuRef}
            className="fixed left-0 mt-36 w-full border bg-white shadow dark:bg-gray-900 md:hidden"
          >
            <ul className="mt-10 flex flex-col items-center space-y-4 p-4">
              {filteredNavLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`font-medium no-underline transition duration-300 ${
                      hoveredLink === link.id
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
