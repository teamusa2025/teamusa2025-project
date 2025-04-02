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
  const [activeTab, setActiveTab] = useState<'scenario1' | 'scenario2'>('scenario1');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stressEffect, setStressEffect] = useState<boolean>(false);
  const scenarioToggle = 'stress-effect-toggle';

  // Part 1
  const [presentValue1, setPresentValue1] = useState<number>(0);
  const [interestRate1, setInterestRate1] = useState<number>(0);
  const [termYears1, setTermYears1] = useState<number>(0);
  const [contribution1, setContribution1] = useState<number>(0);

  // Part 2
  const [presentValue2, setPresentValue2] = useState<number>(0);
  const [interestRate2, setInterestRate2] = useState<number>(0);
  const [termYears2, setTermYears2] = useState<number>(0);
  const [contribution2, setContribution2] = useState<number>(0);

  const projections1 = useMemo<Projection[]>(() => {
    if (presentValue1 <= 0 || termYears1 <= 0) return [];

    let balance = presentValue1;
    const rate = interestRate1 / 100;
    const yearlyContribution = contribution1;

    return Array.from({ length: termYears1 }, (_, year) => {
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
  }, [presentValue1, interestRate1, termYears1, contribution1]);

  const projections2 = useMemo<Projection[]>(() => {
    if (presentValue2 <= 0 || termYears2 <= 0) return [];

    let balance = presentValue2;
    const rate = interestRate2 / 100;
    const yearlyContribution = contribution2;

    return Array.from({ length: termYears2 }, (_, year) => {
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
  }, [presentValue2, interestRate2, termYears2, contribution2]);

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

      {/* Tab Navigation */}
      <div className="my-4 flex border-b">
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className={`px-4 py-2 ${activeTab === 'scenario1' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('scenario1')}
        >
          Scenario 1
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className={`px-4 py-2 ${activeTab === 'scenario2' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('scenario2')}
        >
          Scenario 2
        </button>
      </div>
      {activeTab === 'scenario1' ? (
        <div>
          <InputField label="Present Value" id="presentValue1" value={presentValue1} onChange={setPresentValue1} />
          <InputField label="Interest Rate (%)" id="interestRate1" value={interestRate1} onChange={setInterestRate1} />
          <InputField label="Term (in years)" id="termYears1" value={termYears1} onChange={setTermYears1} />
          <InputField
            label="Contribution each year"
            id="contribution1"
            value={contribution1}
            onChange={setContribution1}
          />

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
                {projections1.map((projection) => (
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
      ) : (
        <div>
          <InputField label="Present Value" id="presentValue2" value={presentValue2} onChange={setPresentValue2} />
          <InputField label="Interest Rate (%)" id="interestRate2" value={interestRate2} onChange={setInterestRate2} />
          <InputField label="Term (in years)" id="termYears2" value={termYears2} onChange={setTermYears2} />
          <InputField
            label="Contribution each year"
            id="contribution2"
            value={contribution2}
            onChange={setContribution2}
          />

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
                {projections2.map((projection) => (
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
      )}
    </div>
  );
};

export default ScenarioOne;
