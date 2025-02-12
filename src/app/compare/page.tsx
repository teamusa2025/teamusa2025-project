/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';

// Define the structure for data points used in the sustainability models
interface DataPoint {
  year: number;
  value: number;
}

// Define the structure for sustainability models with different stress tests
interface Models {
  [key: string]: {
    [key: string]: DataPoint[];
  };
}

// Sustainability models containing different projections based on stress tests
const sustainabilityModels: Models = {
  Baseline: {
    'Model A': [
      { year: 2020, value: 80 },
      { year: 2021, value: 85 },
      { year: 2022, value: 90 },
    ],
    'Model B': [
      { year: 2020, value: 70 },
      { year: 2021, value: 75 },
      { year: 2022, value: 78 },
    ],
  },
  Recession: {
    'Model A': [
      { year: 2020, value: 75 },
      { year: 2021, value: 78 },
      { year: 2022, value: 80 },
    ],
    'Model B': [
      { year: 2020, value: 65 },
      { year: 2021, value: 70 },
      { year: 2022, value: 72 },
    ],
  },
};

// List of available stress tests for comparison
const stressTests: string[] = ['Baseline', 'Recession'];

export default function SustainabilityComparison() {
  // State to track the selected stress tests for two tables
  const [selectedTest1, setSelectedTest1] = useState<string>(stressTests[0]);
  const [selectedTest2, setSelectedTest2] = useState<string>(stressTests[0]);

  return (
    <div className="mx-auto max-w-screen-lg space-y-6 p-6">
      {/* Title of the page */}
      <h1 className="text-center text-2xl font-bold">Sustainability Model Comparison</h1>

      {/* Dropdowns for selecting stress tests, centered above tables */}
      <div className="grid grid-cols-2 justify-center gap-8">
        <div className="text-center">
          <label htmlFor="stressTest1" className="block text-sm md:text-base">First Stress Test:</label>
          <select
            id="stressTest1"
            className="mt-1 rounded-md border p-2"
            value={selectedTest1}
            onChange={(e) => setSelectedTest1(e.target.value)}
          >
            {stressTests.map((test) => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <label htmlFor="stressTest2" className="block text-sm md:text-base">Second Stress Test:</label>
          <select
            id="stressTest2"
            className="mt-1 rounded-md border p-2"
            value={selectedTest2}
            onChange={(e) => setSelectedTest2(e.target.value)}
          >
            {stressTests.map((test) => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tables displayed side by side */}
      <div className="grid grid-cols-2 gap-8">
        {[selectedTest1, selectedTest2].map((selectedTest, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="w-full overflow-auto rounded-lg border p-4 shadow-md">
            <h2 className="text-center text-xl font-semibold">
              {selectedTest}
              {' '}
              Comparison
            </h2>
            <table className="mt-2 w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Year</th>
                  {Object.keys(sustainabilityModels[selectedTest]).map((model) => (
                    <th key={model} className="border border-gray-300 p-2">{model}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sustainabilityModels[selectedTest]['Model A'].map((entry, i) => (
                  <tr key={entry.year}>
                    <td className="border border-gray-300 p-2">{entry.year}</td>
                    {Object.keys(sustainabilityModels[selectedTest]).map((model) => (
                      <td key={model} className="border border-gray-300 p-2">
                        {sustainabilityModels[selectedTest][model][i].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
