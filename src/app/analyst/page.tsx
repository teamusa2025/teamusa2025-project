import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { analystProtectedPage } from '@/lib/page-protection';
import { redirect } from 'next/navigation';
import { Subrole } from '@prisma/client';
import ForecastDashboardWrapper from '@/components/ForecastDashboardWrapper';
import FinancialLineChart from '@/components/FinancialLineChart';

export type RowsConfig = {
  label?: string;
  key?: string;
  formatType?: 'number' | 'percentage';
  spacer?: boolean;
  section?: string;
};

type FinanceRecord = {
  year: number;
  [key: string]: any;
};

export default async function Analyst(): Promise<JSX.Element> {
  const session = (await getServerSession(authOptions)) as {
    user: {
      email: string;
      id: string;
      randomKey: string;
      name?: string | null;
      image?: string | null;
      username: string;
      subrole: Subrole;
    };
  };

  if (!session) {
    redirect('/auth/signin');
  }

  try {
    analystProtectedPage(session);
  } catch (error) {
    redirect('/not-found');
  }

  const finances: FinanceRecord[] = await prisma.auditedFinances.findMany();
  finances.sort((a, b) => a.year - b.year);

  const yearsToDisplay: number[] = [
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
    2034, 2035, 2036,
  ];

  const financesByYear: Record<number, FinanceRecord> = {};
  finances.forEach((item) => {
    financesByYear[item.year] = item;
  });

  const rows: RowsConfig[] = [
    { label: 'Revenue', key: 'revenue', formatType: 'number' },
    { label: 'Net Sales', key: 'netSales', formatType: 'number' },
    { spacer: true },
    { section: 'Cost of Goods Sold:' },
    {
      label: 'Cost of Contracting',
      key: 'costOfContracting',
      formatType: 'number',
    },
    { label: 'Overhead', key: 'overhead', formatType: 'number' },
    {
      label: 'Cost of Goods Sold',
      key: 'costOfGoodsSold',
      formatType: 'number',
    },
    { label: 'Gross Profit', key: 'grossProfit', formatType: 'number' },
    {
      label: 'Gross Margin',
      key: 'grossMarginPercent',
      formatType: 'percentage',
    },
    { spacer: true },
    { section: 'Operating Expenses:' },
    {
      label: 'Salaries and Benefits',
      key: 'salariesAndBenefits',
      formatType: 'number',
    },
    {
      label: 'Rent and Overhead',
      key: 'rentAndOverhead',
      formatType: 'number',
    },
    {
      label: 'Depreciation and Amortization',
      key: 'depreciationAndAmortization',
      formatType: 'number',
    },
    { label: 'Interest', key: 'interest', formatType: 'number' },
    {
      label: 'Total Operating Expenses',
      key: 'totalOperatingExpenses',
      formatType: 'number',
    },
    {
      label: 'Operating Expenses%',
      key: 'operatingExpensesPercent',
      formatType: 'percentage',
    },
    { spacer: true },
    {
      label: 'Profit (loss) from operations',
      key: 'profitLossFromOperations',
      formatType: 'number',
    },
    {
      label: 'Profit (loss) from operations%',
      key: 'profitLossFromOperationsPercent',
      formatType: 'percentage',
    },
    { spacer: true },
    { section: 'Other Income Expenses' },
    { label: 'Interest income', key: 'interestIncome', formatType: 'number' },
    { label: 'Interest expense', key: 'interestExpense', formatType: 'number' },
    {
      label: 'Gain (loss) on disposal of assets',
      key: 'gainLossOnDisposalOfAssets',
      formatType: 'number',
    },
    {
      label: 'Other income (expense)',
      key: 'otherIncomeExpense',
      formatType: 'number',
    },
    {
      label: 'Total other income (expense)',
      key: 'totalOtherIncomeExpense',
      formatType: 'number',
    },
    {
      label: 'Total other income (expense)%',
      key: 'totalOtherIncomeExpensePercent',
      formatType: 'percentage',
    },
    {
      label: 'Income (loss) before income taxes',
      key: 'incomeLossBeforeIncomeTaxes',
      formatType: 'number',
    },
    {
      label: 'Pre-tax income%',
      key: 'preTaxIncomePercent',
      formatType: 'percentage',
    },
    { label: 'Income taxes', key: 'incomeTaxes', formatType: 'number' },
    { label: 'Net income (loss)', key: 'netIncomeLoss', formatType: 'number' },
    {
      label: 'Net income (loss)%',
      key: 'netIncomeLossPercent',
      formatType: 'percentage',
    },
    { spacer: true },
    { section: 'Assets' },
    { section: 'Current Assets:' },
    {
      label: 'Cash and cash equivalents',
      key: 'cashEquivalents',
      formatType: 'number',
    },
    {
      label: 'Accounts receivable',
      key: 'accountsReceivable',
      formatType: 'number',
    },
    { label: 'Inventory', key: 'inventory', formatType: 'number' },
    {
      label: 'Total Current Assets',
      key: 'totalCurrentAssets',
      formatType: 'number',
    },
    { spacer: true },
    { section: 'Long Term Assets:' },
    {
      label: 'Property, plant, and equipment',
      key: 'propertyPlantAndEquipment',
      formatType: 'number',
    },
    { label: 'Investment', key: 'investment', formatType: 'number' },
    {
      label: 'Total long-term asset',
      key: 'totalLongTermAssets',
      formatType: 'number',
    },
    { spacer: true },
    { label: 'TOTAL ASSETS', key: 'totalAssets', formatType: 'number' },
    { spacer: true },
    { section: 'Liabilities and Equity' },
    { section: 'Current Liabilities (due within 1 year):' },
    { label: 'Accounts payable', key: 'accountsPayable', formatType: 'number' },
    { label: 'Debt service', key: 'debtService', formatType: 'number' },
    { label: 'Taxes payable', key: 'taxesPayable', formatType: 'number' },
    {
      label: 'Total Current Liabilities',
      key: 'totalCurrentLiabilities',
      formatType: 'number',
    },
    { spacer: true },
    { section: 'Long Term Liabilities (Due after one year):' },
    {
      label: 'Debt service (long term)',
      key: 'debtServiceLongTerm',
      formatType: 'number',
    },
    { label: 'Loans payable', key: 'loansPayable', formatType: 'number' },
    {
      label: 'Total Long-term Liabilities',
      key: 'totalLongTermLiabilities',
      formatType: 'number',
    },
    {
      label: 'Total Liabilities',
      key: 'totalLiabilities',
      formatType: 'number',
    },
    { spacer: true },
    { section: "Stockholder's Equity:" },
    { label: 'Equity Capital', key: 'equityCapital', formatType: 'number' },
    {
      label: 'Retained earnings',
      key: 'retainedEarnings',
      formatType: 'number',
    },
    {
      label: "Total Stockholder's Equity",
      key: 'totalStockholdersEquity',
      formatType: 'number',
    },
    { spacer: true },
    {
      label: 'TOTAL LIABILITIES AND EQUITY',
      key: 'totalLiabilitiesAndEquity',
      formatType: 'number',
    },
  ];

  return (
    <main>
      <Container id="landing-page" fluid className="mt-10 py-3">
        <span className="center text-2xl">Analyst Dashboard | Overview</span>
        <FinancialLineChart
          financesByYear={financesByYear}
          yearsToDisplay={yearsToDisplay}
          forecastConfig={
            // Either pass forecastConfig from a lifted state (preferred)
            // or re-create the same default config logic here:
            {
              revenue: { forecastType: 'average', multiplier: 1.5 },
              netSales: { forecastType: 'average', multiplier: 1.5 },
              costOfContracting: { forecastType: 'average', multiplier: 1.5 },
              overhead: { forecastType: 'average', multiplier: 1.5 },
            }
          }
        />
        <ForecastDashboardWrapper
          financesByYear={financesByYear}
          rows={rows}
          yearsToDisplay={yearsToDisplay}
        />
        {/* Graph below the table */}
      </Container>
    </main>
  );
}
