import React from 'react';
import Chart from 'react-apexcharts';

const SwtSalariesChart = () => {
  // SWT Salaries Comparison Data
  const swtSalariesData = {
    year: 2024,
    monthly_data: [
      {
        month: 1,
        total_salary_wages_paid: 1000000,
        sw_paid_for_swt_deduction: 800000,
        total_swt_tax_deducted: 1060000,
      },
      {
        month: 2,
        total_salary_wages_paid: 1050000,
        sw_paid_for_swt_deduction: 850000,
        total_swt_tax_deducted: 68000,
      },
      {
        month: 3,
        total_salary_wages_paid: 1100000,
        sw_paid_for_swt_deduction: 60000,
        total_swt_tax_deducted: 1100000,
      },
      {
        month: 4,
        total_salary_wages_paid: 280000,
        sw_paid_for_swt_deduction: 870000,
        total_swt_tax_deducted: 71000,
      },
      {
        month: 5,
        total_salary_wages_paid: 1150000,
        sw_paid_for_swt_deduction: 920000,
        total_swt_tax_deducted: 75000,
      },
      {
        month: 6,
        total_salary_wages_paid: 2200000,
        sw_paid_for_swt_deduction: 950000,
        total_swt_tax_deducted: 1900000,
      },
      {
        month: 7,
        total_salary_wages_paid: 2230000,
        sw_paid_for_swt_deduction: 90000,
        total_swt_tax_deducted: 80000,
      },
      {
        month: 8,
        total_salary_wages_paid: 50000,
        sw_paid_for_swt_deduction: 1000000,
        total_swt_tax_deducted: 82000,
      },
      {
        month: 9,
        total_salary_wages_paid: 1270000,
        sw_paid_for_swt_deduction: 1020000,
        total_swt_tax_deducted: 83000,
      },
      {
        month: 10,
        total_salary_wages_paid: 1300000,
        sw_paid_for_swt_deduction: 1040000,
        total_swt_tax_deducted: 85000,
      },
      {
        month: 11,
        total_salary_wages_paid: 20000,
        sw_paid_for_swt_deduction: 1060000,
        total_swt_tax_deducted: 86000,
      },
      {
        month: 12,
        total_salary_wages_paid: 1350000,
        sw_paid_for_swt_deduction: 1080000,
        total_swt_tax_deducted: 88000,
      },
    ],
    totals: {
      total_salary_wages_paid: 14630000,
      total_sw_paid_for_swt_deduction: 11510000,
      total_swt_tax_deducted: 960000,
    },
  };

  const swtSalariesMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const swtSalariesChartOptions = {
    chart: {
      type: 'area',
      height: 320,
      toolbar: { show: false },
      // background: '#fff' // Remove this line to eliminate white background
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [2, 2, 2],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.45,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: swtSalariesMonths,
      title: { text: 'Month' },
      labels: {
        style: { colors: '#888', fontWeight: 500, fontSize: '14px' },
      },
      axisBorder: { show: true, color: '#e0e7ef' }, // Ensure border is visible and matches other chart
      axisTicks: { show: true, color: '#e0e7ef' }, // Ensure ticks are visible and matches other chart
      offsetY: 0, // Align with EmployeeLineChart
      position: 'bottom',
    },
    yaxis: {
      labels: {
        style: { colors: '#888', fontWeight: 500, fontSize: '14px' },
        formatter: (val) =>
          val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val,
      },
    },
    legend: {
      position: 'top',
      fontWeight: 700,
      labels: {
        colors: ['#4338ca', '#22c55e', '#f59e42'],
      },
    },
    colors: ['#4338ca', '#22c55e', '#f59e42'],
    tooltip: {
      shared: true,
      intersect: false,
      style: { fontSize: '15px' },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
    },
  };

  const swtSalariesChartSeries = [
    {
      name: 'Total Salary Wages Paid',
      data: swtSalariesData.monthly_data.map((m) => m.total_salary_wages_paid),
    },
    {
      name: 'SW Paid for SWT Deduction',
      data: swtSalariesData.monthly_data.map(
        (m) => m.sw_paid_for_swt_deduction
      ),
    },
    {
      name: 'Total SWT Tax Deducted',
      data: swtSalariesData.monthly_data.map((m) => m.total_swt_tax_deducted),
    },
  ];

  return (
    <Chart
      options={swtSalariesChartOptions}
      series={swtSalariesChartSeries}
      type="area"
      height={320}
    />
  );
};

export default SwtSalariesChart;
