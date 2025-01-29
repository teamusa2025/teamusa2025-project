'use client';

/** After the user clicks the "SignOut" link in the NavBar, display this page to ensure they want to sign out. */
const SignOut = () => (
  <section className="my-20 bg-white py-2 dark:bg-gray-900">
    <div className="mx-auto my-5 max-w-screen-xl px-4 py-2 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <p className="mb-4 py-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
          Are you sure you want to sign out?
        </p>
        <a
          href="/"
          className="focus:ring-primary-300 dark:focus:ring-primary-900 mx-20 my-5 inline-flex rounded-lg
          bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-red-800
          focus:outline-none focus:ring-4"
        >
          Sign Out
        </a>
        <a
          href="/"
          className="focus:ring-primary-300 dark:focus:ring-primary-900 mx-20 my-5 inline-flex rounded-lg
          bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-gray-800
          focus:outline-none focus:ring-4"
        >
          Cancel
        </a>
      </div>
    </div>
  </section>
);

export default SignOut;
