'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function Example() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Top blurred background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                // eslint-disable-next-line max-len
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <motion.div
          className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1
              ring-gray-900/10 hover:ring-gray-900/20"
            >
              This tool is now available for all users.
              {' '}
              <button type="button" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more
                {' '}
                <span aria-hidden="true">&rarr;</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Data to enrich your business finances
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              We intend to use this data to help you make better informed
              financial and strategic decisions. The Fiscal Sustainability Model
              is invaluable for any organization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                type="button"
                onClick={() => signIn()}
                className="shadow-xs rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white
                hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-indigo-600"
              >
                Get started
              </button>
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Learn more
                {' '}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom blurred background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
        >
          <div
            style={{
              clipPath:
                // eslint-disable-next-line max-len
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
