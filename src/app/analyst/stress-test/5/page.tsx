/* eslint-disable react/button-has-type */
/* eslint-disable max-len */

'use client';

import React, { useState, useMemo } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: number | string;
  onChange: (value: any) => void;
  // eslint-disable-next-line react/require-default-props
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'number',
}) => (
  <div className="mb-4 flex items-center">
    <label htmlFor={id} className="w-1/3 text-lg font-medium text-gray-700">
      {label}
      :
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-2/3 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

interface Projection {
  fiscalYear: number;
  balance: string;
  yearlyContribution: string;
  interestEarned: string;
  interestPlusBalance: string;
}

interface LoanDetails {
  loanAmount: number;
  annualInterestRate: number;
  loanPeriodYears: number;
  startDate: string;
}

interface PaymentSchedule {
  no: number;
  paymentDate: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

const ScenarioFive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'investment' | 'loan'>(
    'investment',
  );
  const [stressEffect, setStressEffect] = useState<boolean>(false);

  // Investment calculator state
  const [presentValue, setPresentValue] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [termYears, setTermYears] = useState<number>(0);
  const [contribution, setContribution] = useState<number>(0);

  // Loan calculator state
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 0,
    annualInterestRate: 1.7,
    loanPeriodYears: 0,
    startDate: new Date().toISOString().split('T')[0],
  });

  // Formatting helpers
  const formatCurrency = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${date.getFullYear()}`;
  };

  // Investment calculations
  const calculateProjections = (years: number) => {
    if (presentValue <= 0 || interestRate <= 0) {
      return {
        futureValue: 0,
        totalInterest: 0,
        appreciation: 0,
      };
    }

    let balance = presentValue;
    const rate = interestRate / 100;
    let totalInterest = 0;

    for (let i = 0; i < years; i++) {
      const interest = balance * rate;
      totalInterest += interest;
      balance += interest + contribution;
    }

    return {
      futureValue: balance,
      totalInterest,
      appreciation: ((balance - presentValue) / presentValue) * 100,
    };
  };

  const fiveYear = calculateProjections(5);
  const thirtyYear = calculateProjections(30);

  const projections = useMemo<Projection[]>(() => {
    if (presentValue <= 0 || termYears <= 0) return [];

    let balance = presentValue;
    const rate = interestRate / 100;
    const yearlyContribution = contribution;

    return Array.from({ length: termYears }, (_, year) => {
      const interestEarned = balance * rate;
      const totalWithInterest = balance + interestEarned;

      const projection: Projection = {
        fiscalYear: year + 1,
        balance: balance.toFixed(2),
        yearlyContribution:
          yearlyContribution > 0 ? yearlyContribution.toFixed(2) : '',
        interestEarned: interestEarned.toFixed(2),
        interestPlusBalance: totalWithInterest.toFixed(2),
      };

      balance = totalWithInterest + yearlyContribution;
      return projection;
    });
  }, [presentValue, interestRate, termYears, contribution]);

  // Loan calculations
  const { paymentSchedule, calculatedValues } = useMemo(() => {
    const { loanAmount, annualInterestRate, loanPeriodYears, startDate } = loanDetails;
    const results = {
      monthlyPayment: 0,
      numberOfPayments: 0,
      totalInterest: 0,
      totalCost: 0,
      paymentSchedule: [] as PaymentSchedule[],
    };

    if (loanAmount > 0 && annualInterestRate > 0 && loanPeriodYears > 0) {
      const monthlyRate = annualInterestRate / 100 / 12;
      const numberOfPayments = loanPeriodYears * 12;
      const monthlyPayment = (monthlyRate * loanAmount)
        / (1 - (1 + monthlyRate) ** -numberOfPayments);

      let balance = loanAmount;
      const schedule: PaymentSchedule[] = [];
      let totalInterest = 0;
      let currentDate = new Date(startDate);

      // Adjust initial date to 30th or last day of month
      currentDate.setDate(30);
      if (currentDate.getDate() !== 30) {
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );
      }

      for (let i = 0; i < numberOfPayments; i++) {
        if (i > 0) {
          // Calculate next payment date
          const nextMonth = currentDate.getMonth() + 1;
          const nextYear = currentDate.getFullYear();
          let newDate = new Date(nextYear, nextMonth, 30);

          // Check if date rolled over to next month
          if (newDate.getMonth() !== nextMonth % 12) {
            newDate = new Date(nextYear, nextMonth + 1, 0);
          }
          currentDate = newDate;
        }

        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        const newBalance = balance - principal;

        const finalPayment = i === numberOfPayments - 1;
        const adjPrincipal = finalPayment ? balance : principal;
        const adjInterest = finalPayment ? monthlyPayment - balance : interest;

        schedule.push({
          no: i + 1,
          paymentDate: formatDate(currentDate),
          beginningBalance: balance,
          payment: monthlyPayment,
          principal: adjPrincipal,
          interest: adjInterest,
          endingBalance: Math.max(newBalance, 0),
        });

        totalInterest += adjInterest;
        balance = newBalance;

        if (balance <= 0) break;
      }

      results.monthlyPayment = monthlyPayment;
      results.numberOfPayments = schedule.length;
      results.totalInterest = totalInterest;
      results.totalCost = loanAmount + totalInterest;
      results.paymentSchedule = schedule;
    }

    return {
      calculatedValues: results,
      paymentSchedule: results.paymentSchedule,
    };
  }, [loanDetails]);

  return (
    <div className="mx-auto px-4 text-base">
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #5</h1>
      <h2 className="mb-8 text-center text-2xl">
        30% Decrease bond return to 1.7% due to increase in inflation
      </h2>
      <hr className="solid" />

      {/* Tab Navigation */}
      <div className="my-4 flex border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'investment' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('investment')}
        >
          Investment Calculator
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'loan' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('loan')}
        >
          Loan Calculator
        </button>
      </div>

      {activeTab === 'investment' ? (
        <>
          <div className="my-4">
            <label
              htmlFor="stress-effect-toggle"
              className="inline-flex cursor-pointer items-center"
            >
              <input
                id="stress-effect-toggle"
                type="checkbox"
                checked={stressEffect}
                onChange={(e) => setStressEffect(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-0 after:top-0
                         after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all
                         peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white
                         peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                         dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600
                         dark:peer-focus:ring-blue-800"
              />
              <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                Stress Effect
              </span>
            </label>
          </div>

          <div className="mx-auto px-4">
            <div className="mr-4 flex flex-col md:flex-row md:space-x-8">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <InputField
                  label="Present Value ($)"
                  id="presentValue"
                  value={presentValue}
                  onChange={(v) => setPresentValue(Number(v))}
                />
                <InputField
                  label="Interest Rate (%)"
                  id="interestRate"
                  value={interestRate}
                  onChange={(v) => setInterestRate(Number(v))}
                />
                <InputField
                  label="Term (in years)"
                  id="termYears"
                  value={termYears}
                  onChange={(v) => setTermYears(Number(v))}
                />
                <InputField
                  label="Contribution each month"
                  id="contribution"
                  value={contribution}
                  onChange={(v) => setContribution(Number(v))}
                />
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-1/2">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                  <tbody>
                    <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Value after 5 years
                      </th>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatCurrency(fiveYear.futureValue)
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatPercentage(fiveYear.appreciation)
                          : 'N/A'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Total interest earned after 5 years
                      </th>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatCurrency(fiveYear.totalInterest)
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {formatPercentage(interestRate)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Value after 30 years
                      </th>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatCurrency(thirtyYear.futureValue)
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatPercentage(thirtyYear.appreciation)
                          : 'N/A'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Total interest earned after 30 years
                      </th>
                      <td className="px-6 py-4">
                        {presentValue > 0
                          ? formatCurrency(thirtyYear.totalInterest)
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {formatPercentage(interestRate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto px-4">
          <div className="mr-4 flex flex-col md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <InputField
                label="Loan Amount ($)"
                id="loanAmount"
                value={loanDetails.loanAmount}
                onChange={(v) => setLoanDetails((prev) => ({ ...prev, loanAmount: Number(v) }))}
              />
              <InputField
                label="Annual Interest Rate (%)"
                id="annualInterestRate"
                value={loanDetails.annualInterestRate}
                onChange={(v) => setLoanDetails((prev) => ({
                  ...prev,
                  annualInterestRate: Number(v),
                }))}
              />
              <InputField
                label="Loan Period (years)"
                id="loanPeriodYears"
                value={loanDetails.loanPeriodYears}
                onChange={(v) => setLoanDetails((prev) => ({
                  ...prev,
                  loanPeriodYears: Number(v),
                }))}
              />
              <InputField
                label="Start Date"
                id="startDate"
                type="date"
                value={loanDetails.startDate}
                onChange={(v) => setLoanDetails((prev) => ({ ...prev, startDate: v }))}
              />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-1/2">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <tbody>
                  <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Monthly Payment
                    </th>
                    <td className="px-6 py-4">
                      {loanDetails.loanAmount > 0
                        ? formatCurrency(calculatedValues.monthlyPayment)
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Number of Payments
                    </th>
                    <td className="px-6 py-4">
                      {loanDetails.loanAmount > 0
                        ? calculatedValues.numberOfPayments
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Total Interest
                    </th>
                    <td className="px-6 py-4">
                      {loanDetails.loanAmount > 0
                        ? formatCurrency(calculatedValues.totalInterest)
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Total Cost
                    </th>
                    <td className="px-6 py-4">
                      {loanDetails.loanAmount > 0
                        ? formatCurrency(calculatedValues.totalCost)
                        : 'N/A'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="m-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {activeTab === 'investment'
                ? [
                  'Year',
                  'Balance',
                  'Yearly Contribution',
                  'Interest Earned',
                  'Interest + Balance',
                ].map((header) => (
                  <th key={header} className="px-6 py-3">
                    {header}
                  </th>
                ))
                : [
                  'No.',
                  'Payment Date',
                  'Beginning Balance',
                  'Payment',
                  'Principal',
                  'Interest',
                  'Ending Balance',
                ].map((header) => (
                  <th key={header} className="px-6 py-3">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {activeTab === 'investment'
              ? projections.map((projection) => (
                <tr
                  key={projection.fiscalYear}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {projection.fiscalYear}
                  </td>
                  <td className="px-6 py-4">
                    $
                    {projection.balance}
                  </td>
                  <td className="px-6 py-4">
                    $
                    {projection.yearlyContribution}
                  </td>
                  <td className="px-6 py-4">
                    $
                    {projection.interestEarned}
                  </td>
                  <td className="px-6 py-4">
                    $
                    {projection.interestPlusBalance}
                  </td>
                </tr>
              ))
              : paymentSchedule.map((payment) => (
                <tr
                  key={payment.no}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{payment.no}</td>
                  <td className="px-6 py-4">{payment.paymentDate}</td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.beginningBalance)}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.payment)}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.principal)}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.interest)}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.endingBalance)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioFive;
