/* eslint-disable react/button-has-type */

'use client';

import { useState } from 'react';
import FCModal, { RowConfig } from '@/components/FCModal';
import InteractiveAnalystTable, {
  RowsConfig,
  ForecastConfig,
} from '@/components/InteractiveAnalystTable.client';
import FinancialLineChart from '@/components/FinancialLineChart';

export type ForecastDashboardWrapperProps = {
  financesByYear: Record<number, any>;
  rows: RowsConfig[];
  yearsToDisplay: number[];
};

export default function ForecastDashboardWrapper({
  financesByYear,
  rows,
  yearsToDisplay,
}: ForecastDashboardWrapperProps): JSX.Element {
  // Build default forecast config for each row key
  const defaultConfig: ForecastConfig = {};
  rows.forEach((r) => {
    if (r.key) defaultConfig[r.key] = { forecastType: 'average', multiplier: 1.5 };
  });

  // Live state for forecast settings
  const [forecastConfig, setForecastConfig] = useState<ForecastConfig>(defaultConfig);
  const [showModal, setShowModal] = useState(false);

  const handleModalSave = (newConfig: Record<string, RowConfig>) => {
    setForecastConfig(newConfig);
    setShowModal(false);
  };

  return (
    <>
      <FinancialLineChart
        financesByYear={financesByYear}
        yearsToDisplay={yearsToDisplay}
        forecastConfig={forecastConfig}
      />
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
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
