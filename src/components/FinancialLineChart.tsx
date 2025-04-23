'use client';

import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts';

export type ForecastConfig = Record<
string,
{ forecastType: 'average' | 'multiplier'; multiplier: number }
>;

export type FinanceRecord = {
  year: number;
  [key: string]: number;
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
  // All base fields that support forecasting
  const baseFields = useMemo(
    () => new Set([
      'revenue',
      'netSales',
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
    ]),
    [],
  );

  // Memoize chart data so it's recomputed when inputs change
  const chartData = useMemo(() => {
    // Caches for computed values
    const valueCache: Record<string, Record<number, number>> = {};

    const getDirect = (key: string, year: number): number | undefined => financesByYear[year]?.[key];

    const getValue = (key: string, year: number): number => {
      // init cache
      if (!valueCache[key]) valueCache[key] = {};
      if (valueCache[key][year] !== undefined) return valueCache[key][year];

      // direct data
      const direct = getDirect(key, year);
      if (direct !== undefined) {
        valueCache[key][year] = direct;
        return direct;
      }

      // forecasted base fields
      if (baseFields.has(key)) {
        const cfg = forecastConfig[key] || {
          forecastType: 'average',
          multiplier: 0,
        };
        let result = 0;
        if (cfg.forecastType === 'average') {
          // average of past three years
          const years = [year - 3, year - 2, year - 1];
          const sum = years.reduce((sumAcc, y) => sumAcc + getValue(key, y), 0);
          result = sum / 3;
        } else {
          // multiplier percent
          const prev = getValue(key, year - 1);
          result = prev + prev * (cfg.multiplier / 100);
        }
        valueCache[key][year] = result;
        return result;
      }

      // computed metrics
      let computed = 0;
      switch (key) {
        case 'netSales':
          computed = getValue('revenue', year);
          break;
        case 'grossProfit':
          computed = getValue('revenue', year)
            - (getValue('costOfContracting', year) + getValue('overhead', year));
          break;
        default:
          computed = 0;
      }
      valueCache[key][year] = computed;
      return computed;
    };

    return yearsToDisplay.map((year) => ({
      year,
      revenue: getValue('revenue', year),
      netSales: getValue('netSales', year),
      grossProfit: getValue('grossProfit', year),
    }));
  }, [financesByYear, yearsToDisplay, forecastConfig, baseFields]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Financial Metrics Over Time</h3>
      <LineChart
        xAxis={[
          {
            id: 'x-axis',
            dataKey: 'year',
            tickMinStep: 1, // only show one tick per full year
            valueFormatter: (value) => (Number.isInteger(value) ? String(value) : ''),
            scaleType: 'linear',
          },
        ]}
        dataset={chartData}
        series={[
          { dataKey: 'revenue', label: 'Revenue' },
          { dataKey: 'grossProfit', label: 'Gross Profit' },
        ]}
        height={400}
      />
    </div>
  );
}
