/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { ChangeEvent, useState } from 'react';
import { saveAuditedFinances } from '@/lib/dbActions';
import { useForm } from 'react-hook-form';

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
  added?: boolean;
}

interface AuditorTableProps {
  financesByYear: FinancesByYear;
  rows: Row[];
}

export default function EditAuditorTable({
  financesByYear,
  rows,
}: AuditorTableProps): JSX.Element {
  // Local function to format values based on formatType.
  const [currentYear, setYear] = useState<'2022' | '2023' | '2024'>('2022');
  const { handleSubmit } = useForm();
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

  // Used when Changing Years
  // function changeYear(rowKey: string): number {
  //  return financesByYear[currentYear][rowKey];
  // }

  function yearSelect(e: ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value as '2022' | '2023' | '2024');
  }

  const onSubmit = async (data: any) => {
    const formattedData = {
      year: currentYear,
      ...data,
    };
    await saveAuditedFinances(formattedData);
  };

  return (
    <>
      <div className="my-4" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <select
          value={currentYear}
          onChange={yearSelect}
          className="block w-full appearance-none rounded border px-2 py-1 pr-10"
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Financial Metrics
              </th>
              <th key={currentYear} scope="col" className="px-6 py-3">
                {currentYear}
              </th>
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
                  </tr>
                );
              }
              if (row.section) {
                return (
                  <tr key={rowKey} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      colSpan={currentYear.length + 1}
                      className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white"
                    >
                      {row.section}
                    </th>
                  </tr>
                );
              }
              if (row.added) {
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
                    <td key={`${rowKey}-${currentYear}`} className="px-6 py-4">
                      {formatValue(row.formatType, financesByYear[currentYear][row.key!])}
                    </td>
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
                  <td key={`${rowKey}-${currentYear}`} className="px-6 py-4">
                    <form className="mx-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-5">
                        {/* eslint-disable-next-line max-len */}
                        <label htmlFor="number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" />
                        <input
                          type="number"
                          id="number"
                          className="block w-full rounded-lg border p-2.5 text-gray-900"
                          placeholder={formatValue(row.formatType, financesByYear[currentYear][row.key!])}
                          required
                        />
                      </div>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Save</button>
      </div>
    </>
  );
}
