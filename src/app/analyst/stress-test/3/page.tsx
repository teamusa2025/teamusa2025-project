/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useEffect, useMemo } from 'react';

// You can swap this for your InputField component if you prefer
const CellInput: React.FC<{
  id: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ id, value, onChange }) => (
  <input
    id={id}
    type="number"
    step="1"
    className="w-full rounded border border-gray-300 bg-green-100 px-2 py-1 text-right"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);

export default function ScenarioThree() {
  // Toggles
  const [enableStress, setEnableStress] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario3-enableStress') === 'true';
  });
  const [enableResidual, setEnableResidual] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario3-enableResidual') === 'true';
  });

  // Array of 12 years' one-time expense events (only green cells)
  const [events, setEvents] = useState<number[]>(() => {
    if (typeof window === 'undefined') return Array(12).fill(0);
    const stored = sessionStorage.getItem('scenario3-events');
    if (stored) return JSON.parse(stored) as number[];
    // default: $50,000 in the 6th position (2030)
    return [0, 0, 0, 0, 0, 50000, 0, 0, 0, 0, 0, 0];
  });

  // Persist toggles & events
  useEffect(() => {
    sessionStorage.setItem('scenario3-enableStress', String(enableStress));
  }, [enableStress]);
  useEffect(() => {
    sessionStorage.setItem('scenario3-enableResidual', String(enableResidual));
  }, [enableResidual]);
  useEffect(() => {
    sessionStorage.setItem('scenario3-events', JSON.stringify(events));
  }, [events]);

  // Static years 2025–2036
  const startYear = 2025;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  // Stress Effects rows
  const stressRows = useMemo(
    () => years.map((yr, i) => ({
      fiscalYear: yr,
      increase: events[i],
    })),
    [events],
  );

  // Residual Effects: principal = -events, then compound lost interest at 6.02%
  const residualRows = useMemo(() => {
    const rate = 0.0602;
    return stressRows.map((row, idx) => {
      // principal is negative of the event
      const principal = -row.increase;
      // total interests lost = ∑_{j=0..idx} principal_j * ((1+rate)^(idx-j+1)-1)
      let total = 0;
      for (let j = 0; j <= idx; j++) {
        const p = -stressRows[j].increase;
        total += p * ((1 + rate) ** (idx - j + 1) - 1);
      }
      return {
        fiscalYear: row.fiscalYear,
        principal,
        totalLost: total,
      };
    });
  }, [stressRows]);

  // format helpers
  const fmtCur = (n: number) => {
    const abs = Math.abs(Math.round(n));
    const s = abs.toLocaleString();
    return n < 0 ? `($${s})` : `$${s}`;
  };
  const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #3</h1>
      <h2 className="mb-8 text-center text-2xl">
        One-time “X” event of $50,000
      </h2>
      <hr className="solid mb-6" />

      {/* Toggles */}
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

      {/* Stress Effects Table */}
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
              {stressRows.map((r, i) => (
                <tr key={r.fiscalYear} className="border-b bg-blue-100">
                  <td className="px-4 py-2">{r.fiscalYear}</td>
                  <td className="px-4 py-2">
                    <CellInput
                      id={`event-${r.fiscalYear}`}
                      value={r.increase}
                      onChange={(val) => {
                        const arr = [...events];
                        arr[i] = val;
                        setEvents(arr);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Residual Effects Table */}
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
