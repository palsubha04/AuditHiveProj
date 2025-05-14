import React from 'react';
import Chart from 'react-apexcharts';

const EmployeeLineChart = () => {
  const employeeData = {
    year: 2024,
    monthly_data: [
      { month: '01', employees_on_payroll: 1200, employees_paid_swt: 950 },
      { month: '02', employees_on_payroll: 1250, employees_paid_swt: 980 },
      { month: '03', employees_on_payroll: 1300, employees_paid_swt: 1000 },
      { month: '04', employees_on_payroll: 1280, employees_paid_swt: 1020 },
      { month: '05', employees_on_payroll: 1350, employees_paid_swt: 1100 },
      { month: '06', employees_on_payroll: 1400, employees_paid_swt: 1150 },
      { month: '07', employees_on_payroll: 1425, employees_paid_swt: 1200 },
      { month: '08', employees_on_payroll: 1450, employees_paid_swt: 1250 },
      { month: '09', employees_on_payroll: 1500, employees_paid_swt: 1300 },
      { month: '10', employees_on_payroll: 1520, employees_paid_swt: 1350 },
      { month: '11', employees_on_payroll: 1550, employees_paid_swt: 1400 },
      { month: '12', employees_on_payroll: 1600, employees_paid_swt: 1450 },
    ],
  };
  const employeeMonths = [
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
  const employeeLineSeries = [
    {
      name: 'Employees on Payroll',
      data: employeeData.monthly_data.map((m) => m.employees_on_payroll),
    },
    {
      name: 'Employees Paid SWT',
      data: employeeData.monthly_data.map((m) => m.employees_paid_swt),
    },
  ];
  const employeeLineOptions = {
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
      categories: employeeMonths,
      title: { text: 'Month' },
      labels: {
        style: { fontWeight: 500, color: '#334155', fontSize: '14px' },
      },
    },
    yaxis: {
      title: { text: 'Employees' },
      labels: {
        style: { fontWeight: 500, color: '#334155' },
      },
    },
    legend: {
      position: 'top',
      fontWeight: 600,
    },
    colors: ['#2563eb', '#22c55e'],
    markers: {
      size: 5,
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: { fontSize: '15px' },
    },
    grid: {
      borderColor: '#e0e7ef',
      strokeDashArray: 4,
    },
  };
  return (
    <Chart
      options={employeeLineOptions}
      series={employeeLineSeries}
      type="line"
      height={320}
    />
  );
};

export default EmployeeLineChart;
