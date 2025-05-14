import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TaxpayersRiskChart = () => {
  const risk_flagged_summary = [
    {
      tax_type: 'gst',
      total_taxpayers: 100000,
      risk_flagged_taxpayers: 2500,
      risk_flagged_percentage: 2.5,
    },
    {
      tax_type: 'swt',
      total_taxpayers: 80000,
      risk_flagged_taxpayers: 3000,
      risk_flagged_percentage: 3.75,
    },
    {
      tax_type: 'cit',
      total_taxpayers: 60000,
      risk_flagged_taxpayers: 1200,
      risk_flagged_percentage: 2.0,
    },
  ];

  // Prepare data for the chart
  const categories = risk_flagged_summary.map((item) =>
    item.tax_type.toUpperCase()
  );
  const totalTaxpayersData = risk_flagged_summary.map(
    (item) => item.total_taxpayers
  );
  const riskFlaggedData = risk_flagged_summary.map(
    (item) => item.risk_flagged_taxpayers
  );

  const series = [
    {
      name: 'Total TaxPayers',
      data: totalTaxpayersData,
    },
    {
      name: 'Risk Flagged',
      data: riskFlaggedData,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    colors: ['#5B5FF6', '#7DD3FC'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '14px',
          colors: '#A3A3C2',
        },
      },
      axisBorder: { show: true, color: '#e0e7ef' },
      axisTicks: { show: true, color: '#e0e7ef' },
      position: 'bottom',
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val / 1000)}K`,
        style: {
          fontSize: '14px',
          colors: '#A3A3C2',
        },
      },
      min: 0,
      max: Math.max(...totalTaxpayersData) * 1.1,
      tickAmount: 4,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      markers: {
        radius: 12,
      },
      labels: {
        colors: ['#5B5FF6', '#7DD3FC'],
      },
    },
    tooltip: {
      y: {
        formatter: (val) =>
          `${val.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const taxType = categories[dataPointIndex];
        const value = series[seriesIndex][dataPointIndex];
        const label = seriesIndex === 0 ? 'Total TaxPayers' : 'Risk Flagged';
        return `<div style="padding:10px 16px;background:#45457A;color:#fff;border-radius:10px;box-shadow:0 2px 8px #0002;">
          <div style="font-size:15px;font-weight:500;">${taxType} - ${label}</div>
          <div style="font-size:18px;font-weight:600;">${value.toLocaleString(
            'en-US'
          )}</div>
        </div>`;
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={320} />
  );
};

export default TaxpayersRiskChart;
