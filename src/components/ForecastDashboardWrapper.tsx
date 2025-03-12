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

  const handleModalSave = (newConfig: Record<string, RowConfig>) => {
    setForecastConfig(newConfig);
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none
          focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Edit Forecast Settings
        </button>
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
