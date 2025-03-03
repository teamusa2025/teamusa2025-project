'use client';

/** The Analyst page. */
const FC = () => (
  <>
    {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
    <section className="ml-[185px] bg-white dark:bg-gray-900">
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <section className="grid grid-cols-[3fr_2fr]">
        <div className="relative overflow-x-auto border-r">
          <h3 className="my-4 py-4 text-center">Income Statement</h3>
          <table className="ms-3 w-5/6 text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="text-xs uppercase text-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" aria-hidden="true" className="w-1/5 px-6 py-3" />
                <th scope="col" className="w-1/4 px-6 py-3">
                  Forecast Type
                </th>
                <th scope="col" className="w-1/4 px-6 py-3">
                  Enter % Multiplier
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Revenue
                </th>
                <td className="px-6 py-4">
                  <form className="mx-auto max-w-sm">
                    <label htmlFor="countries" className=" block text-sm text-gray-900 dark:text-white">
                      <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
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
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="%"
                      required
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Cost of Contracting
                </th>
                <td className="px-6 py-4">
                  <form className="mx-auto max-w-sm">
                    <label htmlFor="countries" className=" block text-sm text-gray-900 dark:text-white">
                      <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
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
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="%"
                      required
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Overhead
                </th>
                <td className="px-6 py-4">
                  <form className="mx-auto max-w-sm">
                    <label htmlFor="countries" className=" block text-sm text-gray-900 dark:text-white">
                      <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
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
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
                    focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="%"
                      required
                    />
                  </div>
                </td>
              </tr>
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
              className="mb-2 me-2 ms-2 rounded-full border border-blue-700 px-5 py-2.5 text-center text-sm font-medium
              text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300
              dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white
              dark:focus:ring-blue-800"
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
              >
                <option selected>2025</option>
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
          <div className="relative overflow-y-auto sm:rounded-lg">
            <table className="mx-5 w-4/5 overflow-y-auto text-left text-sm text-gray-500 dark:text-gray-400
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
                <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700
                odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Revenue
                  </th>
                  <td className="px-6 py-4">Number</td>
                </tr>
                <tr className="border-b border-gray-200 font-semibold text-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Net Sales
                  </th>
                  <td className="px-6 py-4">Number</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Cost of goods sold:
                  </th>
                  <td className="px-6 py-4" aria-label="empty space" />
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Cost of Contracting
                  </th>
                  <td className="px-6 py-4">Number</td>
                </tr>
                <tr>
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    Overhead
                  </th>
                  <td className="px-6 py-4">Number</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  </>
);

export default FC;
