import React from 'react';
import Chart from 'react-apexcharts';

const SwtSalariesChart = ({ options, series }) => (
  <Chart
    options={options}
    series={series}
    type="area"
    height={320}
  />
);

export default SwtSalariesChart;