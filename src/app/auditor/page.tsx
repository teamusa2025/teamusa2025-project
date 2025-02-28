'use client';

import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

/** The Auditor page. */
export default function Auditor() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Container id="landing-page" fluid className="mt-20 py-3">
        <h1>
          Welcome,
          <br />
          {session?.user?.email}
        </h1>
        <p>You now have access to protected auditor content.</p>
        <br />
        <h1 className="center">Mockup Page for Auditor Home Page</h1>
        <div className="center">
          <a href="/1">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
            >
              Edit
            </button>
          </a>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    INCOME STATEMENT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    2022
                  </th>
                  <th scope="col" className="px-6 py-3">
                    2023
                  </th>
                  <th scope="col" className="px-6 py-3">
                    2024
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Revenue
                  </th>
                  <td className="px-6 py-4">131,345</td>
                  <td className="px-6 py-4">142,341</td>
                  <td className="px-6 py-4">150,772</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Net Sales
                  </th>
                  <td className="px-6 py-4">131,345</td>
                  <td className="px-6 py-4">142,341</td>
                  <td className="px-6 py-4">150,772</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Cost of Goods Sold:
                  </th>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Cost of Contracting
                  </th>
                  <td className="px-6 py-4">48,456</td>
                  <td className="px-6 py-4">52,587</td>
                  <td className="px-6 py-4">56,643</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Overhead
                  </th>
                  <td className="px-6 py-4">667</td>
                  <td className="px-6 py-4">667</td>
                  <td className="px-6 py-4">667</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Cost of Goods Sold
                  </th>
                  <td className="px-6 py-4">49,123</td>
                  <td className="px-6 py-4">53,254</td>
                  <td className="px-6 py-4">57,310</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Gross Profit
                  </th>
                  <td className="px-6 py-4">82,222</td>
                  <td className="px-6 py-4">89,087</td>
                  <td className="px-6 py-4">93,462</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Gross Margin
                  </th>
                  <td className="px-6 py-4">62.6%</td>
                  <td className="px-6 py-4">62.6%</td>
                  <td className="px-6 py-4">62.0%</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white" />
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Operating Expenses:
                  </th>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Salaries and Benefits
                  </th>
                  <td className="px-6 py-4">23,872</td>
                  <td className="px-6 py-4">23,002</td>
                  <td className="px-6 py-4">25,245</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Rent and Overhead
                  </th>
                  <td className="px-6 py-4">10,087</td>
                  <td className="px-6 py-4">11,020</td>
                  <td className="px-6 py-4">11,412</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Depreciation and Amortization
                  </th>
                  <td className="px-6 py-4">17,205</td>
                  <td className="px-6 py-4">16,544</td>
                  <td className="px-6 py-4">16,080</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Interest
                  </th>
                  <td className="px-6 py-4">1500</td>
                  <td className="px-6 py-4">900</td>
                  <td className="px-6 py-4">900</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Operating Expenses
                  </th>
                  <td className="px-6 py-4">52,664</td>
                  <td className="px-6 py-4">51,466</td>
                  <td className="px-6 py-4">53,637</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Operating Expenses%
                  </th>
                  <td className="px-6 py-4">40.1%</td>
                  <td className="px-6 py-4">36.2%</td>
                  <td className="px-6 py-4">35.6%</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Profit (loss) from operations
                  </th>
                  <td className="px-6 py-4">29,558</td>
                  <td className="px-6 py-4">37,621</td>
                  <td className="px-6 py-4">39,825</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Profit (loss) from operations %
                  </th>
                  <td className="px-6 py-4">22.5%</td>
                  <td className="px-6 py-4">26.4%</td>
                  <td className="px-6 py-4">26.4%</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white"
                  >
                    Other Income Expenses
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Interest income
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Interest expense
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Gain (loss) on disposal of assets
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 underline dark:text-white"
                  >
                    Other income (expense)
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total other income (expense)
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total other income (expense) %
                  </th>
                  <td className="px-6 py-4">0.0%</td>
                  <td className="px-6 py-4">0.0%</td>
                  <td className="px-6 py-4">0.0%</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Income (loss) before income taxes
                  </th>
                  <td className="px-6 py-4">29,558</td>
                  <td className="px-6 py-4">37,621</td>
                  <td className="px-6 py-4">39,825</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Pre-tax income %
                  </th>
                  <td className="px-6 py-4">22.5%</td>
                  <td className="px-6 py-4">26.4%</td>
                  <td className="px-6 py-4">26.4%</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Income taxes
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Net income (loss)
                  </th>
                  <td className="px-6 py-4">(8,483)</td>
                  <td className="px-6 py-4">(10,908)</td>
                  <td className="px-6 py-4">(11,598)</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Net income (loss) %
                  </th>
                  <td className="px-6 py-4">16.0%</td>
                  <td className="px-6 py-4">18.8%</td>
                  <td className="px-6 py-4">18.7%</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white"
                  >
                    Assets
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Current Assets:
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Cash and cash equivalents
                  </th>
                  <td className="px-6 py-4">183,715</td>
                  <td className="px-6 py-4">191,069</td>
                  <td className="px-6 py-4">189,550</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Accounts receivable
                  </th>
                  <td className="px-6 py-4">6,567</td>
                  <td className="px-6 py-4">7,117</td>
                  <td className="px-6 py-4">7,539</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Inventory
                  </th>
                  <td className="px-6 py-4">9,825</td>
                  <td className="px-6 py-4">10,531</td>
                  <td className="px-6 py-4">11,342</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Current Assets
                  </th>
                  <td className="px-6 py-4">200,107</td>
                  <td className="px-6 py-4">208,717</td>
                  <td className="px-6 py-4">208,431</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Long Term Assets:
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Property, plant, and equipment
                  </th>
                  <td className="px-6 py-4">40,145</td>
                  <td className="px-6 py-4">38,602</td>
                  <td className="px-6 py-4">37,521</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Investment
                  </th>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">20000</td>
                  <td className="px-6 py-4">50000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total long-term asset
                  </th>
                  <td className="px-6 py-4">40,145</td>
                  <td className="px-6 py-4">58,602</td>
                  <td className="px-6 py-4">87,521</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white"
                  >
                    TOTAL ASSETS
                  </th>
                  <td className="px-6 py-4">240,252</td>
                  <td className="px-6 py-4">267,319</td>
                  <td className="px-6 py-4">295,952</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white"
                  >
                    Liabilities and Equity
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Current Liabilities (due within 1 year):
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Accounts payable
                  </th>
                  <td className="px-6 py-4">4,912</td>
                  <td className="px-6 py-4">5,265</td>
                  <td className="px-6 py-4">5,671</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Debt service
                  </th>
                  <td className="px-6 py-4">5000</td>
                  <td className="px-6 py-4">5000</td>
                  <td className="px-6 py-4">5000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Taxes payable
                  </th>
                  <td className="px-6 py-4">4,265</td>
                  <td className="px-6 py-4">5341</td>
                  <td className="px-6 py-4">2,054</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Current Liabilities
                  </th>
                  <td className="px-6 py-4">14,177</td>
                  <td className="px-6 py-4">15,606</td>
                  <td className="px-6 py-4">12,725</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Long Term Liabilities (Due after one year):
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Debt service
                  </th>
                  <td className="px-6 py-4">15000</td>
                  <td className="px-6 py-4">15000</td>
                  <td className="px-6 py-4">15000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Loans payable
                  </th>
                  <td className="px-6 py-4">20000</td>
                  <td className="px-6 py-4">40000</td>
                  <td className="px-6 py-4">70000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Long-term Liabilities:
                  </th>
                  <td className="px-6 py-4">35000</td>
                  <td className="px-6 py-4">55000</td>
                  <td className="px-6 py-4">85000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Liabilities
                  </th>
                  <td className="px-6 py-4">49,177</td>
                  <td className="px-6 py-4">70,606</td>
                  <td className="px-6 py-4">97,725</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Stockholder&#39;s Equity:
                  </th>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Equity Capital
                  </th>
                  <td className="px-6 py-4">170000</td>
                  <td className="px-6 py-4">170000</td>
                  <td className="px-6 py-4">170000</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Retained earnings
                  </th>
                  <td className="px-6 py-4">21,075</td>
                  <td className="px-6 py-4">26,713</td>
                  <td className="px-6 py-4">28,227</td>
                </tr>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                    Total Stockholder&#39;s Equity
                  </th>
                  <td className="px-6 py-4">191,075</td>
                  <td className="px-6 py-4">196,713</td>
                  <td className="px-6 py-4">198,227</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  {/* eslint-disable-next-line max-len */}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white"
                  >
                    TOTAL LIABILITIES AND EQUITY
                  </th>
                  <td className="px-6 py-4">240,252</td>
                  <td className="px-6 py-4">267,319</td>
                  <td className="px-6 py-4">295,952</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </main>
  );
}
