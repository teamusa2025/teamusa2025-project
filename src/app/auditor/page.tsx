import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';

// Helper function to generate empty cells (for spacer rows)
const extraEmptyCells = (count: number) => [...Array(count)].map((_, index) => (
  <td key={index} className="px-6 py-4" />
));

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

  // Define the rows for the table.
  // Each row has a label, a key (that corresponds to the auditedFinances field),
  // and a formatting function.
  const rows = [
    {
      label: 'Revenue',
      key: 'revenue',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Net Sales',
      key: 'netSales',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    { section: 'Cost of Goods Sold:' },
    {
      label: 'Cost of Contracting',
      key: 'costOfContracting',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Overhead',
      key: 'overhead',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Cost of Goods Sold',
      key: 'costOfGoodsSold',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Gross Profit',
      key: 'grossProfit',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Gross Margin',
      key: 'grossMarginPercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    { spacer: true },
    { section: 'Operating Expenses:' },
    {
      label: 'Salaries and Benefits',
      key: 'salariesAndBenefits',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Rent and Overhead',
      key: 'rentAndOverhead',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Depreciation and Amortization',
      key: 'depreciationAndAmortization',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Interest',
      key: 'interest',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Total Operating Expenses',
      key: 'totalOperatingExpenses',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Operating Expenses%',
      key: 'operatingExpensesPercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    { spacer: true },
    {
      label: 'Profit (loss) from operations',
      key: 'profitLossFromOperations',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Profit (loss) from operations%',
      key: 'profitLossFromOperationsPercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    { spacer: true },
    { section: 'Other Income Expenses' },
    {
      label: 'Interest income',
      key: 'interestIncome',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Interest expense',
      key: 'interestExpense',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Gain (loss) on disposal of assets',
      key: 'gainLossOnDisposalOfAssets',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Other income (expense)',
      key: 'otherIncomeExpense',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Total other income (expense)',
      key: 'totalOtherIncomeExpense',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Total other income (expense)%',
      key: 'totalOtherIncomeExpensePercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    {
      label: 'Income (loss) before income taxes',
      key: 'incomeLossBeforeIncomeTaxes',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Pre-tax income%',
      key: 'preTaxIncomePercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    {
      label: 'Income taxes',
      key: 'incomeTaxes',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Net income (loss)',
      key: 'netIncomeLoss',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Net income (loss)%',
      key: 'netIncomeLossPercent',
      format: (v: number) => (v !== undefined ? `${v}%` : '-'),
    },
    { spacer: true },
    { section: 'Assets' },
    { section: 'Current Assets:' },
    {
      label: 'Cash and cash equivalents',
      key: 'cashEquivalents',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Accounts receivable',
      key: 'accountsReceivable',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Inventory',
      key: 'inventory',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Total Current Assets',
      key: 'totalCurrentAssets',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    { section: 'Long Term Assets:' },
    {
      label: 'Property, plant, and equipment',
      key: 'propertyPlantAndEquipment',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Investment',
      key: 'investment',
      format: (v: number) => (v !== undefined ? v?.toLocaleString() : '-'),
    },
    {
      label: 'Total long-term asset',
      key: 'totalLongTermAssets',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    {
      label: 'TOTAL ASSETS',
      key: 'totalAssets',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    { section: 'Liabilities and Equity' },
    { section: 'Current Liabilities (due within 1 year):' },
    {
      label: 'Accounts payable',
      key: 'accountsPayable',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Debt service',
      key: 'debtService',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Taxes payable',
      key: 'taxesPayable',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Total Current Liabilities',
      key: 'totalCurrentLiabilities',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    { section: 'Long Term Liabilities (Due after one year):' },
    {
      label: 'Debt service (long term)',
      key: 'debtServiceLongTerm',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Loans payable',
      key: 'loansPayable',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Total Long-term Liabilities',
      key: 'totalLongTermLiabilities',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Total Liabilities',
      key: 'totalLiabilities',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    { section: "Stockholder's Equity:" },
    {
      label: 'Equity Capital',
      key: 'equityCapital',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: 'Retained earnings',
      key: 'retainedEarnings',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    {
      label: "Total Stockholder's Equity",
      key: 'totalStockholdersEquity',
      format: (v: number) => v?.toLocaleString() || '-',
    },
    { spacer: true },
    {
      label: 'TOTAL LIABILITIES AND EQUITY',
      key: 'totalLiabilitiesAndEquity',
      format: (v: number) => v?.toLocaleString() || '-',
    },
  ];

  return (
    <main>
      <Container id="landing-page" fluid className="mt-10 py-3">
        <span className="center text-2xl">Auditor Dashboad | Table</span>
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
                      const finance = financesByYear[year];
                      const cellValue = finance && finance[row.key] !== undefined
                        ? row.format(finance[row.key])
                        : '-';
                      return (
                        <td key={year} className="px-6 py-4">
                          {cellValue}
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
