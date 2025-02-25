'use client';

import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

// Define the structure for data points used in the sustainability models
interface DataPoint {
  year: number;
  value: number;
}

// Define the structure for sustainability models with different stress tests
interface Models {
  [key: string]: {
    [key: string]: DataPoint[];
  };
}

// Sustainability models containing different projections based on stress tests
const sustainabilityModels: Models = {
  Baseline: {
    'Model A': [
      { year: 2020, value: 80 },
      { year: 2021, value: 85 },
      { year: 2022, value: 90 },
    ],
    'Model B': [
      { year: 2020, value: 70 },
      { year: 2021, value: 75 },
      { year: 2022, value: 78 },
    ],
  },
  Recession: {
    'Model A': [
      { year: 2020, value: 75 },
      { year: 2021, value: 78 },
      { year: 2022, value: 80 },
    ],
    'Model B': [
      { year: 2020, value: 65 },
      { year: 2021, value: 70 },
      { year: 2022, value: 72 },
    ],
  },
};

// List of available stress tests for comparison
const stressTests: string[] = ['Baseline', 'Recession'];

export default function SustainabilityComparison() {
  // State to track the selected stress tests for the charts
  const [selectedTest1, setSelectedTest1] = useState<string>(stressTests[0]);
  const [selectedTest2, setSelectedTest2] = useState<string>(stressTests[0]);

  // Helper function to format the data for the chart
  const getChartData = (modelData: DataPoint[]) => modelData.map((entry) => ({
    x: entry.year.toString(), // Convert year to string for better X-axis handling
    y: entry.value,
  }));

  // Helper function to display table data for each model
  const renderTableData = (modelData: DataPoint[]) => (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2 text-left">Year</th>
          <th className="border p-2 text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {modelData.map((data) => (
          <tr key={data.year}>
            <td className="border p-2">{data.year}</td>
            <td className="border p-2">{data.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mx-auto max-w-screen-lg space-y-6 p-6">
      {/* Title of the page */}
      <h1 className="text-center text-2xl font-bold">Sustainability Model Comparison</h1>

      {/* Dropdowns for selecting stress tests, centered above charts */}
      <div className="grid grid-cols-2 justify-center gap-8">
        <div className="text-center">
          <label htmlFor="stressTest1" className="block text-sm md:text-base">
            First Stress Test:
            <select
              id="stressTest1"
              className="mt-1 rounded-md border p-2"
              value={selectedTest1}
              onChange={(e) => setSelectedTest1(e.target.value)}
            >
              {stressTests.map((test) => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="text-center">
          <label htmlFor="stressTest2" className="block text-sm md:text-base">
            Second Stress Test:
            <select
              id="stressTest2"
              className="mt-1 rounded-md border p-2"
              value={selectedTest2}
              onChange={(e) => setSelectedTest2(e.target.value)}
            >
              {stressTests.map((test) => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Charts and tables displayed side by side */}
      <div className="grid grid-cols-2 gap-8">
        {[selectedTest1, selectedTest2].map((selectedTest, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="w-full overflow-auto rounded-lg border p-4 shadow-md">
            <h2 className="text-center text-xl font-semibold">
              {selectedTest}
              Comparison
            </h2>

            {/* Table displaying the model data */}
            <div className="my-4">
              <h3 className="text-center text-lg font-semibold">Model A</h3>
              {renderTableData(sustainabilityModels[selectedTest]['Model A'])}
              <h3 className="mt-4 text-center text-lg font-semibold">Model B</h3>
              {renderTableData(sustainabilityModels[selectedTest]['Model B'])}
            </div>

            {/* Line charts */}
            <LineChart
              dataset={getChartData(sustainabilityModels[selectedTest]['Model A'])}
              xAxis={[{ dataKey: 'x' }]}
              series={[{ dataKey: 'y' }]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
            <LineChart
              dataset={getChartData(sustainabilityModels[selectedTest]['Model B'])}
              xAxis={[{ dataKey: 'x' }]}
              series={[{ dataKey: 'y' }]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
