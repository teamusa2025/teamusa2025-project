/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import InputField from '../../../../components/InputField';

interface StressEffectRow {
  fiscalYear: number;
  totalRevenue: number;
  decreaseInRevenue: number;
}

interface ResidualEffectRow {
  fiscalYear: number;
  totalInterestsLost: number;
}

export default function ScenarioTwo() {
  // toggles
  const [enableStress, setEnableStress] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario2-enableStress') === 'true';
  });
  const [enableResidual, setEnableResidual] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('scenario2-enableResidual') === 'true';
  });

  // input
  const [pctDecrease, setPctDecrease] = useState<number>(() => {
    if (typeof window === 'undefined') return -2.25;
    const v = sessionStorage.getItem('scenario2-pctDecrease');
    return v !== null ? Number(v) : -2.25;
  });

  // persist toggles & input
  useEffect(() => {
    sessionStorage.setItem('scenario2-enableStress', String(enableStress));
  }, [enableStress]);
  useEffect(() => {
    sessionStorage.setItem('scenario2-enableResidual', String(enableResidual));
  }, [enableResidual]);
  useEffect(() => {
    sessionStorage.setItem('scenario2-pctDecrease', String(pctDecrease));
  }, [pctDecrease]);

  // static revenues 2025–2036
  const revenues = [
    153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391,
    174977, 177602, 180266,
  ];
  const startYear = 2025;

  // stress effects
  const stressRows = useMemo<StressEffectRow[]>(
    () => revenues.map((rev, i) => {
      const year = startYear + i;
      // decrease = revenue * pctDecrease%
      const dec = rev * (pctDecrease / 100);
      return { fiscalYear: year, totalRevenue: rev, decreaseInRevenue: dec };
    }),
    [pctDecrease],
  );

  // residual effects (compound lost interest at 6.02%)
  const residualRows = useMemo<ResidualEffectRow[]>(() => {
    const rate = 0.0602;
    return stressRows.map((row, i) => {
      // total interests lost = sum over j=0..i of row.decrease * ((1+rate)^(i-j+1)-1)
      let total = 0;
      for (let j = 0; j <= i; j++) {
        const base = stressRows[j].decreaseInRevenue;
        total += base * ((1 + rate) ** (i - j + 1) - 1);
      }
      return { fiscalYear: row.fiscalYear, totalInterestsLost: total };
    });
  }, [stressRows]);

  // helper for currency + parentheses
  const fmt = (val: number) => {
    const abs = Math.abs(Math.round(val));
    const s = abs.toLocaleString();
    return val < 0 ? `($${s})` : `$${s}`;
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl p-6">
      <h1 className="mt-20 text-center text-3xl font-bold">Scenario #2</h1>
      <h2 className="mb-8 text-center text-2xl">
        60% sustained drop in return rate of Investment
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

      {/* Input */}
      <div className="mb-6 max-w-xs">
        <InputField
          id="pctDecrease"
          label="% Decrease in Revenues"
          value={pctDecrease}
          onChange={setPctDecrease}
        />
      </div>

      {/* Stress Effects Table */}
      {enableStress && (
        <div className="mb-8 overflow-x-auto rounded-lg shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Fiscal Year</th>
                <th className="px-4 py-2">Total Revenues</th>
                <th className="px-4 py-2">Decrease in Revenues</th>
              </tr>
            </thead>
            <tbody>
              {stressRows.map((r) => (
                <tr key={r.fiscalYear} className="border-b bg-blue-100">
                  <td className="px-4 py-2">{r.fiscalYear}</td>
                  <td className="px-4 py-2">
                    $
                    {r.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-red-600">
                    {fmt(r.decreaseInRevenue)}
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
                <th className="px-4 py-2">Total Interests Lost</th>
              </tr>
            </thead>
            <tbody>
              {residualRows.map((r) => (
                <tr key={r.fiscalYear} className="border-b bg-blue-100">
                  <td className="px-4 py-2">{r.fiscalYear}</td>
                  <td className="px-4 py-2">{fmt(r.totalInterestsLost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
