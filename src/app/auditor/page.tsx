import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';

// Helper function to generate empty cells (for spacer rows)
const extraEmptyCells = (count: number) =>
  [...Array(count)].map((_, index) => <td key={index} className="px-6 py-4" />);

// Format a regular number as a whole integer.
const formatNumber = (v: number) =>
  v !== undefined && v !== null ? Math.round(v).toLocaleString() : '-';

// Format a percentage value rounded to one decimal place.
const formatPercentage = (v: number) =>
  v !== undefined && v !== null ? `${parseFloat(v.toFixed(1))}%` : '-';

// Auditor page as a server component
export default async function Auditor() {
  // Fetch audited finances directly using Prisma.
  const finances = await prisma.auditedFinances.findMany();
  // Sort the results by year (ascending)
  finances.sort((a, b) => a.year - b.year);

  // Define the years we want to display (2022 through 2036)
  const yearsToDisplay = [
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
    2034, 2035, 2036,
  ];

  // Create a lookup object so we can easily access finance data by year.
  const financesByYear: { [year: number]: any } = {};
  finances.forEach((item) => {
    financesByYear[item.year] = item;
  });

  // Create a memoization object for computed values for each metric.
  const memo: Record<string, Record<number, number>> = {};

  // Helper function: for a given metric (rowKey) and year,
  // if a direct value exists in the DB, use it; otherwise compute it
  // as the average of the three preceding years.
  function compute(rowKey: string, year: number): number {
    if (memo[rowKey] && memo[rowKey][year] !== undefined) {
      return memo[rowKey][year];
    }
    if (financesByYear[year] && financesByYear[year][rowKey] !== undefined) {
      const val = financesByYear[year][rowKey];
      memo[rowKey] = memo[rowKey] || {};
      memo[rowKey][year] = val;
      return val;
    }
    // For years before 2022, return 0 (or adjust as needed)
    if (year < 2022) return 0;
    // Calculate the average of the previous three years.
    const val1 = compute(rowKey, year - 3);
    const val2 = compute(rowKey, year - 2);
    const val3 = compute(rowKey, year - 1);
    const avg = (val1 + val2 + val3) / 3;
    memo[rowKey] = memo[rowKey] || {};
    memo[rowKey][year] = avg;
    return avg;
  }

  // Define the rows for the table.
  const rows = [
    { label: 'Revenue', key: 'revenue', format: formatNumber },
    { label: 'Net Sales', key: 'netSales', format: formatNumber },
    { spacer: true },
    { section: 'Cost of Goods Sold:' },
    {
      label: 'Cost of Contracting',
      key: 'costOfContracting',
      format: formatNumber,
    },
    { label: 'Overhead', key: 'overhead', format: formatNumber },
    {
      label: 'Cost of Goods Sold',
      key: 'costOfGoodsSold',
      format: formatNumber,
    },
    { label: 'Gross Profit', key: 'grossProfit', format: formatNumber },
    {
      label: 'Gross Margin',
      key: 'grossMarginPercent',
      format: formatPercentage,
    },
    { spacer: true },
    { section: 'Operating Expenses:' },
    {
      label: 'Salaries and Benefits',
      key: 'salariesAndBenefits',
      format: formatNumber,
    },
    {
      label: 'Rent and Overhead',
      key: 'rentAndOverhead',
      format: formatNumber,
    },
    {
      label: 'Depreciation and Amortization',
      key: 'depreciationAndAmortization',
      format: formatNumber,
    },
    { label: 'Interest', key: 'interest', format: formatNumber },
    {
      label: 'Total Operating Expenses',
      key: 'totalOperatingExpenses',
      format: formatNumber,
    },
    {
      label: 'Operating Expenses%',
      key: 'operatingExpensesPercent',
      format: formatPercentage,
    },
    { spacer: true },
    {
      label: 'Profit (loss) from operations',
      key: 'profitLossFromOperations',
      format: formatNumber,
    },
    {
      label: 'Profit (loss) from operations%',
      key: 'profitLossFromOperationsPercent',
      format: formatPercentage,
    },
    { spacer: true },
    { section: 'Other Income Expenses' },
    { label: 'Interest income', key: 'interestIncome', format: formatNumber },
    { label: 'Interest expense', key: 'interestExpense', format: formatNumber },
    {
      label: 'Gain (loss) on disposal of assets',
      key: 'gainLossOnDisposalOfAssets',
      format: formatNumber,
    },
    {
      label: 'Other income (expense)',
      key: 'otherIncomeExpense',
      format: formatNumber,
    },
    {
      label: 'Total other income (expense)',
      key: 'totalOtherIncomeExpense',
      format: formatNumber,
    },
    {
      label: 'Total other income (expense)%',
      key: 'totalOtherIncomeExpensePercent',
      format: formatPercentage,
    },
    {
      label: 'Income (loss) before income taxes',
      key: 'incomeLossBeforeIncomeTaxes',
      format: formatNumber,
    },
    {
      label: 'Pre-tax income%',
      key: 'preTaxIncomePercent',
      format: formatPercentage,
    },
    { label: 'Income taxes', key: 'incomeTaxes', format: formatNumber },
    { label: 'Net income (loss)', key: 'netIncomeLoss', format: formatNumber },
    {
      label: 'Net income (loss)%',
      key: 'netIncomeLossPercent',
      format: formatPercentage,
    },
    { spacer: true },
    { section: 'Assets' },
    { section: 'Current Assets:' },
    {
      label: 'Cash and cash equivalents',
      key: 'cashEquivalents',
      format: formatNumber,
    },
    {
      label: 'Accounts receivable',
      key: 'accountsReceivable',
      format: formatNumber,
    },
    { label: 'Inventory', key: 'inventory', format: formatNumber },
    {
      label: 'Total Current Assets',
      key: 'totalCurrentAssets',
      format: formatNumber,
    },
    { spacer: true },
    { section: 'Long Term Assets:' },
    {
      label: 'Property, plant, and equipment',
      key: 'propertyPlantAndEquipment',
      format: formatNumber,
    },
    { label: 'Investment', key: 'investment', format: formatNumber },
    {
      label: 'Total long-term asset',
      key: 'totalLongTermAssets',
      format: formatNumber,
    },
    { spacer: true },
    { label: 'TOTAL ASSETS', key: 'totalAssets', format: formatNumber },
    { spacer: true },
    { section: 'Liabilities and Equity' },
    { section: 'Current Liabilities (due within 1 year):' },
    { label: 'Accounts payable', key: 'accountsPayable', format: formatNumber },
    { label: 'Debt service', key: 'debtService', format: formatNumber },
    { label: 'Taxes payable', key: 'taxesPayable', format: formatNumber },
    {
      label: 'Total Current Liabilities',
      key: 'totalCurrentLiabilities',
      format: formatNumber,
    },
    { spacer: true },
    { section: 'Long Term Liabilities (Due after one year):' },
    {
      label: 'Debt service (long term)',
      key: 'debtServiceLongTerm',
      format: formatNumber,
    },
    { label: 'Loans payable', key: 'loansPayable', format: formatNumber },
    {
      label: 'Total Long-term Liabilities',
      key: 'totalLongTermLiabilities',
      format: formatNumber,
    },
    {
      label: 'Total Liabilities',
      key: 'totalLiabilities',
      format: formatNumber,
    },
    { spacer: true },
    { section: "Stockholder's Equity:" },
    { label: 'Equity Capital', key: 'equityCapital', format: formatNumber },
    {
      label: 'Retained earnings',
      key: 'retainedEarnings',
      format: formatNumber,
    },
    {
      label: "Total Stockholder's Equity",
      key: 'totalStockholdersEquity',
      format: formatNumber,
    },
    { spacer: true },
    {
      label: 'TOTAL LIABILITIES AND EQUITY',
      key: 'totalLiabilitiesAndEquity',
      format: formatNumber,
    },
  ];

  return (
    <main>
      <Container id="landing-page" fluid className="mt-10 py-3">
        <span className="center text-2xl">Auditor Dashboard | Table</span>
        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
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
                      const value = hasDirectValue
                        ? financesByYear[year][row.key]
                        : compute(row.key, year);
                      return (
                        <td key={year} className="px-6 py-4">
                          {row.format(value)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
