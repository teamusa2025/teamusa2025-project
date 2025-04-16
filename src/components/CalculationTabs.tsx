'use client';

import React, { useState } from 'react';

interface CalculationTabsProps {
  scenarioEffects: number[];
  residualEffects: number[];
  scenarioId: number;
}

const CalculationTabs: React.FC<CalculationTabsProps> = ({
  scenarioEffects,
  residualEffects,
  scenarioId,
}) => {
  const [activeTab, setActiveTab] = useState<'calculations' | 'formulas' | 'table'>('calculations');

  return (
    <div className="mt-8" role="tablist" aria-orientation="horizontal">
      <div className="flex border-b">
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          role="tab"
          aria-selected={activeTab === 'calculations'}
          className={`px-4 py-2 ${
            activeTab === 'calculations'
              ? 'border-b-2 border-blue-500 font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('calculations')}
          id="tab-calculations"
          aria-controls="tabpanel-calculations"
        >
          Scenario Effect
          {' '}
          {scenarioId}
          {' '}
          Results
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          role="tab"
          aria-selected={activeTab === 'formulas'}
          className={`px-4 py-2 ${
            activeTab === 'formulas'
              ? 'border-b-2 border-blue-500 font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('formulas')}
          id="tab-formulas"
          aria-controls="tabpanel-formulas"
        >
          Formulas Used
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          role="tab"
          aria-selected={activeTab === 'table'}
          className={`px-4 py-2 ${
            activeTab === 'table'
              ? 'border-b-2 border-blue-500 font-bold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('table')}
          id="tab-table"
          aria-controls="tabpanel-table"
        >
          Scenario 1 Table
        </button>
      </div>

      {/* Calculations Tab */}
      <div
        role="tabpanel"
        id="tabpanel-calculations"
        aria-labelledby="tab-calculations"
        className="pt-4"
        hidden={activeTab !== 'calculations'}
      >
        {activeTab === 'calculations' && (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-green-500 text-xs uppercase text-white">
                <tr>
                  <th className="px-6 py-3">Year</th>
                  <th className="px-6 py-3">
                    Scenario Effect
                    {' '}
                    {scenarioId}
                  </th>
                  <th className="px-6 py-3">
                    Residual Effect
                    {scenarioId}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scenarioEffects.map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={index} className="border-b border-gray-200 bg-green-100 hover:bg-green-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      $
                      {scenarioEffects[index]?.toFixed(2) || '0.00'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      $
                      {residualEffects[index]?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Formulas Tab */}
      <div
        role="tabpanel"
        id="tabpanel-formulas"
        aria-labelledby="tab-formulas"
        className="pt-4"
        hidden={activeTab !== 'formulas'}
      >
        {activeTab === 'formulas' && (
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-bold">Calculation Formulas</h3>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                <strong>
                  Scenario Effect
                  {scenarioId}
                  :
                </strong>
                <span className="ml-2">
                  Scenario1.InterestPlusBalance + Scenario2.InterestPlusBalance
                </span>
              </li>
              <li>
                <strong>
                  Residual Effect
                  {scenarioId}
                  :
                </strong>
                <span className="ml-2">
                  Σ(ScenarioEffect
                  <sub>n</sub>
                  {' '}
                  × (1 + 6.02%)
                  <sup>(year - n + 1)</sup>
                  {' '}
                  - ScenarioEffect
                  <sub>n</sub>
                  )
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Scenario 1 Table Tab */}
      <div
        role="tabpanel"
        id="tabpanel-table"
        aria-labelledby="tab-table"
        className="pt-4"
        hidden={activeTab !== 'table'}
      >
        {activeTab === 'table' && (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-600 text-xs uppercase text-white">
                <tr>
                  <th className="px-6 py-3">Year</th>
                  <th className="px-6 py-3">ScenarioEffect1</th>
                  <th className="px-6 py-3">ResidualEffect1</th>
                </tr>
              </thead>
              <tbody>
                {scenarioEffects.map((effect, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={idx} className="border-b border-gray-200 bg-blue-100 hover:bg-blue-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{idx + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      $
                      {effect.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      $
                      {residualEffects[idx]?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationTabs;
