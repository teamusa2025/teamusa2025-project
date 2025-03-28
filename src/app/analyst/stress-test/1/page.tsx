'use client';

import React, { useState, useMemo } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange }) => (
  <div className="mb-4 flex items-center">
    <label htmlFor={id} className="w-1/3 text-lg font-medium text-gray-700">
      {label}
      :
    </label>
    <input
      type="number"
      id={id}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
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

const ScenarioOne: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stressEffect, setStressEffect] = useState<boolean>(false);
  const scenarioToggle = 'stress-effect-toggle';
  const [presentValue, setPresentValue] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [termYears, setTermYears] = useState<number>(0);
  const [contribution, setContribution] = useState<number>(0);

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
        yearlyContribution: yearlyContribution > 0 ? yearlyContribution.toFixed(2) : '',
        interestEarned: interestEarned.toFixed(2),
        interestPlusBalance: totalWithInterest.toFixed(2),
      };

      balance = totalWithInterest + yearlyContribution;
      return projection;
    });
  }, [presentValue, interestRate, termYears, contribution]);

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #1</h1>
      <h2 className="mb-8 text-center text-2xl">30% Drop in return rate of investment</h2>
      <hr className="solid" />

      {/* Toggle Switch */}
      <div>
        <label htmlFor={scenarioToggle} className="inline-flex cursor-pointer items-center">
          <input id={scenarioToggle} type="checkbox" value="" className="peer sr-only" />
          <div className="after:top after:start after:content peer relative h-6 w-11 rounded-full
          bg-gray-200 after:absolute after:size-5 after:rounded-full after:border after:border-gray-300
          after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full
          peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
          dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800
          rtl:peer-checked:after:-translate-x-full"
          />
          <span
            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Stress Effect
          </span>
        </label>
      </div>

      <InputField label="Present Value" id="presentValue" value={presentValue} onChange={setPresentValue} />
      <InputField label="Interest Rate (%)" id="interestRate" value={interestRate} onChange={setInterestRate} />
      <InputField label="Term (in years)" id="termYears" value={termYears} onChange={setTermYears} />
      <InputField label="Contribution each year" id="contribution" value={contribution} onChange={setContribution} />

      <div className="m-4 overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-500 text-xs uppercase text-white">
            <tr>
              {['Year', 'Balance', 'Yearly Contribution', 'Interest Earned', 'Interest + Balance'].map((header) => (
                <th scope="col" key={header} className="px-6 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projections.map((projection) => (
              <tr key={projection.fiscalYear} className="border-gray-20 border-b bg-blue-100 hover:bg-blue-200">
                <td className="px-6 py-4 font-medium text-gray-900">{projection.fiscalYear}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  $
                  {projection.balance}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  $
                  {projection.yearlyContribution}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  $
                  {projection.interestEarned}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  $
                  {projection.interestPlusBalance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioOne;
