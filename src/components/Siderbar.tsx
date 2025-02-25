'use client';

import * as React from 'react';

const Sidebar = () => (
  <aside
    id="sidebar"
    role="navigation"
    aria-label="Main navigation"
    className="fixed left-0 top-0 h-screen w-64 flex-col border-r bg-gray-800 text-gray-300 shadow-2xl"
  >
    {/* Header */}
    <a
      href="/"
      className="flex h-14 items-center border-b px-4 text-xl font-medium text-gray-300 no-underline"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="mr-3 h-10 rounded-full"
        // eslint-disable-next-line max-len
        src="https://cdn.discordapp.com/attachments/1328472895554584677/1334273560943923287/Smaller.png?ex=67be3596&is=67bce416&hm=32632bd3d4599bc8374a5d57ca1195c09b88d6b27c3f1a28ecc4dff9524b78e8&"
        alt="sidebar logo"
      />
      <span>Spire</span>
    </a>

    {/* Navigation */}
    <nav className="flex-1 space-y-1 p-2">
      <a
        href="/"
        aria-current="page"
        className="group flex items-center rounded-md p-3 text-sm font-medium text-gray-300
        no-underline transition-colors
        hover:bg-gray-700"
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
            d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0
          0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"
          />
          <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
        </svg>
        <span className="transition-all duration-300">Dashboard</span>
      </a>
      <a
        href="/"
        className="group flex items-center rounded-md p-3 text-sm font-medium text-gray-300 no-underline
        transition-colors
        hover:bg-gray-700"
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
            d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038
            4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0
            0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="transition-all duration-300">Documentation</span>
      </a>
    </nav>
  </aside>
);

export default Sidebar;
