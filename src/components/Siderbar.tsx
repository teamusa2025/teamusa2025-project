/* eslint-disable @next/next/no-img-element */

'use client';

import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  const currentUsername = session?.user?.username;

  return (
    <aside
      id="sidebar"
      role="navigation"
      aria-label="Main navigation"
      className="fixed left-0 top-0 h-screen w-64 flex-col bg-gray-800 text-gray-300"
      style={{ boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)', zIndex: 60 }}
    >
      {/* Header */}
      <a
        href="/"
        className="flex h-14 items-center border-b px-4 text-2xl font-medium text-gray-300 no-underline"
        style={{ borderBottom: '1px solid #374151' }}
      >
        <img
          className="mr-3 h-10 rounded-full"
          // eslint-disable-next-line max-len
          src="https://cdn.discordapp.com/attachments/1328472895554584677/1334273560943923287/Smaller.png?ex=67be3596&is=67bce416&hm=32632bd3d4599bc8374a5d57ca1195c09b88d6b27c3f1a28ecc4dff9524b78e8&"
          alt="sidebar logo"
        />
        <span>Spire</span>
      </a>

      {/* User Info */}
      <div
        className="border-b border-gray-700 px-4 pt-3"
        style={{ borderBottom: '1px solid #374151' }}
      >
        <p className="text-md group flex items-center text-white">
          <svg
            className="mr-2 size-6 text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 1 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84
              0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0
              5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159
              13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{currentUsername || 'Guest'}</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        <span
          className="group flex items-center rounded-md px-3 pt-3 text-xs font-medium text-gray-500
        no-underline transition-colors hover:bg-gray-700"
        >
          Overview
        </span>
        <a
          href="/auditor"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300
          no-underline transition-colors hover:bg-gray-700"
        >
          <svg
            className="mr-2 size-6 text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 1 24 24"
          >
            <path
              d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1
            0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"
            />
            <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
          </svg>
          <span className="transition-all duration-300">Dashboard</span>
        </a>
        <a
          href="/"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 no-underline
          transition-colors hover:bg-gray-700"
        >
          <svg
            className="mr-2 size-6 text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007
              2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22
              16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="transition-all duration-300">Documentation</span>
        </a>
        <span
          className="group flex items-center rounded-md px-3 pt-3 text-xs font-medium text-gray-500
        no-underline transition-colors hover:bg-gray-700"
        >
          Account
        </span>
        <a
          href="/auth/change-password"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300
          no-underline transition-colors hover:bg-gray-700"
        >
          <svg
            className="mr-2 size-6 text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13
              0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>

          <span className="transition-all duration-300">Change Password</span>
        </a>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 no-underline
          transition-colors hover:bg-gray-700"
        >
          <svg
            className="mr-2 size-6 text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>

          <span className="transition-all duration-300">Sign Out</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
