/* eslint-disable tailwindcss/no-arbitrary-value */

'use client';

import { useState, ChangeEvent } from 'react';

export type ForecastType = 'average' | 'multiplier';
export type RowConfig = { forecastType: ForecastType; multiplier: number };
export type FCModalProps = {
  initialConfig: Record<string, RowConfig>;
  onSave: (newConfig: Record<string, RowConfig>) => void;
  onClose: () => void;
};

const rowsToEdit = [
  'Revenue',
  'Cost of Contracting',
  'Overhead',
  'Salaries and benefits',
  'Rent and Overhead',
  'Depreciation and Amortization',
  'Interest',
  'Interest income',
  'Interest expense',
  'Gain (loss) on disposal of assets',
  'Other income (expense)',
  'Income taxes',
  'Cash and cash equivalents',
  'Accounts receivable',
  'Inventory',
  'Property, plant, and equipment',
  'Investment',
  'Accounts payable',
  'Debt service',
  'Taxes payable',
  'Loans payable',
  'Equity Capital',
  'Retained earnings',
];

export default function FCModal({ initialConfig, onSave, onClose }: FCModalProps): JSX.Element {
  const [forecastConfig, setForecastConfig] = useState<Record<string, RowConfig>>(() => {
    const initial: Record<string, RowConfig> = {};
    rowsToEdit.forEach((row) => {
      const key = row
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .split(' ')
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
        .join('');
      initial[key] = initialConfig[key] || { forecastType: 'average', multiplier: 1.5 };
    });
    return initial;
  });

  const handleForecastTypeChange = (row: string, e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ForecastType;
    setForecastConfig(prev => ({
      ...prev,
      [row]: { ...prev[row], forecastType: newType },
    }));
  };

  const handleMultiplierChange = (row: string, e: ChangeEvent<HTMLInputElement>) => {
    const newMultiplier = parseFloat(e.target.value);
    setForecastConfig(prev => ({
      ...prev,
      [row]: { ...prev[row], multiplier: newMultiplier },
    }));
  };

  const handleSave = () => {
    onSave(forecastConfig);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 p-6">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Edit Forecast Settings
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {rowsToEdit.map((displayName) => {
            const key = displayName
              .replace(/[^a-zA-Z0-9 ]/g, '')
              .split(' ')
              .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
              .join('');
            return (
              <div key={key} className="flex flex-col space-y-2 border-b border-gray-200 px-2 pb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {displayName}
                </span>
                <select
                  value={forecastConfig[key].forecastType}
                  onChange={(e) => handleForecastTypeChange(key, e)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-500
                  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="average">AVERAGE</option>
                  <option value="multiplier">MULTIPLIER</option>
                </select>
                {forecastConfig[key].forecastType === 'multiplier' && (
                  <input
                    type="number"
                    step="0.1"
                    value={forecastConfig[key].multiplier}
                    onChange={(e) => handleMultiplierChange(key, e)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Multiplier"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700
            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
            dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
