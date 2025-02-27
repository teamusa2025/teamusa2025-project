'use client';

import { useState } from 'react';

/** The Analyst page. */
const FC = () => {
  const rowsData = [
    { id: 1, name: 'Revenue', input: 'Y' },
    { id: 2, name: 'Cost of goods sold:', input: 'N' },
    { id: 3, name: 'Cost of Contracting', input: 'Y' },
    { id: 4, name: 'Overhead', input: 'Y' },
    { id: 5, name: 'Operating expenses', input: 'N' },
    { id: 6, name: 'Salaries and benefits', input: 'Y' },
    { id: 7, name: 'Rent and Overhead', input: 'Y' },
    { id: 8, name: 'Depreciation and Amortization', input: 'Y' },
    { id: 9, name: 'Interest', input: 'Y' },
    { id: 10, name: 'Profit (loss) from operations', input: 'Y' },
    { id: 11, name: 'Other income (expense): ', input: 'N' },
    { id: 12, name: 'Interest income', input: 'Y' },
    { id: 13, name: 'Interest expense', input: 'Y' },
    { id: 14, name: 'Gain (loss) on disposal of assets', input: 'Y' },
    { id: 15, name: 'Other income (expense)', input: 'Y' },
    { id: 16, name: 'Income taxes', input: 'Y' },
  ];

  const rowsData2 = [
    { id: 1, name: 'ASSETS', input: 'S' },
    { id: 2, name: 'Current Assets', input: 'N' },
    { id: 3, name: 'Cash and cash equivalents', input: 'Y' },
    { id: 4, name: 'Accounts receivable', input: 'Y' },
    { id: 5, name: 'Inventory', input: 'Y' },
    { id: 6, name: 'Long-term Asset', input: 'N' },
    { id: 7, name: 'Property, plant, and equipment', input: 'Y' },
    { id: 8, name: 'Investment', input: 'Y' },
    { id: 9, name: 'LIABILITIES AND EQUITY', input: 'S' },
    { id: 10, name: 'Current Liabilities (due within 1 year)', input: 'N' },
    { id: 11, name: 'Accounts payable', input: 'Y' },
    { id: 12, name: 'Debt service', input: 'Y' },
    { id: 13, name: 'Taxes payable ', input: 'Y' },
    { id: 14, name: 'Long-term Liabilities (due after one year)', input: 'N' },
    { id: 15, name: 'Debt service', input: 'Y' },
    { id: 16, name: 'Loans payable', input: 'Y' },
    { id: 17, name: "Stockholder's Equity", input: 'N' },
    { id: 18, name: 'Equity Capital', input: 'Y' },
    { id: 19, name: 'Retained earnings', input: 'Y' },
  ];

  const tableData = [
    { id: 1, name: 'Revenue', type: 'Basic' },
    { id: 2, name: 'Net Sales', type: 'Total' },
    { id: 3, name: 'Cost of goods sold:', type: 'Title' },
    { id: 4, name: 'Cost of Contracting ', type: 'Basic' },
    { id: 5, name: 'Overhead', type: 'Basic' },
    { id: 6, name: 'Cost of goods sold:', type: 'Total' },
    { id: 7, name: 'Gross profit', type: 'Total' },
    { id: 8, name: 'Gross margin %', type: 'Percent' },
    { id: 9, name: 'Operating expenses', type: 'Title' },
    { id: 10, name: 'Salaries and benefits', type: 'Basic' },
    { id: 11, name: 'Rent and Overhead', type: 'Basic' },
    { id: 12, name: 'Depreciation and Amortization', type: 'Basic' },
    { id: 13, name: 'Interest', type: 'Basic' },
    { id: 14, name: 'Total operating expenses', type: 'Total' },
    { id: 15, name: 'Operating expenses %', type: 'Percent' },
    { id: 16, name: 'Profit (loss) from operations', type: 'Total' },
    { id: 17, name: 'Profit (loss) from operations %', type: 'Percent' },
    { id: 18, name: 'Other income (expense): ', type: 'Title' },
    { id: 19, name: 'Interest income', type: 'Basic' },
    { id: 20, name: 'Interest expense', type: 'Basic' },
    { id: 21, name: 'Gain (loss) on disposal of assets', type: 'Basic' },
    { id: 22, name: 'Other income (expense)', type: 'Basic' },
    { id: 23, name: 'Total other income (expense)', type: 'Total' },
    { id: 24, name: 'Total other income (expense) %', type: 'Percent' },
    { id: 25, name: 'Income (loss) before income taxes', type: 'Total' },
    { id: 26, name: 'Pre-tax income %', type: 'Percent' },
    { id: 27, name: 'Income taxes', type: 'Basic' },
    { id: 28, name: 'Net income (loss)', type: 'Total' },
    { id: 29, name: 'Net income (loss) %', type: 'Percent' },
    { id: 30, name: 'Check', type: 'Red' },
  ];

  const tableData2 = [
    { id: 1, name: 'ASSETS', type: 'Main' },
    { id: 2, name: 'Current Assets', type: 'Title' },
    { id: 3, name: 'Cash and cash equivalents', type: 'Basic' },
    { id: 4, name: 'Accounts receivable', type: 'Basic' },
    { id: 5, name: 'Inventory', type: 'Basic' },
    { id: 6, name: 'Total Current Assets', type: 'Total' },
    { id: 7, name: 'Long-term Asset', type: 'Title' },
    { id: 8, name: 'Property, plant, and equipment', type: 'Basic' },
    { id: 9, name: 'Investment', type: 'Basic' },
    { id: 10, name: 'Total long-term asset ', type: 'Total' },
    { id: 11, name: 'TOTAL ASSETS', type: 'Total' },
    { id: 12, name: 'LIABILITIES AND EQUITY', type: 'Main' },
    { id: 13, name: 'Current Liabilities (due within 1 year)', type: 'Title' },
    { id: 14, name: 'Accounts payable', type: 'Basic' },
    { id: 15, name: 'Debt service', type: 'Basic' },
    { id: 16, name: 'Taxes payable', type: 'Basic' },
    { id: 17, name: 'Total Current Liabilities', type: 'Total' },
    { id: 18, name: 'Long-term Liabilities (due after one year)', type: 'Title' },
    { id: 19, name: 'Debt service', type: 'Basic' },
    { id: 20, name: 'Loans payable', type: 'Basic' },
    { id: 21, name: 'Total Long-term Liabilities', type: 'Total' },
    { id: 22, name: 'Total Liabilities', type: 'Total' },
    { id: 23, name: "Stockholder's Equity", type: 'Title' },
    { id: 24, name: 'Equity Capital ', type: 'Basic' },
    { id: 25, name: 'Retained earnings', type: 'Basic' },
    { id: 26, name: "Total Stockholder's Equity", type: 'Total' },
    { id: 27, name: 'TOTAL LIABILITIES AND EQUITY', type: 'Total' },
    { id: 28, name: 'Check', type: 'Red' },
    { id: 29, name: 'Check', type: 'Red' },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handleClickNext = () => {
    setCurrentPage((page) => page + 1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const handleClickPrev = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : 1));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <section className="relative top-8 -mx-6 bg-white dark:bg-gray-900">
      {currentPage === 1 && (
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <section className="grid grid-cols-[4fr_3fr]">
          <div className="relative overflow-x-auto border-r">
            <h3 className="my-4 py-4 text-center">Income Statement</h3>
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <table className="mx-[18px] text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" aria-hidden="true" className="w-1/3 px-6 py-3" />
                  <th scope="col" className="w-1/4 px-6 py-3">
                    Forecast Type
                  </th>
                  <th scope="col" className="w-1/4 px-6 py-3">
                    Enter % Multiplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsData.map((data) => {
                  if (data.input === 'Y') {
                    return (
                      <tr key={data.id} className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-pre-wrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {data.name}
                        </th>
                        <td className="px-6 py-4">
                          <form className="mx-auto max-w-sm">
                            <label
                              htmlFor={`${data.name}-${data.id}-select`}
                              className=" block text-sm text-gray-900 dark:text-white"
                            >
                              <select
                                id={`${data.name}-${data.id}-select`}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                                text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                                dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
                                dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                defaultValue=""
                              >
                                <option value="">Select</option>
                                <option value="average">AVERAGE</option>
                                <option value="multiplier">MULTIPLIER</option>
                              </select>
                            </label>
                          </form>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <input
                              aria-label="Enter to submit"
                              type="number"
                              id={`${data.name}-${data.id}-number`}
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                              text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                              dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
                              dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              placeholder="%"
                              required
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={data.id} className="bg-gray-50 dark:bg-gray-800">
                      <th
                        scope="row"
                        colSpan={3}
                        className="whitespace-pre-wrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.name}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-5 me-3 flex justify-end">
              <button
                type="button"
                className="mb-2 me-2 ms-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white
              hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleClickNext}
                className="mb-2 me-2 ms-2 rounded-full border border-blue-700 px-5 py-2.5 text-center text-sm
                font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4
                focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500
                dark:hover:text-white dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form className="mx-auto my-5 w-1/2 max-w-sm">
              <label htmlFor="underline_select" className=" block text-sm text-gray-900 dark:text-white">
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-x-0 border-b-2 border-t-0 border-gray-200
                    bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none
                    focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  defaultValue="2025"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                </select>
              </label>
            </form>
            <div className="relative max-h-screen sm:rounded-lg">
              <table
                className="mx-auto w-4/5 overflow-auto text-left text-sm text-gray-500 dark:text-gray-400
            rtl:text-right"
              >
                <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="rounded-tl-lg px-6 py-3">
                      INCOME STATEMENT
                    </th>
                    <th scope="col" className="rounded-tr-lg px-6 py-3">
                      FORECAST
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data) => {
                    if (data.type === 'Basic') {
                      return (
                        <tr key={data.id} className="border-gray-200 bg-gray-50 dark:border-gray-700">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4">Number</td>
                        </tr>
                      );
                    }
                    if (data.type === 'Total') {
                      return (
                        <tr
                          key={data.id}
                          className="border-y border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 text-base text-gray-900 underline dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4">Number</td>
                        </tr>
                      );
                    }
                    if (data.type === 'Title') {
                      return (
                        <tr
                          key={data.id}
                          className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4" aria-label="empty space" />
                        </tr>
                      );
                    }
                    if (data.type === 'Percent') {
                      return (
                        <tr
                          key={data.id}
                          className="border-b border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 text-right text-base font-medium text-gray-900
                            dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4">Number</td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={data.id}
                        className="border-b border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-base font-medium text-red-600
                          dark:text-white"
                        >
                          {data.name}
                        </th>
                        <td className="px-6 py-4 text-red-600">Number</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {currentPage === 2 && (
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <section className="grid grid-cols-[4fr_3fr]">
          <div className="relative overflow-x-auto border-r">
            <h3 className="my-4 py-4 text-center">Balance Sheet</h3>
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <table className="mx-[18px] text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" aria-hidden="true" className="w-1/3 px-6 py-3" />
                  <th scope="col" className="w-1/4 px-6 py-3">
                    Forecast Type
                  </th>
                  <th scope="col" className="w-1/4 px-6 py-3">
                    Enter % Multiplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsData2.map((data) => {
                  if (data.input === 'Y') {
                    return (
                      <tr key={data.id} className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-pre-wrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {data.name}
                        </th>
                        <td className="px-6 py-4">
                          <form className="mx-auto max-w-sm">
                            <label
                              htmlFor={`${data.name}-${data.id}-select`}
                              className=" block text-sm text-gray-900 dark:text-white"
                            >
                              <select
                                id={`${data.name}-${data.id}-select`}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                                       text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                                       dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
                                       dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                defaultValue=""
                              >
                                <option value="">Select</option>
                                <option value="average">AVERAGE</option>
                                <option value="multiplier">MULTIPLIER</option>
                              </select>
                            </label>
                          </form>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <input
                              aria-label="Enter to submit"
                              type="number"
                              id={`${data.name}-${data.id}-number`}
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                                     text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                                     dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
                                     dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              placeholder="%"
                              required
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  if (data.input === 'S') {
                    return (
                      <tr key={data.id} className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          colSpan={3}
                          className="whitespace-pre-wrap border-b px-6 py-4 text-center text-base
                            font-medium text-gray-900 dark:text-white"
                        >
                          {data.name}
                        </th>
                      </tr>
                    );
                  }
                  return (
                    <tr key={data.id} className="bg-gray-50 dark:bg-gray-800">
                      <th
                        scope="row"
                        colSpan={3}
                        className="whitespace-pre-wrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.name}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-5 me-3 flex justify-end">
              <button
                type="button"
                className="mb-2 me-2 ms-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white
                     hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleClickPrev}
                className="mb-2 me-2 ms-2 rounded-full border border-blue-700 px-5 py-2.5 text-center text-sm
                       font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4
                       focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500
                       dark:hover:text-white dark:focus:ring-blue-800"
              >
                Back
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form className="mx-auto my-5 w-1/2 max-w-sm">
              <label htmlFor="underline_select" className=" block text-sm text-gray-900 dark:text-white">
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-x-0 border-b-2 border-t-0 border-gray-200
                           bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none
                           focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  defaultValue="2025"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                </select>
              </label>
            </form>
            <div className="relative max-h-screen sm:rounded-lg">
              <table
                className="mx-auto w-4/5 overflow-auto text-left text-sm text-gray-500 dark:text-gray-400
                   rtl:text-right"
              >
                <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="rounded-tl-lg px-6 py-3">
                      INCOME STATEMENT
                    </th>
                    <th scope="col" className="rounded-tr-lg px-6 py-3">
                      FORECAST
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData2.map((data) => {
                    if (data.type === 'Basic') {
                      return (
                        <tr key={data.id} className="border-x border-gray-200 bg-gray-50 dark:border-gray-700">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4">Number</td>
                        </tr>
                      );
                    }
                    if (data.type === 'Total') {
                      return (
                        <tr
                          key={data.id}
                          className="border border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 text-base text-gray-900 underline dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4">Number</td>
                        </tr>
                      );
                    }
                    if (data.type === 'Title') {
                      return (
                        <tr
                          key={data.id}
                          className="border-x border-b border-gray-200 bg-gray-100 dark:border-gray-700
                            dark:bg-gray-800"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.name}
                          </th>
                          <td className="px-6 py-4" aria-label="empty space" />
                        </tr>
                      );
                    }
                    if (data.type === 'Main') {
                      return (
                        <tr
                          key={data.id}
                          className="border-b border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            colSpan={2}
                            className="whitespace-nowrap px-6 py-4 text-center text-base font-medium text-gray-900
                              underline dark:text-white"
                          >
                            {data.name}
                          </th>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={data.id}
                        className="border-b border-gray-200 font-semibold text-gray-900 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-base font-medium text-red-600
                                 dark:text-white"
                        >
                          {data.name}
                        </th>
                        <td className="px-6 py-4 text-red-600">Number</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default FC;
