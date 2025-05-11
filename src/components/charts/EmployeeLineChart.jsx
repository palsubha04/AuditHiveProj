import React from 'react';
import Chart from 'react-apexcharts';

const EmployeeLineChart = ({ options, series }) => (
  <Chart
    options={options}
    series={series}
    type="line"
    height={320}
  />
);

export default EmployeeLineChart;