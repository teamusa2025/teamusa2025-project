/* eslint-disable @next/next/no-img-element */

'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const currentUsername = session?.user?.username;
  const pathName = usePathname();
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

  return (
    <nav
      className="fixed right-0 top-0 z-50 h-14 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
      style={{ left: '16rem', width: 'calc(100% - 16rem)' }}
    >
      <div className="flex h-full items-center justify-end pr-4">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 rounded-full"
              src="https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
              alt="user"
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg
            dark:border-gray-600 dark:bg-gray-700"
            >
              <div className="border-b px-4 py-3">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                  {currentUsername || 'Unknown User'}
                </span>
                <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                  {currentUser}
                </span>
              </div>
              <ul className="p-1">
                <li>
                  <a
                    href="/auth/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100 dark:text-gray-300
                    dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Change Password
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 no-underline hover:bg-gray-100
                    dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
