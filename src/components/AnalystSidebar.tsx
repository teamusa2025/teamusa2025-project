'use client';

import { usePathname } from 'next/navigation';

const AnalystSidebar = () => {
  const pathName = usePathname();

  return (
    <section className="mt-20 py-1 dark:bg-gray-900">
      <aside
        id="default-sidebar"
        className="fixed left-0 top-20 z-10 h-screen transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 py-4 dark:bg-gray-800">
          <ul className="me-4 ms-4 space-y-4 ps-0 font-medium">
            <li>
              <a
                href="/analyst/Home"
                className={`group flex items-center rounded-lg p-2 py-3 pe-5 text-gray-900 no-underline
                    hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${
                      pathName === '/analyst/Home'
                        ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-900'
                    }`}
              >
                <svg
                  // eslint-disable-next-line tailwindcss/enforces-shorthand
                  className={`h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900
                    dark:text-gray-400
                dark:group-hover:text-white ${
                  pathName === '/analyst/Home' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 576 521"
                >
                  <path
                    d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40
                40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24
                0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5
                0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18
                0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  />
                </svg>
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/analyst/FC"
                className={`group flex items-center rounded-lg p-2 py-3 text-gray-900 no-underline
                    hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${
                      pathName === '/analyst/FC'
                        ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-900'
                    }`}
              >
                <svg
                  // eslint-disable-next-line tailwindcss/enforces-shorthand
                  className={`h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900
                dark:text-gray-400 dark:group-hover:text-white ${
                  pathName === '/analyst/FC' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3
                1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4
                24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1
                31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44
                25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5
                3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1
                425.9c-8.8 2.8-18.6
                .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4
                6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4
                191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2
                15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5
                0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44
                25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4
                15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                  />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">FC</span>
              </a>
            </li>
            <li>
              <a
                href="/analyst/StressTest"
                className={`group flex items-center rounded-lg p-2 py-3 text-gray-900 no-underline hover:bg-gray-200
              dark:text-white dark:hover:bg-gray-700 ${
                pathName === '/analyst/StressTest'
                  ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-900'
              }`}
              >
                <svg
                  // eslint-disable-next-line tailwindcss/enforces-shorthand
                  className={`h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900
                dark:text-gray-400 dark:group-hover:text-white ${
                  pathName === '/analyst/StressTest'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64
               64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0
               64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128
               0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1
               1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128
               0c-8.8 0-16-7.2-16-16z"
                  />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">StressTest</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default AnalystSidebar;
