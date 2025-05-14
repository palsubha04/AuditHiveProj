import React, { useState, useEffect } from 'react';
import EmployeeLineChart from './EmployeeLineChart';

const entityTypes = ['large', 'medium', 'small', 'micro'];

const TotalVsFlaggedLineChart = ({ totalTaxPayerVsRiskFlagged }) => {
  const [selectedCategory, setSelectedCategory] = useState('gst');
  const [chartSeries, setChartSeries] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!totalTaxPayerVsRiskFlagged || !totalTaxPayerVsRiskFlagged[selectedCategory]) {
      setChartSeries([]);
      setChartOptions({});
      return;
    }

    const currentData = totalTaxPayerVsRiskFlagged[selectedCategory];

    const totalSeries = entityTypes.map(
      (type) => currentData[type]?.total_taxpayers ?? 0
    );
    const flaggedSeries = entityTypes.map(
      (type) => currentData[type]?.risk_flagged_taxpayers ?? 0
    );
    const riskPercentages = entityTypes.map(
      (type) => currentData[type]?.risk_flagged_percentage ?? 0
    );

    setChartSeries([
      { name: 'Total Taxpayers', data: totalSeries },
      { name: 'Risk-Flagged Taxpayers', data: flaggedSeries },
    ]);

    setChartOptions({
      chart: {
        type: 'line',
        height: 320,
        toolbar: { show: false },
      },
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Large', 'Medium', 'Small', 'Micro'],
        title: { text: 'Company Size' },
        labels: { style: { fontWeight: 500, color: '#334155', fontSize: '14px' } },
      },
      yaxis: {
        title: { text: 'Taxpayers' },
        labels: { style: { fontWeight: 500, color: '#334155' } },
      },
      legend: { position: 'top', fontWeight: 600 },
      colors: ['#2563eb', '#f97316'],
      markers: { size: 5 },
      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          const sizeLabel = w.globals.categoryLabels[dataPointIndex];
          const total = series[0]?.[dataPointIndex] ?? 0;
          const flagged = series[1]?.[dataPointIndex] ?? 0;
          const percent = riskPercentages?.[dataPointIndex] ?? 0;

          return `
            <div style="padding: 8px 12px;">
              <strong>${sizeLabel}</strong><br/>
              Total Taxpayers: ${total}<br/>
              Risk-Flagged: ${flagged}<br/>
              <span style="color:#f97316;">Risk Percentage: ${percent}%</span>
            </div>
          `;
        },
        style: { fontSize: '15px' },
      },
      grid: { borderColor: '#e0e7ef', strokeDashArray: 4 },
    });
  }, [selectedCategory, totalTaxPayerVsRiskFlagged]);

  const isDataAvailable =
    totalTaxPayerVsRiskFlagged && totalTaxPayerVsRiskFlagged[selectedCategory];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>
          Total Tax Payer vs Risk Flagged
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="gst">GST</option>
          <option value="swt">SWT</option>
          <option value="cit">CIT</option>
        </select>
      </div>
      {isDataAvailable ? (
        <EmployeeLineChart options={chartOptions} series={chartSeries} />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
          No data available for the selected category.
        </div>
      )}
    </>
  );
};

export default TotalVsFlaggedLineChart;
