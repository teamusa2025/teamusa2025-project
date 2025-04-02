'use client';

import React from 'react';
import { LineChart } from '@mui/x-charts';

export type ForecastConfig = Record<
  string,
  { forecastType: 'average' | 'multiplier'; multiplier: number }
>;

export type FinanceRecord = {
  year: number;
  [key: string]: any;
};

type FinancialLineChartProps = {
  financesByYear: Record<number, FinanceRecord>;
  yearsToDisplay: number[];
  forecastConfig: ForecastConfig;
};

export default function FinancialLineChart({
  financesByYear,
  yearsToDisplay,
  forecastConfig,
}: FinancialLineChartProps): JSX.Element {
  // Define which fields are treated as base fields (forecasted)
  const baseFields = new Set([
    'revenue',
    'netSales',
    'costOfContracting',
    'overhead',
  ]);

  // Simple cache to avoid redundant recursive calculations
  const valueCache: Record<string, Record<number, number>> = {};

  const getDirectValue = (key: string, year: number): number | undefined => {
    if (financesByYear[year] && financesByYear[year][key] !== undefined) {
      return financesByYear[year][key];
    }
    return undefined;
  };

  // Recursive function that mimics the table’s getValue logic
  const getValue = (key: string, year: number): number => {
    if (!valueCache[key]) {
      valueCache[key] = {};
    }
    if (valueCache[key][year] !== undefined) return valueCache[key][year];

    // Use direct value if available
    const direct = getDirectValue(key, year);
    if (direct !== undefined) {
      valueCache[key][year] = direct;
      return direct;
    }

    // If key is a base field, compute forecast using the config
    if (baseFields.has(key)) {
      const config = forecastConfig[key] || {
        forecastType: 'average',
        multiplier: 1.5,
      };
      // For the first year (or earlier) return 0 if no direct data
      if (year <= yearsToDisplay[0]) {
        valueCache[key][year] = 0;
        return 0;
      }
      let forecast = 0;
      if (config.forecastType === 'average') {
        forecast =
          (getValue(key, year - 3) +
            getValue(key, year - 2) +
            getValue(key, year - 1)) /
          3;
      } else {
        forecast = getValue(key, year - 1) * (1 + config.multiplier);
      }
      valueCache[key][year] = forecast;
      return forecast;
    }

    // Computed fields
    switch (key) {
      case 'grossProfit': {
        // Gross Profit = Revenue - (Cost of Contracting + Overhead)
        const revenue = getValue('revenue', year);
        const cost =
          getValue('costOfContracting', year) + getValue('overhead', year);
        const gp = revenue - cost;
        valueCache[key][year] = gp;
        return gp;
      }
      default:
        valueCache[key][year] = 0;
        return 0;
    }
  };

  // Prepare chart data: one entry per year with the key metrics
  const chartData = yearsToDisplay.map((year) => ({
    year,
    revenue: getValue('revenue', year),
    netSales: getValue('netSales', year),
    grossProfit: getValue('grossProfit', year),
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Financial Metrics Over Time</h3>
      <LineChart
        xAxis={[{ id: 'x-axis', dataKey: 'year', scale: 'band' }]}
        dataset={chartData}
        series={[
          { dataKey: 'revenue' },
          { dataKey: 'netSales' },
          { dataKey: 'grossProfit' },
        ]}
        height={400}
      />
    </div>
  );
}
