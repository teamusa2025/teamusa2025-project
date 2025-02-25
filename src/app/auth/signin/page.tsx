/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { signIn } from 'next-auth/react';

/** The sign-in page. */
const SignIn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/list',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <section className="bg-white-50 dark:bg-gray-900">
      <div className="min-h-3/5 lg:min-h-1/2 mx-auto mt-36 flex flex-col items-center px-6 py-8">
        <a href="/" className="mb-6 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="xl:h-18 mr-2 h-14 w-auto sm:h-14 md:h-14 lg:h-16"
            // eslint-disable-next-line max-len
            src="https://cdn.prod.website-files.com/5fdaca5a4d51110c2f760a05/651ee756e790fe1817276c02_SpireLogo-2z-p-500.png"
            alt="logo"
          />
        </a>
        <div
          className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800
        sm:max-w-md md:mt-0 xl:p-0"
        >
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border
                  border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border
                  border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                  dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 size-4 rounded border
                      border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                </div>
                {/* <a
                  href="/"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5
                py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700
                focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                {' '}
                <a
                  href="/auth/request-access"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Request access
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
