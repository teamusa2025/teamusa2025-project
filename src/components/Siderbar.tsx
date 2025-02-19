/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const currentUsername = session?.user?.username;
  const currentSubrole = session?.user?.subrole;
  console.log(currentSubrole);
  const userWithRole = session?.user as unknown as {
    email: string;
    randomKey: string;
  };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // test
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <Home className="size-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <Inbox className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3 flex-1 whitespace-nowrap">Inbox</span>
              <span className="ms-3 inline-flex size-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <Users className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3 flex-1 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <ShoppingBag className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3 flex-1 whitespace-nowrap">Products</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <LogIn className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3 flex-1 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {/* <UserPlus className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /> */}
              <span className="ms-3 flex-1 whitespace-nowrap">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
