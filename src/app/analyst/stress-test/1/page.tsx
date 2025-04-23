/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import InputField from '../../../../components/InputField';

interface ScenarioOneProps {
  scenarioId: number;
}

interface Projection {
  fiscalYear: number;
  balance: string;
  yearlyContribution: string;
  interestEarned: string;
  interestPlusBalance: string;
}

const ScenarioOne: React.FC<ScenarioOneProps> = ({ scenarioId }) => {
  const [activeTab1, setActiveTab1] = useState<'userInput1' | 'userInput2'>('userInput1');
  // Toggle states with session storage initialization
  const [enableScenarioEffect1, setEnableScenarioEffect1] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(`scenario${scenarioId}-enableScenarioEffect1`) === 'true';
  });

  const [enableResidualEffect1, setEnableResidualEffect1] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(`scenario${scenarioId}-enableResidualEffect1`) === 'true';
  });

  // Session persistence for toggles
  useEffect(() => {
    sessionStorage.setItem(`scenario${scenarioId}-enableScenarioEffect1`, enableScenarioEffect1.toString());
  }, [enableScenarioEffect1, scenarioId]);

  useEffect(() => {
    sessionStorage.setItem(`scenario${scenarioId}-enableResidualEffect1`, enableResidualEffect1.toString());
  }, [enableResidualEffect1, scenarioId]);

  // Utility for consistent keying
  const getKey1 = (field: string) => `scenario${scenarioId}-1-${field}`;

  // User Input 1
  const [presentValueInput1, setPresentValueInput1] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('presentValueInput1'))) || 0;
  });
  const [interestRateInput1, setInterestRateInput1] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('interestRateInput1'))) || 0;
  });
  const [termYearsInput1, setTermYearsInput1] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('termYearsInput1'))) || 0;
  });
  const [contributionInput1, setContributionInput1] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('contributionInput1'))) || 0;
  });

  // User Input 2
  const [presentValueInput2, setPresentValueInput2] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('presentValueInput2'))) || 0;
  });
  const [interestRateInput2, setInterestRateInput2] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('interestRateInput2'))) || 0;
  });
  const [termYearsInput2, setTermYearsInput2] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('termYearsInput2'))) || 0;
  });
  const [contributionInput2, setContributionInput2] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return Number(sessionStorage.getItem(getKey1('contributionInput2'))) || 0;
  });

  // Save input values to sessionStorage on change
  useEffect(() => { sessionStorage.setItem(getKey1('presentValueInput1'), presentValueInput1.toString()); }, [presentValueInput1]);
  useEffect(() => { sessionStorage.setItem(getKey1('interestRateInput1'), interestRateInput1.toString()); }, [interestRateInput1]);
  useEffect(() => { sessionStorage.setItem(getKey1('termYearsInput1'), termYearsInput1.toString()); }, [termYearsInput1]);
  useEffect(() => { sessionStorage.setItem(getKey1('contributionInput1'), contributionInput1.toString()); }, [contributionInput1]);
  useEffect(() => { sessionStorage.setItem(getKey1('presentValueInput2'), presentValueInput2.toString()); }, [presentValueInput2]);
  useEffect(() => { sessionStorage.setItem(getKey1('interestRateInput2'), interestRateInput2.toString()); }, [interestRateInput2]);
  useEffect(() => { sessionStorage.setItem(getKey1('termYearsInput2'), termYearsInput2.toString()); }, [termYearsInput2]);
  useEffect(() => { sessionStorage.setItem(getKey1('contributionInput2'), contributionInput2.toString()); }, [contributionInput2]);

  // Calculate projections
  const projectionsInput1 = useMemo<Projection[]>(() => {
    if (presentValueInput1 <= 0 || termYearsInput1 <= 0) return [];
    let balance = presentValueInput1;
    const rate = interestRateInput1 / 100;
    const yearlyContribution = contributionInput1;
    return Array.from({ length: termYearsInput1 }, (_, year) => {
      const interestEarned = balance * rate;
      const totalWithInterest = balance + interestEarned;
      const projection = {
        fiscalYear: year + 1,
        balance: balance.toFixed(2),
        yearlyContribution: yearlyContribution > 0 ? yearlyContribution.toFixed(2) : '',
        interestEarned: interestEarned.toFixed(2),
        interestPlusBalance: totalWithInterest.toFixed(2),
      };
      balance = totalWithInterest + yearlyContribution;
      return projection;
    });
  }, [presentValueInput1, interestRateInput1, termYearsInput1, contributionInput1]);

  const projectionsInput2 = useMemo<Projection[]>(() => {
    if (presentValueInput2 <= 0 || termYearsInput2 <= 0) return [];
    let balance = presentValueInput2;
    const rate = interestRateInput2 / 100;
    const yearlyContribution = contributionInput2;
    return Array.from({ length: termYearsInput2 }, (_, year) => {
      const interestEarned = balance * rate;
      const totalWithInterest = balance + interestEarned;
      const projection = {
        fiscalYear: year + 1,
        balance: balance.toFixed(2),
        yearlyContribution: yearlyContribution > 0 ? yearlyContribution.toFixed(2) : '',
        interestEarned: interestEarned.toFixed(2),
        interestPlusBalance: totalWithInterest.toFixed(2),
      };
      balance = totalWithInterest + yearlyContribution;
      return projection;
    });
  }, [presentValueInput2, interestRateInput2, termYearsInput2, contributionInput2]);

  // Calculate effects with proper memoization
  const { scenarioEffect1, residualEffect1 } = useMemo(() => {
    if (projectionsInput1.length < 12 || projectionsInput2.length < 12) {
      return { scenarioEffect1: [], residualEffect1: [] };
    }

    // Calculate scenario effects using subtraction (per your correction)
    const scenarioEffect1 = projectionsInput1.slice(0, 12).map((p, i) => parseFloat(p.interestPlusBalance) - parseFloat(projectionsInput2[i].interestPlusBalance));

    // Calculate residual effects using scenario effects
    const residualEffect1 = scenarioEffect1.map((_, yearIndex) => {
      let total = 0;
      for (let i = 0; i <= yearIndex; i++) {
        const exponent = (yearIndex + 1) - i;
        const base = scenarioEffect1[i];
        total += base * 1.0602 ** exponent - base;
      }
      return Number(total.toFixed(2));
    });

    return { scenarioEffect1, residualEffect1 };
  }, [projectionsInput1, projectionsInput2]);

  // Session storage persistence
  useEffect(() => {
    if (typeof window !== 'undefined' && scenarioEffect1.length > 0) {
      sessionStorage.setItem(`scenarioEffect1-${scenarioId}`, JSON.stringify(scenarioEffect1));
      sessionStorage.setItem(`residualEffect1-${scenarioId}`, JSON.stringify(residualEffect1));
    }
  }, [scenarioEffect1, residualEffect1, scenarioId]);

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">
        Scenario #1
        {scenarioId}
      </h1>
      <h2 className="mb-8 text-center text-2xl">30% Drop in return rate of investment</h2>
      <hr className="solid" />

      {/* Toggle Switches */}
      <div className="mb-8 space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={enableScenarioEffect1}
            onChange={(e) => setEnableScenarioEffect1(e.target.checked)}
            className="form-checkbox size-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Enable Scenario Effect</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={enableResidualEffect1}
            onChange={(e) => setEnableResidualEffect1(e.target.checked)}
            className="form-checkbox size-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Enable Residual Effects</span>
        </label>
      </div>

      {/* User Input Tabs */}
      <div className="my-4 flex border-b">
        <button
          className={`px-4 py-2 ${activeTab1 === 'userInput1' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab1('userInput1')}
        >
          User Input 1
        </button>
        <button
          className={`px-4 py-2 ${activeTab1 === 'userInput2' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab1('userInput2')}
        >
          User Input 2
        </button>
      </div>

      {/* User Inputs */}
      {activeTab1 === 'userInput1' ? (
        <div>
          <InputField label="Present Value" id="presentValueInput1" value={presentValueInput1} onChange={setPresentValueInput1} />
          <InputField label="Interest Rate (%)" id="interestRateInput1" value={interestRateInput1} onChange={setInterestRateInput1} />
          <InputField label="Term (in years)" id="termYearsInput1" value={termYearsInput1} onChange={setTermYearsInput1} />
          <InputField
            label="Contribution each year"
            id="contributionInput1"
            value={contributionInput1}
            onChange={setContributionInput1}
          />
        </div>
      ) : (
        <div>
          <InputField label="Present Value" id="presentValueInput2" value={presentValueInput2} onChange={setPresentValueInput2} />
          <InputField label="Interest Rate (%)" id="interestRateInput2" value={interestRateInput2} onChange={setInterestRateInput2} />
          <InputField label="Term (in years)" id="termYearsInput2" value={termYearsInput2} onChange={setTermYearsInput2} />
          <InputField
            label="Contribution each year"
            id="contributionInput2"
            value={contributionInput2}
            onChange={setContributionInput2}
          />
        </div>
      )}

      {/* Projections Table */}
      <div className="m-4 overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-500 text-xs uppercase text-white">
            <tr>
              {['Year', 'Balance', 'Contribution', 'Interest', 'Interest+Balance'].map((header) => (
                <th key={header} className="px-6 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(activeTab1 === 'userInput1' ? projectionsInput1 : projectionsInput2).map((projection) => (
              <tr key={projection.fiscalYear} className="border-b border-gray-200 bg-blue-100 hover:bg-blue-200">
                <td className="px-6 py-4 font-medium text-gray-900">{projection.fiscalYear}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  $
                  {projection.balance}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  $
                  {projection.yearlyContribution}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  $
                  {projection.interestEarned}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
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
