/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use client';

export type RowsConfig = {
  label?: string;
  key?: string;
  formatType?: 'number' | 'percentage';
  spacer?: boolean;
  section?: string;
};

export type ForecastConfig = Record<
string,
{ forecastType: 'average' | 'multiplier'; multiplier: number }
>;

interface FinancesByYear {
  [year: number]: {
    [key: string]: number;
  };
}

interface InteractiveAnalystTableProps {
  financesByYear: FinancesByYear;
  rows: RowsConfig[];
  yearsToDisplay: number[];
  forecastConfig: ForecastConfig;
}

const baseFields = new Set([
  'revenue',
  'costOfContracting',
  'overhead',
  'salariesAndBenefits',
  'rentAndOverhead',
  'depreciationAndAmortization',
  'interest',
  'interestIncome',
  'interestExpense',
  'gainLossOnDisposalOfAssets',
  'otherIncomeExpense',
  'incomeTaxes',
  'cashEquivalents',
  'accountsReceivable',
  'inventory',
  'propertyPlantAndEquipment',
  'investment',
  'accountsPayable',
  'debtService',
  'taxesPayable',
  'loansPayable',
  'equityCapital',
  'retainedEarnings',
]);

export default function InteractiveAnalystTable({
  financesByYear,
  rows,
  yearsToDisplay,
  forecastConfig,
}: InteractiveAnalystTableProps): JSX.Element {
  const averageCache: Record<string, Record<number, number>> = {};
  const multiplierCache: Record<string, Record<number, number>> = {};

  // Split years into actual vs. forecast
  const ACTUAL_COUNT = 3;
  const actualYears = yearsToDisplay.slice(0, ACTUAL_COUNT);
  const forecastYears = yearsToDisplay.slice(ACTUAL_COUNT);
  const allYears = [...actualYears, ...forecastYears];

  // Hide specific rows by label or section
  const hidden = new Set([
    'Cost of Goods Sold',
    'Operating Expenses',
    'Other Income Expenses',
    'Assets',
    'Current Assets',
    'Long Term Assets',
    'Liabilities and Equity',
    'Current Liabilities (due within 1 year)',
    'Long Term Liabilities (Due after one year)',
    "Stockholder's Equity",
  ]);
  const visibleRows = rows.filter((row) => {
    const lab = row.label?.replace(/:$/, '');
    const sec = row.section?.replace(/:$/, '');
    return !(lab && hidden.has(lab)) && !(sec && hidden.has(sec));
  });

  function getDirectValue(key: string, year: number): number | undefined {
    return financesByYear[year]?.[key];
  }

  function getValue(key: string, year: number): number {
    const direct = getDirectValue(key, year);
    if (direct !== undefined) {
      return direct;
    }

    if (baseFields.has(key)) {
      const { forecastType, multiplier } = forecastConfig[key] || {
        forecastType: 'average',
        multiplier: 0,
      };
      if (forecastType === 'average') {
        return computeAverage(key, year);
      }
      return computeMultiplier(key, year, multiplier);
    }

    return computeComputedValue(key, year);
  }

  function computeAverage(key: string, year: number): number {
    if (!averageCache[key]) averageCache[key] = {};
    if (averageCache[key][year] !== undefined) return averageCache[key][year];
    const prevYears = [year - 3, year - 2, year - 1];
    const sum = prevYears.reduce((acc, y) => acc + getValue(key, y), 0);
    const avg = sum / 3;
    averageCache[key][year] = avg;
    return avg;
  }

  function computeMultiplier(
    key: string,
    year: number,
    multiplierPercent: number,
  ): number {
    if (!multiplierCache[key]) multiplierCache[key] = {};
    if (multiplierCache[key][year] !== undefined) return multiplierCache[key][year];
    const prev = getValue(key, year - 1);
    const result = prev + prev * (multiplierPercent / 100);
    multiplierCache[key][year] = result;
    return result;
  }

  function computeComputedValue(key: string, year: number): number {
    switch (key) {
      case 'netSales':
        return getValue('revenue', year);
      case 'costOfGoodsSold':
        return getValue('costOfContracting', year) + getValue('overhead', year);
      case 'grossProfit':
        return getValue('revenue', year) - getValue('costOfGoodsSold', year);
      case 'grossMarginPercent':
        return getValue('revenue', year)
          ? (getValue('grossProfit', year) / getValue('revenue', year)) * 100
          : 0;
      // ... other computed cases ...
      default:
        return 0;
    }
  }

  let spacerRowCounter = 0;
  function getRowKey(row: RowsConfig): string {
    if (row.spacer) {
      spacerRowCounter++;
      return `spacer-${row.section || row.label || 'empty'}-${spacerRowCounter}`;
    }
    if (row.section) return `section-${row.section}`;
    if (row.label) return `row-${row.label}`;
    if (row.key) return `row-${row.key}`;
    return 'row-unknown';
  }

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

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-3" />
            <th
              colSpan={actualYears.length}
              className="px-3 py-1 text-center font-semibold"
            >
              Actual Data
            </th>
            <th
              colSpan={forecastYears.length}
              className="border-l border-gray-300 px-3 py-1 text-center font-semibold"
            >
              Forecast Data
            </th>
          </tr>
          <tr>
            <th scope="col" className="p-3">
              Financial Metrics
            </th>
            {actualYears.map((yr) => (
              <th key={yr} scope="col" className="px-3 py-1">
                {yr}
              </th>
            ))}
            {forecastYears.map((yr, idx) => (
              <th
                key={yr}
                scope="col"
                className={`px-3 py-1 ${idx === 0 ? 'border-l-2 border-gray-300' : ''}`}
              >
                {yr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => {
            const rowKey = getRowKey(row);
            if (row.spacer) {
              return (
                <tr key={rowKey} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-3 py-2 font-medium text-gray-900 dark:text-white"
                    aria-label="extra empty cells"
                  />
                  {allYears.map((_, idx) => (
                    <td
                      aria-hidden="true"
                      key={`${rowKey}-empty-${idx}`}
                      className={`px-3 py-2 ${idx === ACTUAL_COUNT ? 'border-l-2 border-gray-300' : ''}`}
                    />
                  ))}
                </tr>
              );
            }
            if (row.section) {
              return (
                <tr key={rowKey} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    colSpan={allYears.length + 1}
                    className="whitespace-nowrap p-3 font-bold text-gray-900 dark:text-white"
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
                  className="whitespace-nowrap p-3 font-medium text-gray-900 dark:text-white"
                >
                  {row.label}
                </th>
                {allYears.map((year, idx) => {
                  const cellValue = row.key ? getValue(row.key, year) : 0;
                  return (
                    <td
                      key={`${rowKey}-${year}`}
                      className={`px-3 py-2 ${idx === ACTUAL_COUNT ? 'border-l-2 border-gray-300' : ''}`}
                    >
                      {formatValue(row.formatType, cellValue)}
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
