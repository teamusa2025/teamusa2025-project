'use client';

import React, { useState, useEffect } from 'react';

const ScenarioTwo: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [projections, setProjections] = useState<Array<{ fiscalYear: number, totalRevenue: number,
    decreaseInRevenue: number }>>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialRevenues = [
    153034, 155329, 157659, 160024, 162424, 164861,
    167334, 169844, 172391, 174977, 177602, 180266,
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const newProjections = initialRevenues.map((revenue, index) => {
      const fiscalYear = currentYear + index;
      const decreaseInRevenue = revenue * (percentage / 100);
      return {
        fiscalYear,
        totalRevenue: revenue,
        decreaseInRevenue,
      };
    });
    setProjections(newProjections);
  }, [initialRevenues, percentage]);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(Number(e.target.value));
  };

  return (
    <div className=" mx-auto mt-6 max-w-4xl p-6">
      {/* Header */}
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #2</h1>
      <h2 className="mb-8 text-center text-2xl">60% sustained drop in return rate of Investment</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            % Decrease in Revenues
          </label>
          <input
            aria-label="Username"
            className="mb-3 ml-1 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
            focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="number"
            value={percentage}
            onChange={handlePercentageChange}
            placeholder="Enter percentage"
          />
        </div>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Fiscal Year</th>
              <th scope="col" className="px-6 py-3">Total Revenues</th>
              <th scope="col" className="px-6 py-3">Decreases in Revenues</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((projection) => (
              <tr
                key={projection.fiscalYear}
                className="border-b border-gray-200 bg-white hover:bg-gray-50
              dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {projection.fiscalYear}
                </td>
                <td className="whitespace-nowrap px-6 py-1 font-medium text-gray-900 dark:text-white">
                  $
                  {projection.totalRevenue.toLocaleString()}
                </td>
                <td className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800
                dark:hover:bg-gray-600"
                >
                  $
                  {projection.decreaseInRevenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioTwo;
