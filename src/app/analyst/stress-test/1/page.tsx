/* eslint-disable no-empty */
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
  const [presentValueInput1, setPresentValueInput1] = useState<number>(0);
  const [interestRateInput1, setInterestRateInput1] = useState<number>(0);
  const [termYearsInput1, setTermYearsInput1] = useState<number>(0);
  const [contributionInput1, setContributionInput1] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Fetch the single stress test input (id=1)
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/stressTestOneInput');
        if (!res.ok) throw new Error('Failed to load stress test data');
        const data = await res.json();
        setPresentValueInput1(data.presentValue);
        setInterestRateInput1(data.interestRate);
        setTermYearsInput1(data.termYears);
        setContributionInput1(data.monthlyContributionPercent);
      } catch (e: any) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Save updated stress test input
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/stressTestOneInput', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentValue: presentValueInput1,
          interestRate: interestRateInput1,
          termYears: termYearsInput1,
          monthlyContributionPercent: contributionInput1,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch (e: any) {
    } finally {
      setSaving(false);
    }
  };

  const projectionsInput1 = useMemo<Projection[]>(() => {
    if (presentValueInput1 <= 0 || termYearsInput1 <= 0) return [];
    let balance = presentValueInput1;
    const rate = interestRateInput1 / 100;
    const yearlyContribution = contributionInput1;
    return Array.from({ length: termYearsInput1 }, (_, year) => {
      const interestEarned = balance * rate;
      const totalWithInterest = balance + interestEarned;
      const proj = {
        fiscalYear: year + 1,
        balance: balance.toFixed(2),
        yearlyContribution:
          yearlyContribution > 0 ? yearlyContribution.toFixed(2) : '',
        interestEarned: interestEarned.toFixed(2),
        interestPlusBalance: totalWithInterest.toFixed(2),
      };
      balance = totalWithInterest + yearlyContribution;
      return proj;
    });
  }, [
    presentValueInput1,
    interestRateInput1,
    termYearsInput1,
    contributionInput1,
  ]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">
        Scenario #1
        {scenarioId}
      </h1>
      <h2 className="mb-8 text-center text-2xl">
        30% Drop in return rate of investment
      </h2>
      <hr className="solid mb-6" />

      <div className="mb-6 grid grid-cols-2 gap-4">
        <InputField
          id="presentValueInput1"
          label="Present Value"
          value={presentValueInput1}
          onChange={setPresentValueInput1}
        />
        <InputField
          id="interestRateInput1"
          label="Interest Rate (%)"
          value={interestRateInput1}
          onChange={setInterestRateInput1}
        />
        <InputField
          id="termYearsInput1"
          label="Term (years)"
          value={termYearsInput1}
          onChange={setTermYearsInput1}
        />
        <InputField
          id="contributionInput1"
          label="Contribution %"
          value={contributionInput1}
          onChange={setContributionInput1}
        />
      </div>
      <button
        className="mb-8 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>

      <div className="m-4 overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-500 text-xs uppercase text-white">
            <tr>
              <th className="px-6 py-3">Year</th>
              <th className="px-6 py-3">Balance</th>
              <th className="px-6 py-3">Contrib</th>
              <th className="px-6 py-3">Interest</th>
              <th className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {projectionsInput1.map((p) => (
              <tr
                key={p.fiscalYear}
                className="border-b bg-blue-100 hover:bg-blue-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {p.fiscalYear}
                </td>
                <td className="px-6 py-4">
                  $
                  {p.balance}
                </td>
                <td className="px-6 py-4">
                  $
                  {p.yearlyContribution}
                </td>
                <td className="px-6 py-4">
                  $
                  {p.interestEarned}
                </td>
                <td className="px-6 py-4">
                  $
                  {p.interestPlusBalance}
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
