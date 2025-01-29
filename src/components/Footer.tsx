'use client';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="m-4 rounded-lg bg-white dark:bg-gray-900">
    <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
      <hr className="my-6 w-full border-t-2 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        <p>

          Spire® logo is a registered trademark of
          {' '}
        <a
            href="https://www.spirehawaii.com/"
            className="text-gray-500 hover:underline dark:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spire Hawaii LLP
          </a>
          {' '}
          and not owned by TeamUSA2025. <br /><br />
        © 2025
        {' '}
        <a
          href="https://teamusa2025.github.io/"
          className="text-gray-500 hover:underline dark:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          TeamUSA2025™
        </a>
        . All Rights Reserved.
        </p>
      </span>
    </div>
  </footer>
);

export default Footer;
