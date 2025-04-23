/* eslint-disable react/button-has-type */

'use client';

import { useState } from 'react';
import FCModal, { RowConfig } from '@/components/FCModal';
import InteractiveAnalystTable, {
  RowsConfig,
  ForecastConfig,
} from '@/components/InteractiveAnalystTable.client';
import FinancialLineChart from '@/components/FinancialLineChart';
import Switch from '@mui/material/Switch';

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

  const [activeStressTests, setActiveStressTests] = useState<boolean[]>(
    Array(6).fill(false),
  );

  const toggleStressTest = (index: number) => {
    const updated = [...activeStressTests];
    updated[index] = !updated[index];
    setActiveStressTests(updated);
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
        <div className="flex flex-wrap items-center gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm">
                Stress Test #
                {index + 1}
              </span>
              <Switch
                checked={activeStressTests[index]}
                onChange={() => toggleStressTest(index)}
                inputProps={{ 'aria-label': `Stress Test ${index + 1}` }}
              />
            </div>
          ))}
        </div>
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
