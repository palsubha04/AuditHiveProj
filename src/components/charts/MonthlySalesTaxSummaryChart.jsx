import React from 'react';
import Chart from 'react-apexcharts';

const MonthlySalesTaxSummaryChart = ({ year, options, series }) => (
  <div>
    <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>
      Monthly Sales & Tax Summary ({year})
    </div>
    <Chart
      options={options}
      series={series}
      type="line"
      height={320}
    />
  </div>
);

export default MonthlySalesTaxSummaryChart;