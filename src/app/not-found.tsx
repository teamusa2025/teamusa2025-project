'use client';

/* Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <section className="mt-20 bg-white dark:bg-gray-900">
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Something&apos;s missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <a
          href="/"
          className="bg-dark hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex
          rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white no-underline focus:outline-none
          focus:ring-4"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  </section>
);

export default NotFound;
