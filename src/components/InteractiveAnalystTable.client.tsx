'use client';
import { useState } from 'react';

// Helper function to generate empty cells (for spacer rows)
const extraEmptyCells = (count: number) =>
  [...Array(count)].map((_, index) => <td key={index} className="px-6 py-4" />);

export default function InteractiveAnalystTable({
  financesByYear,
  rows,
  yearsToDisplay,
}) {
  const [calcMode, setCalcMode] = useState('average');
  const [multiplier, setMultiplier] = useState(1.5);

  // Create memo objects for each calculation method.
  const averageMemo = {};
  const multiplierMemo = {};

  // Compute using the average method: average of the three previous years.
  function computeAverage(rowKey, year) {
    averageMemo[rowKey] = averageMemo[rowKey] || {};
    if (averageMemo[rowKey][year] !== undefined)
      return averageMemo[rowKey][year];
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
  function computeMultiplier(rowKey, year, multiplier) {
    multiplierMemo[rowKey] = multiplierMemo[rowKey] || {};
    if (multiplierMemo[rowKey][year] !== undefined)
      return multiplierMemo[rowKey][year];
    if (financesByYear[year] && financesByYear[year][rowKey] !== undefined) {
      multiplierMemo[rowKey][year] = financesByYear[year][rowKey];
      return financesByYear[year][rowKey];
    }
    if (year <= 2022) return 0;
    // Use the previously computed multiplier value
    const lastYearVal = computeMultiplier(rowKey, year - 1, multiplier);
    const result = lastYearVal * (1 + multiplier / 100);
    multiplierMemo[rowKey][year] = result;
    return result;
  }

  // Local function to format values based on formatType.
  function formatValue(formatType, value) {
    if (formatType === 'number') {
      return Math.round(value).toLocaleString();
    }
    if (formatType === 'percentage') {
      return `${parseFloat(value.toFixed(1))}%`;
    }
    return value;
  }

  // When the calculation mode changes, clear the memo caches so that new values are computed.
  function handleModeChange(e) {
    setCalcMode(e.target.value);
    // Clear memos by simply reassigning empty objects.
    // (In a real app, you might use useMemo/useCallback to better handle this.)
    Object.keys(averageMemo).forEach((key) => delete averageMemo[key]);
    Object.keys(multiplierMemo).forEach((key) => delete multiplierMemo[key]);
  }

  return (
    <>
      <div className="my-4">
        <label className="mr-2">Forecast Type:</label>
        <select
          value={calcMode}
          onChange={handleModeChange}
          className="border rounded px-2 py-1 mr-4 w-36"
        >
          <option value="average">Average</option>
          <option value="multiplier">Multiplier</option>
        </select>
        {calcMode === 'multiplier' && (
          <>
            <label className="mr-2">% Multiplier:</label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className="border rounded px-2 py-1 w-20"
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
            {rows.map((row, index) => {
              if (row.spacer) {
                return (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    />
                    {extraEmptyCells(yearsToDisplay.length - 1)}
                  </tr>
                );
              }
              if (row.section) {
                return (
                  <tr key={index} className="bg-white dark:bg-gray-800">
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
                  key={index}
                  className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {row.label}
                  </th>
                  {yearsToDisplay.map((year) => {
                    const hasDirectValue =
                      financesByYear[year] &&
                      financesByYear[year][row.key] !== undefined;
                    let value;
                    if (hasDirectValue) {
                      value = financesByYear[year][row.key];
                    } else {
                      if (calcMode === 'average') {
                        value = computeAverage(row.key, year);
                      } else {
                        value = computeMultiplier(row.key, year, multiplier);
                      }
                    }
                    return (
                      <td key={year} className="px-6 py-4">
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
