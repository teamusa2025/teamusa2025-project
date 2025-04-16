'use client';

import React, { useState, useEffect, useMemo } from 'react';

const ScenarioTwo: React.FC = () => {
  const [enableScenarioEffect2, setEnableScenarioEffect2] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('scenario2-enableScenarioEffect2') === 'true';
  });

  const [enableResidualEffect2, setEnableResidualEffect2] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('scenario2-enableResidualEffect2') === 'true';
  });

  const [percentage2, setPercentage2] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem('scenario2-percentage2')) || 0;
  });

  // eslint-disable-next-line max-len
  const [projections2, setProjections2] = useState<Array<{ fiscalYear: number, totalRevenue: number, decreaseInRevenue: number }>>([]);

  const initialRevenues2 = [
    153034, 155329, 157659, 160024, 162424, 164861,
    167334, 169844, 172391, 174977, 177602, 180266,
  ];

  useEffect(() => {
    sessionStorage.setItem('scenario2-enableScenarioEffect2', enableScenarioEffect2.toString());
  }, [enableScenarioEffect2]);

  useEffect(() => {
    sessionStorage.setItem('scenario2-enableResidualEffect2', enableResidualEffect2.toString());
  }, [enableResidualEffect2]);

  useEffect(() => {
    sessionStorage.setItem('scenario2-percentage2', percentage2.toString());
  }, [percentage2]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const newProjections = initialRevenues2.map((revenue, index) => {
      const fiscalYear = currentYear + index;
      const decreaseInRevenue = revenue * (percentage2 / 100);
      return {
        fiscalYear,
        totalRevenue: revenue,
        decreaseInRevenue,
      };
    });
    setProjections2(newProjections);
  }, [initialRevenues2, percentage2]);

  // Calculate ScenarioEffect2 and ResidualEffect2
  const { scenarioEffect2, residualEffect2 } = useMemo(() => {
    // First 12 values of decreaseInRevenue
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const scenarioEffect2 = projections2.slice(0, 12).map(p => p.decreaseInRevenue);

    // Residual effect calculation
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const residualEffect2 = scenarioEffect2.map((_, yearIndex) => {
      let total = 0;
      for (let i = 0; i <= yearIndex; i++) {
        const exponent = (yearIndex + 1) - i;
        const base = scenarioEffect2[i];
        total += base * 1.0602 ** exponent - base;
      }
      return Number(total.toFixed(2));
    });

    return { scenarioEffect2, residualEffect2 };
  }, [projections2]);

  useEffect(() => {
    if (typeof window !== 'undefined' && scenarioEffect2.length > 0) {
      sessionStorage.setItem('scenarioEffect2', JSON.stringify(scenarioEffect2));
      sessionStorage.setItem('residualEffect2', JSON.stringify(residualEffect2));
    }
  }, [scenarioEffect2, residualEffect2]);

  const handlePercentageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage2(Number(e.target.value));
  };

  return (
    <div className=" mx-auto max-w-4xl">
      {/* Header */}
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #2</h1>
      <h2 className="mb-8 text-center text-2xl">60% sustained drop in return rate of Investment</h2>
      <hr className="solid" />

      {/* Toggle Switches */}
      <div className="mb-8 space-y-4">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={enableScenarioEffect2}
            onChange={(e) => setEnableScenarioEffect2(e.target.checked)}
            className="form-checkbox size-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Enable Scenario Effect</span>
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={enableResidualEffect2}
            onChange={(e) => setEnableResidualEffect2(e.target.checked)}
            className="form-checkbox size-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Enable Residual Effects</span>
        </label>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            % Decrease in Revenues
          </label>
          <input
            aria-label="Decrease in Revenues"
            className="mb-3 ml-1 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
            focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="number"
            value={percentage2}
            onChange={handlePercentageChange2}
            placeholder="Enter percentage"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-500 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">Fiscal Year</th>
                <th scope="col" className="px-6 py-3">Total Revenues</th>
                <th scope="col" className="px-6 py-3">Decreases in Revenues</th>
              </tr>
            </thead>
            <tbody>
              {projections2.map((projection) => (
                <tr
                  key={projection.fiscalYear}
                  className="border-b border-gray-200 bg-blue-100 hover:bg-blue-200"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {projection.fiscalYear}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    $
                    {projection.totalRevenue.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    $
                    {projection.decreaseInRevenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScenarioTwo;
