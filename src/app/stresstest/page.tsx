'use client';

import React, { useState } from 'react';

const ScenarioOne: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stressEffect, setStressEffect] = useState<boolean>(false);
  const scenarioToggle = 'stress-effect-toggle';

  return (
    <div className=" mx-auto mt-6 max-w-4xl p-6">
      {/* Header */}
      <h1 className="mb-8 mt-20 text-center text-3xl font-bold">Scenario #1</h1>

      {/* Toggle Switch */}

      <div>
        <label htmlFor={scenarioToggle} className="inline-flex cursor-pointer items-center">
          <input id={scenarioToggle} type="checkbox" value="" className="peer sr-only" />
          <div className="after:top after:start after:content peer relative h-6 w-11 rounded-full
          bg-gray-200 after:absolute after:size-5 after:rounded-full after:border after:border-gray-300
          after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full
          peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
          dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800
          rtl:peer-checked:after:-translate-x-full"
          />
          <span
            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Stress Effect
          </span>
        </label>
      </div>

      {/* Different Fields */}
      {[
        { label: 'Present Value', id: 'presentValue' },
        { label: 'Interest Rate', id: 'interestRate' },
        { label: 'Term (in years)', id: 'termYears' },
        { label: 'Contribution each month (reinvested interest)', id: 'contribution' },
      ].map((field) => (
        <div key={field.id} className="mb-4 flex items-center">
          <label htmlFor={field.id} className="w-1/3 text-lg font-medium text-gray-700">
            {field.label}
            :
          </label>
          <input
            type="number"
            id={`${field.id}-1`}
            placeholder="Value 1"
            className="mr-4 w-1/4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring
            focus:ring-blue-300"
          />
          <input
            type="number"
            id={`${field.id}-2`}
            placeholder="Value 2"
            className="w-1/4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      ))}

      {/* Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="mr-4 rounded-md bg-green-500 px-6 py-2 font-semibold text-white shadow
        transition-all hover:bg-green-600"
        >
          Save
        </button>
        <button
          type="button"
          className="rounded-md bg-blue-500 px-6 py-2 font-semibold text-white shadow transition-all
        hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScenarioOne;
