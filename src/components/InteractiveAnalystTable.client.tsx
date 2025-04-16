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
  const averageCache: { [key: string]: { [year: number]: number } } = {};
  const multiplierCache: { [key: string]: { [year: number]: number } } = {};

  function getDirectValue(key: string, year: number): number | undefined {
    if (financesByYear[year] && financesByYear[year][key] !== undefined) {
      return financesByYear[year][key];
    }
    return undefined;
  }

  function getValue(key: string, year: number): number {
    const direct = getDirectValue(key, year);
    if (direct !== undefined) return direct;

    if (baseFields.has(key)) {
      const config = forecastConfig[key] || {
        forecastType: 'average',
        multiplier: 1.5,
      };
      if (year <= yearsToDisplay[0]) return 0;
      return config.forecastType === 'average'
        ? computeAverage(key, year)
        : computeMultiplier(key, year, config.multiplier);
    }
    return computeComputedValue(key, year);
  }

  function computeAverage(key: string, year: number): number {
    if (!averageCache[key]) averageCache[key] = {};
    if (averageCache[key][year] !== undefined) return averageCache[key][year];
    if (year <= yearsToDisplay[0]) return 0;
    const val1 = getValue(key, year - 3);
    const val2 = getValue(key, year - 2);
    const val3 = getValue(key, year - 1);
    const avg = (val1 + val2 + val3) / 3;
    averageCache[key][year] = avg;
    return avg;
  }

  function computeMultiplier(
    key: string,
    year: number,
    multiplier: number,
  ): number {
    if (!multiplierCache[key]) multiplierCache[key] = {};
    if (multiplierCache[key][year] !== undefined) return multiplierCache[key][year];
    if (year <= yearsToDisplay[0]) return 0;
    const prev = getValue(key, year - 1);
    const result = prev * (1 + multiplier);
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
      case 'totalOperatingExpenses':
        return (
          getValue('salariesAndBenefits', year)
          + getValue('rentAndOverhead', year)
          + getValue('depreciationAndAmortization', year)
          + getValue('interest', year)
        );
      case 'operatingExpensesPercent':
        return getValue('revenue', year)
          ? (getValue('totalOperatingExpenses', year)
              / getValue('revenue', year))
              * 100
          : 0;
      case 'profitLossFromOperations':
        return (
          getValue('grossProfit', year)
          - getValue('totalOperatingExpenses', year)
        );
      case 'profitLossFromOperationsPercent':
        return getValue('revenue', year)
          ? (getValue('profitLossFromOperations', year)
              / getValue('revenue', year))
              * 100
          : 0;
      case 'totalOtherIncomeExpense':
        return (
          getValue('interestIncome', year)
          + getValue('interestExpense', year)
          + getValue('gainLossOnDisposalOfAssets', year)
          + getValue('otherIncomeExpense', year)
        );
      case 'totalOtherIncomeExpensePercent':
        return getValue('revenue', year)
          ? (getValue('totalOtherIncomeExpense', year)
              / getValue('revenue', year))
              * 100
          : 0;
      case 'incomeLossBeforeIncomeTaxes':
        return (
          getValue('profitLossFromOperations', year)
          + getValue('totalOtherIncomeExpense', year)
        );
      case 'preTaxIncomePercent':
        return getValue('revenue', year)
          ? (getValue('incomeLossBeforeIncomeTaxes', year)
              / getValue('revenue', year))
              * 100
          : 0;
      case 'totalCurrentAssets':
        return (
          getValue('cashEquivalents', year)
          + getValue('accountsReceivable', year)
          + getValue('inventory', year)
        );
      case 'totalLongTermAssets':
        return (
          getValue('propertyPlantAndEquipment', year)
          + getValue('investment', year)
        );
      case 'totalAssets':
        return (
          getValue('totalCurrentAssets', year)
          + getValue('totalLongTermAssets', year)
        );
      case 'totalCurrentLiabilities':
        return (
          getValue('accountsPayable', year)
          + getValue('debtService', year)
          + getValue('taxesPayable', year)
        );
      case 'totalLongTermLiabilities':
        return (
          getValue('debtServiceLongTerm', year) + getValue('loansPayable', year)
        );
      case 'totalLiabilities':
        return (
          getValue('totalCurrentLiabilities', year)
          + getValue('totalLongTermLiabilities', year)
        );
      case 'totalStockholdersEquity':
        return (
          getValue('equityCapital', year) + getValue('retainedEarnings', year)
        );
      case 'totalLiabilitiesAndEquity':
        return (
          getValue('totalLiabilities', year)
          + getValue('totalStockholdersEquity', year)
        );
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
            <th scope="col" className="p-3">
              Financial Metrics
            </th>
            {yearsToDisplay.map((year) => (
              <th key={year} scope="col" className="px-3 py-1">
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
                    className="whitespace-nowrap px-3 py-2 font-medium text-gray-900 dark:text-white"
                    aria-label="extra empty cells"
                  />
                  {Array.from({ length: yearsToDisplay.length - 1 }).map(
                    (_, idx) => (
                      <td
                        aria-hidden="true"
                        key={`${rowKey}-empty-${idx}`}
                        className="px-3 py-2"
                      />
                    ),
                  )}
                </tr>
              );
            }
            if (row.section) {
              return (
                <tr key={rowKey} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    colSpan={yearsToDisplay.length + 1}
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
                {yearsToDisplay.map((year) => {
                  const cellValue = row.key ? getValue(row.key, year) : 0;
                  return (
                    <td key={`${rowKey}-${year}`} className="px-3 py-2">
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
