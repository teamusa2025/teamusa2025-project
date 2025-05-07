/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useEffect, useMemo } from 'react';

// Simple green‐cell number input
const CellInput: React.FC<{
  id: string;
  value: number;
  onChange: (n: number) => void;
}> = ({ id, value, onChange }) => (
  <input
    id={id}
    type="number"
    step="0.01"
    className="w-full rounded border border-gray-300 bg-green-100 px-2 py-1 text-right"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);

export default function ScenarioFour() {
  // --- toggles ---
  const [enableStress, setEnableStress] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario4-enableStress') === 'true';
  });
  const [enableResidual, setEnableResidual] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario4-enableResidual') === 'true';
  });
  // --- input: % increase in operating expenses ---
  const [pctOpEx, setPctOpEx] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const v = sessionStorage.getItem('scenario4-pctOpEx');
    return v ? Number(v) : 0;
  });

  // persist
  useEffect(() => {
    sessionStorage.setItem('scenario4-enableStress', String(enableStress));
  }, [enableStress]);
  useEffect(() => {
    sessionStorage.setItem('scenario4-enableResidual', String(enableResidual));
  }, [enableResidual]);
  useEffect(() => {
    sessionStorage.setItem('scenario4-pctOpEx', String(pctOpEx));
  }, [pctOpEx]);

  // static years
  const startYear = 2025;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
  // TODO: Replace with actual baseline Operating Expenses for each year 2025–2036
  const baselineOpEx = [
    52664, 51466, 53637, /* ... fill remaining 9 values ... */ 0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ];

  // compute stress: increase in expenses = baselineOpEx * pctOpEx%
  const stressRows = useMemo(
    () => years.map((yr, i) => ({
      fiscalYear: yr,
      increase: baselineOpEx[i] * (pctOpEx / 100),
    })),
    [pctOpEx],
  );

  // compute residual: lost interest on extra expenses at 6.02%
  const residualRows = useMemo(() => {
    const rate = 0.0602;
    return stressRows.map((r, idx) => {
      const principal = -r.increase;
      let total = 0;
      for (let j = 0; j <= idx; j++) {
        const p = -stressRows[j].increase;
        total += p * ((1 + rate) ** (idx - j + 1) - 1);
      }
      return { fiscalYear: r.fiscalYear, principal, totalLost: total };
    });
  }, [stressRows]);

  const fmtCur = (n: number) => {
    const a = Math.abs(Math.round(n)).toLocaleString();
    return n < 0 ? `($${a})` : `$${a}`;
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #4</h1>
      <h2 className="mb-8 text-center text-2xl">
        % Increase in Total Operating Expenses
      </h2>
      <hr className="solid mb-6" />

      {/* toggles */}
      <div className="mb-6 flex space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={enableStress}
            onChange={(e) => setEnableStress(e.target.checked)}
            className="form-checkbox text-blue-600"
          />
          <span>Enable Stress Effects</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={enableResidual}
            onChange={(e) => setEnableResidual(e.target.checked)}
            className="form-checkbox text-blue-600"
          />
          <span>Enable Residual Effects</span>
        </label>
      </div>

      {/* input */}
      <div className="mb-8 max-w-xs">
        <label className="mb-2 block font-medium">% Increase in OpEx</label>
        <CellInput id="pctOpEx" value={pctOpEx} onChange={setPctOpEx} />
      </div>

      {/* Stress Effects */}
      {enableStress && (
        <div className="mb-8 overflow-x-auto rounded-lg shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Fiscal Year</th>
                <th className="px-4 py-2">Increase in Expenses</th>
              </tr>
            </thead>
            <tbody>
              {stressRows.map((r) => (
                <tr key={r.fiscalYear} className="border-b bg-blue-100">
                  <td className="px-4 py-2">{r.fiscalYear}</td>
                  <td className="px-4 py-2 text-red-600">
                    {fmtCur(r.increase)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Residual Effects */}
      {enableResidual && (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Fiscal Year</th>
                <th className="px-4 py-2">Principal</th>
                <th className="px-4 py-2">Total Interests Lost</th>
              </tr>
            </thead>
            <tbody>
              {residualRows.map((r) => (
                <tr key={r.fiscalYear} className="border-b bg-blue-100">
                  <td className="px-4 py-2">{r.fiscalYear}</td>
                  <td className="px-4 py-2">{fmtCur(r.principal)}</td>
                  <td className="px-4 py-2">{fmtCur(r.totalLost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
