/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useEffect, useMemo } from 'react';

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

interface AuditorTableProps {
  financesByYear: FinancesByYear;
  rows: Row[];
  yearsToDisplay: number[];
}

let emptyCellCounter = 0;
const extraEmptyCells = (count: number): JSX.Element[] =>
  Array.from({ length: count }, () => {
    const key = `empty-cell-${emptyCellCounter++}`;
    return <td key={key} className="px-4 py-2" aria-label="extra empty cells" />;
  });

export default function AuditorTable({ financesByYear, rows, yearsToDisplay }: AuditorTableProps): JSX.Element {
  function formatValue(formatType: 'number' | 'percentage' | undefined, value: number): string {
    if (formatType === 'number') {
      return Math.round(value).toLocaleString();
    }
    if (formatType === 'percentage') {
      return `${parseFloat(value.toFixed(1))}%`;
    }
    return String(value);
  }

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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-base">
      <table className="w-full text-left text-base text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-50 text-sm uppercase text-gray-800 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-2">
              Financial Metrics
            </th>
            {yearsToDisplay.map((year) => (
              <th key={year} scope="col" className="px-4 py-2">
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
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                    aria-label="extra empty cells"
                  />
                  {extraEmptyCells(yearsToDisplay.length)}
                </tr>
              );
            }
            if (row.section) {
              return (
                <tr key={rowKey} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    colSpan={yearsToDisplay.length + 1}
                    className="px-4 py-2 font-semibold text-gray-900 dark:text-white"
                  >
                    {row.section}
                  </th>
                </tr>
              );
            }
            return (
              <tr key={rowKey} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                >
                  {row.label}
                </th>
                {yearsToDisplay.map((year) => {
                  const value = financesByYear[year][row.key!];
                  return (
                    <td key={`${rowKey}-${year}`} className="px-4 py-2">
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
  );
}
