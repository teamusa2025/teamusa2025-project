/* eslint-disable react/no-array-index-key */

'use client';

import { useState } from 'react';
import FCModal, { RowConfig } from '@/components/FCModal';
import InteractiveAnalystTable, {
  RowsConfig,
  ForecastConfig,
} from '@/components/InteractiveAnalystTable.client';

type ForecastDashboardWrapperProps = {
  financesByYear: Record<number, any>;
  rows: RowsConfig[];
  yearsToDisplay: number[];
};

export default function ForecastDashboardWrapper({
  financesByYear,
  rows,
  yearsToDisplay,
}: ForecastDashboardWrapperProps): JSX.Element {
  const defaultConfig: ForecastConfig = {};
  [
    'revenue',
    'costOfContracting',
    'overhead',
    'salariesAndBenefits',
    'rentAndOverhead',
    'depreciationAndAmortization',
    'interest',
    'interestIncome',
    'interestExpense',
    'gainLossOnDisposalOfAssets',
    'otherIncomeExpense',
    'incomeTaxes',
    'cashEquivalents',
    'accountsReceivable',
    'inventory',
    'propertyPlantAndEquipment',
    'investment',
    'accountsPayable',
    'debtService',
    'taxesPayable',
    'loansPayable',
    'equityCapital',
    'retainedEarnings',
  ].forEach((key) => {
    defaultConfig[key] = { forecastType: 'average', multiplier: 1.5 };
  });

  const [forecastConfig, setForecastConfig] = useState<ForecastConfig>(defaultConfig);
  const [showModal, setShowModal] = useState(false);
  const [stressTests, setStressTests] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleModalSave = (newConfig: Record<string, RowConfig>) => {
    setForecastConfig(newConfig);
    setShowModal(false);
  };

  const toggleStressTest = (index: number) => {
    setStressTests((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      <div className="mt-4 flex items-center space-x-4 pb-4">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-4
          focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Edit Forecast Settings
        </button>
        {stressTests.map((active, index) => (
          <label
            key={index}
            htmlFor={`toggle-${index}`}
            className="relative inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              id={`toggle-${index}`}
              className="peer sr-only"
              checked={active}
              onChange={() => toggleStressTest(index)}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500
            peer-focus:outline-none
            peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-700 dark:peer-focus:ring-green-800"
            >
              <span className="absolute left-0.5 top-0.5 size-5 rounded-full border border-gray-300 bg-white
              transition-transform peer-checked:translate-x-full"
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">{`Stress Test ${index + 1}`}</span>
          </label>
        ))}
      </div>
      {showModal && (
        <FCModal
          initialConfig={forecastConfig}
          onSave={handleModalSave}
          onClose={() => setShowModal(false)}
        />
      )}
      <InteractiveAnalystTable
        financesByYear={financesByYear}
        rows={rows}
        yearsToDisplay={yearsToDisplay}
        forecastConfig={forecastConfig}
      />
    </>
  );
}
