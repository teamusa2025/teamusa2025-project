/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, ChangeEvent } from 'react';

interface FinancesByYear {
  [year: number]: {
    [rowKey: string]: number;
  };
}

interface Row {
  spacer?: boolean;
  section?: string;
  label?: string;
  key?: string;
  formatType?: 'number' | 'percentage';
}

interface InteractiveAnalystTableProps {
  financesByYear: FinancesByYear;
  rows: Row[];
  yearsToDisplay: number[];
}

// Helper function to generate empty cells (for spacer rows)
let emptyCellCounter = 0;
const extraEmptyCells = (count: number): JSX.Element[] => Array.from({ length: count }, () => {
  const key = `empty-cell-${emptyCellCounter++}`;
  return (
    <td key={key} className="px-6 py-4" aria-label="extra empty cells" />
  );
});

export default function InteractiveAnalystTable({
  financesByYear,
  rows,
  yearsToDisplay,
}: InteractiveAnalystTableProps): JSX.Element {
  const [calcMode, setCalcMode] = useState<'average' | 'multiplier'>('average');
  const [multiplierPercent, setMultiplierPercent] = useState<number>(1.5);

  // Create memo objects for each calculation method.
  const averageMemo: { [rowKey: string]: { [year: number]: number } } = {};
  const multiplierMemo: { [rowKey: string]: { [year: number]: number } } = {};

  // Compute using the average method: average of the three previous years.
  function computeAverage(rowKey: string, year: number): number {
    averageMemo[rowKey] = averageMemo[rowKey] || {};
    if (averageMemo[rowKey][year] !== undefined) return averageMemo[rowKey][year];
    if (financesByYear[year] && financesByYear[year][rowKey] !== undefined) {
      averageMemo[rowKey][year] = financesByYear[year][rowKey];
      return financesByYear[year][rowKey];
    }
    if (year < 2022) return 0;
    const val1 = computeAverage(rowKey, year - 3);
    const val2 = computeAverage(rowKey, year - 2);
    const val3 = computeAverage(rowKey, year - 1);
    const avg = (val1 + val2 + val3) / 3;
    averageMemo[rowKey][year] = avg;
    return avg;
  }

  // Compute using the multiplier method:
  // For a given metric, if no direct value exists for the current year,
  // use the previous year's computed value and increase it by multiplier%.
  function computeMultiplier(
    rowKey: string,
    year: number,
    multiplier: number,
  ): number {
    multiplierMemo[rowKey] = multiplierMemo[rowKey] || {};
    if (multiplierMemo[rowKey][year] !== undefined) return multiplierMemo[rowKey][year];
    if (financesByYear[year] && financesByYear[year][rowKey] !== undefined) {
      multiplierMemo[rowKey][year] = financesByYear[year][rowKey];
      return financesByYear[year][rowKey];
    }
    if (year <= 2022) return 0;
    const lastYearVal = computeMultiplier(rowKey, year - 1, multiplier);
    const result = lastYearVal * (1 + multiplier / 100);
    multiplierMemo[rowKey][year] = result;
    return result;
  }

  // Local function to format values based on formatType.
  function formatValue(
    formatType: 'number' | 'percentage' | undefined,
    value: number,
  ): string {
    if (formatType === 'number') {
      return Math.round(value).toLocaleString();
    }
    if (formatType === 'percentage') {
      return `${parseFloat(value.toFixed(1))}%`;
    }
    return String(value);
  }

  // When the calculation mode changes, clear the memo caches so that new values are computed.
  function handleModeChange(e: ChangeEvent<HTMLSelectElement>): void {
    setCalcMode(e.target.value as 'average' | 'multiplier');
    // Clear memos by reassigning empty objects.
    Object.keys(averageMemo).forEach((key) => (averageMemo[key] = {}));
    Object.keys(multiplierMemo).forEach((key) => (multiplierMemo[key] = {}));
  }

  // Use a counter to generate unique keys for spacer rows.
  let spacerRowCounter = 0;
  function getRowKey(row: Row): string {
    if (row.spacer) {
      spacerRowCounter++;
      return `spacer-${row.section || row.label || 'empty'}-${spacerRowCounter}`;
    }
    if (row.section) return `section-${row.section}`;
    if (row.label) return `row-${row.label}`;
    if (row.key) return `row-${row.key}`;
    return 'row-unknown';
  }

  return (
    <>
      <div className="my-4">
        <label className="mr-2">Forecast Type:</label>
        <div className="relative mr-4 inline-block w-36">
          <select
            value={calcMode}
            onChange={handleModeChange}
            className="block w-full appearance-none rounded border px-2 py-1 pr-10"
          >
            <option value="average">Average</option>
            <option value="multiplier">Multiplier</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="size-4 fill-current" viewBox="0 0 20 20">
              <path d="M7.293 9.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414L10
              13.414l-2.707-2.707a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
        {calcMode === 'multiplier' && (
          <>
            <label className="mr-2">% Multiplier:</label>
            <input
              type="number"
              value={multiplierPercent}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMultiplierPercent(parseFloat(e.target.value))}
              className="w-20 rounded border px-2 py-1"
            />
          </>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Financial Metrics
              </th>
              {yearsToDisplay.map((year) => (
                <th key={year} scope="col" className="px-6 py-3">
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rowKey = getRowKey(row);
              if (row.spacer) {
                return (
                  <tr key={rowKey} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      aria-label="extra empty cells"
                    />
                    {extraEmptyCells(yearsToDisplay.length - 1)}
                  </tr>
                );
              }
              if (row.section) {
                return (
                  <tr key={rowKey} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      colSpan={yearsToDisplay.length + 1}
                      className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white"
                    >
                      {row.section}
                    </th>
                  </tr>
                );
              }
              return (
                <tr
                  key={rowKey}
                  className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {row.label}
                  </th>
                  {yearsToDisplay.map((year) => {
                    const hasDirectValue = financesByYear[year]
                      && financesByYear[year][row.key!] !== undefined;
                    let value: number;
                    if (hasDirectValue) {
                      value = financesByYear[year][row.key!];
                    } else if (calcMode === 'average') {
                      value = computeAverage(row.key!, year);
                    } else {
                      value = computeMultiplier(
                        row.key!,
                        year,
                        multiplierPercent,
                      );
                    }
                    return (
                      <td key={`${rowKey}-${year}`} className="px-6 py-4">
                        {formatValue(row.formatType, value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
