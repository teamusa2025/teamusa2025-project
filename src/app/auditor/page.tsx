'use client';

import { Container } from 'react-bootstrap';

/** The Auditor page. */
const Auditor = () => (
  <main>
    <Container id="landing-page" fluid className="mt-20 py-3">
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
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Net Sales
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Cost of Goods Sold
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Gross Profit
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Gross Margin
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Rent and Overhead
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Depreciation and Amortization
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Interest
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Operating Expenses
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Operating Expenses%
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Profit (loss) from operations
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Profit (loss) from operations %
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white">
                  Other Income Expenses
                </th>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Interest income
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Interest expense
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Gain (loss) on disposal of assets
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 underline dark:text-white">
                  Other income (expense)
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total other income (expense)
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total other income (expense) %
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Income (loss) before income taxes
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Pre-tax income %
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Income taxes
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Net income (loss)
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Net income (loss) %
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white">
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Accounts receivable
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Inventory
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Current Assets
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Investment
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total long-term asset
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white">
                  TOTAL ASSETS
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white">
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Debt service
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Taxes payable
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Current Liabilities
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Loans payable
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Long-term Liabilities:
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Liabilities
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
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
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Retained earnings
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-white">
                  Total Stockholder&#39;s Equity
                </th>
                <td className="px-6 py-4">
                  White
                </td>
                <td className="px-6 py-4">
                  Laptop PC
                </td>
                <td className="px-6 py-4">
                  $1999
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white" />
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                {/* eslint-disable-next-line max-len */}
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-bold text-gray-900 underline dark:text-white">
                  TOTAL LIABILITIES AND EQUITY
                </th>
                <td className="px-6 py-4">
                  Black
                </td>
                <td className="px-6 py-4">
                  Accessories
                </td>
                <td className="px-6 py-4">
                  $99
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  </main>
);

export default Auditor;
