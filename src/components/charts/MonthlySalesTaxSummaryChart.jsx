import React from 'react';
import Chart from 'react-apexcharts';

const chartData = {
  year: 2021,
  monthly_summary: [
    {
      month: 1,
      sales_income: 126373775.73,
      'taxable sales': 54384797.34,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 2,
      sales_income: 129387884.22,
      'taxable sales': 54179870.51,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 3,
      sales_income: 134569635.77,
      'taxable sales': 62371654.93,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 4,
      sales_income: 118586143.34,
      'taxable sales': 54776090.99,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 5,
      sales_income: 136307860.31,
      'taxable sales': 68182368.37,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 6,
      sales_income: 141763424.29,
      'taxable sales': 69061170.58,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 7,
      sales_income: 151393884.66,
      'taxable sales': 75163746.05,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 8,
      sales_income: 145526770.0,
      'taxable sales': 83020949.22,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 9,
      sales_income: 151897371.62,
      'taxable sales': 62101578,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 10,
      sales_income: 151341500.9,
      'taxable sales': 66115749.16,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 11,
      sales_income: 150092957.78,
      'taxable sales': 68516088.32,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
    {
      month: 12,
      sales_income: 189451172.61,
      'taxable sales': 78896612.29,
      zero_rated_sales: 100,
      exempt_sales: 20,
    },
  ],
};

const months = [
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

const chartSeries = [
  {
    name: 'Sales Income',
    data: chartData.monthly_summary.map((m) => m.sales_income),
  },
  {
    name: 'Taxable Sales',
    data: chartData.monthly_summary.map((m) => m['taxable sales']),
  },
  {
    name: 'Zero Rated Sales',
    data: chartData.monthly_summary.map((m) => m.zero_rated_sales),
  },
  {
    name: 'Exempt Sales',
    data: chartData.monthly_summary.map((m) => m.exempt_sales),
  },
];

const chartOptions = {
  chart: {
    type: 'line',
    height: 320,
    toolbar: { show: false },
  },
  stroke: {
    width: [3, 3, 2, 2],
    curve: 'smooth',
  },
  xaxis: {
    categories: months,
    title: { text: 'Month' },
  },
  yaxis: {
    labels: {
      formatter: (val) =>
        val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val,
    },
  },
  legend: {
    position: 'top',
  },
  colors: ['#2563eb', '#22c55e', '#f59e42', '#a0aec0'],
};

const MonthlySalesTaxSummaryChart = () => (
  <div>
    <div
      style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}
    >
      Monthly Sales & Tax Summary ({chartData.year})
    </div>
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={320}
    />
  </div>
);

export default MonthlySalesTaxSummaryChart;
