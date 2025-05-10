import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';

const taxTypes = ['GST', 'CIT', 'SWT'];

// Chart data
const chartData = {
  year: 2021,
  monthly_summary: [
    { month: 1, sales_income: 126373775.73, 'taxable sales': 54384797.34, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 2, sales_income: 129387884.22, 'taxable sales': 54179870.51, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 3, sales_income: 134569635.77, 'taxable sales': 62371654.93, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 4, sales_income: 118586143.34, 'taxable sales': 54776090.99, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 5, sales_income: 136307860.31, 'taxable sales': 68182368.37, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 6, sales_income: 141763424.29, 'taxable sales': 69061170.58, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 7, sales_income: 151393884.66, 'taxable sales': 75163746.05, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 8, sales_income: 145526770.0, 'taxable sales': 83020949.22, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 9, sales_income: 151897371.62, 'taxable sales': 62101578., zero_rated_sales: 100, exempt_sales: 20 },
    { month: 10, sales_income: 151341500.9, 'taxable sales': 66115749.16, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 11, sales_income: 150092957.78, 'taxable sales': 68516088.32, zero_rated_sales: 100, exempt_sales: 20 },
    { month: 12, sales_income: 189451172.61, 'taxable sales': 78896612.29, zero_rated_sales: 100, exempt_sales: 20 }
  ]
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const chartSeries = [
  {
    name: 'Sales Income',
    data: chartData.monthly_summary.map(m => m.sales_income)
  },
  {
    name: 'Taxable Sales',
    data: chartData.monthly_summary.map(m => m['taxable sales'])
  },
  {
    name: 'Zero Rated Sales',
    data: chartData.monthly_summary.map(m => m.zero_rated_sales)
  },
  {
    name: 'Exempt Sales',
    data: chartData.monthly_summary.map(m => m.exempt_sales)
  }
];

const chartOptions = {
  chart: {
    type: 'line',
    height: 320,
    toolbar: { show: false }
  },
  stroke: {
    width: [3, 3, 2, 2],
    curve: 'smooth'
  },
  xaxis: {
    categories: months,
    title: { text: 'Month' }
  },
  yaxis: {
    labels: { formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val }
  },
  legend: {
    position: 'top'
  },
  colors: ['#2563eb', '#22c55e', '#f59e42', '#a0aec0']
};

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 320,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 6,
      columnWidth: '50%'
    }
  },
  xaxis: {
    categories: months,
    title: { text: 'Month' }
  },
  yaxis: {
    labels: { formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val }
  },
  legend: {
    position: 'top'
  },
  colors: ['#2563eb', '#22c55e', '#f59e42', '#a0aec0']
};

// Add area chart options
const areaChartOptions = {
  chart: {
    type: 'area',
    height: 320,
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: [3, 3, 2, 2]
  },
  xaxis: {
    categories: months,
    title: { text: 'Month' }
  },
  yaxis: {
    labels: { formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val }
  },
  legend: {
    position: 'top'
  },
  colors: ['#2563eb', '#22c55e', '#f59e42', '#a0aec0'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  }
};

const customAreaChartOptions = {
  chart: {
    type: 'area',
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent'
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 0 // No border line, just fill
  },
  fill: {
    type: 'solid',
    colors: ['#7c3aed'],
    opacity: 0.85
  },
  xaxis: {
    categories: months,
    labels: {
      style: { colors: '#888', fontWeight: 500, fontSize: '14px' }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: { colors: '#888', fontWeight: 500, fontSize: '14px' },
      formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val
    },
    grid: { show: true }
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } }
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '15px' }
  },
  legend: { show: false },
  colors: ['#7c3aed'],
  markers: { size: 0 }
};

const customAreaChartSeries = [
  {
    name: 'Sales Income',
    data: chartData.monthly_summary.map(m => m.sales_income)
  }
];

// Combo (Bar + Line) Chart Options and Series
const comboChartOptions = {
  chart: {
    height: 350,
    type: 'line',
    toolbar: { show: false },
    background: '#fff'
  },
  stroke: {
    width: [0, 4],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '40%',
      borderRadius: 6
    }
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0],
    style: {
      colors: ['#3b0764']
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      borderRadius: 4,
      padding: 4,
      opacity: 0.8,
      borderWidth: 1,
      borderColor: '#7c3aed'
    },
    formatter: function (val, opts) {
      // Only show labels for bar series
      if (opts.seriesIndex === 0) {
        return Math.round(val).toLocaleString();
      }
      return '';
    }
  },
  xaxis: {
    categories: months,
    title: { text: 'Month' },
    labels: {
      style: { fontWeight: 600, color: '#3b0764', fontSize: '14px' }
    }
  },
  yaxis: [
    {
      title: { text: 'Sales Income', style: { color: '#1e293b' } },
      labels: {
        style: { color: '#1e293b', fontWeight: 500 },
        formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val
      }
    },
    {
      opposite: true,
      title: { text: 'Taxable Sales', style: { color: '#6366f1' } },
      labels: {
        style: { color: '#6366f1', fontWeight: 500 },
        formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val
      },
      min: 0
    }
  ],
  colors: ['#7c3aed', '#6366f1'],
  legend: {
    position: 'top',
    fontWeight: 600
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: { fontSize: '15px' }
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  }
};

const comboChartSeries = [
  {
    name: 'Sales Income',
    type: 'column',
    data: chartData.monthly_summary.map(m => m.sales_income)
  },
  {
    name: 'Taxable Sales',
    type: 'line',
    data: chartData.monthly_summary.map(m => m['taxable sales'])
  }
];

const Compliance = () => {
  const [selectedTax, setSelectedTax] = useState('GST');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    // You can use selectedTax, fromDate, toDate
  };

  return (
    <Layout>
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <FontAwesomeIcon icon={faFilter} style={{ color: '#2563eb', fontSize: 22 }} />
          <Dropdown onSelect={setSelectedTax}>
            <Dropdown.Toggle variant="link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18, padding: 0 }}>
              {selectedTax} <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 14, marginLeft: 4 }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {taxTypes.map((type) => (
                <Dropdown.Item key={type} eventKey={type}>
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ position: 'relative' }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', left: 10, top: 10, color: '#222' }} />
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                placeholder="From"
                style={{
                  padding: '8px 8px 8px 32px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#f3f4f6',
                  width: 120
                }}
              />
            </span>
            <span style={{ position: 'relative' }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', left: 10, top: 10, color: '#222' }} />
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                placeholder="To"
                style={{
                  padding: '8px 8px 8px 32px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#f3f4f6',
                  width: 120
                }}
              />
            </span>
          </div>
          <button
            onClick={handleSearch}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 24px',
              fontWeight: 500,
              marginLeft: 8
            }}
          >
            Search
          </button>
        </div>
      </div>
      {/* Stats Card Section */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          marginTop: 8,
          border: '1px solid #f1f5f9',
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 0 0 0 #0000',
          padding: '32px 24px',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: 900,
        }}
      >
        {/* Total Tax Paid */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>89,935</div>
          <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Total Tax paid</div>
          <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 18 }}>↑</span> 10.2% <span style={{ color: '#a0aec0', fontWeight: 400, marginLeft: 4 }}>Than last year</span>
          </div>
        </div>
        <div style={{ width: 1, background: '#f1f5f9', height: 60, margin: '0 24px' }} />
        {/* Total Income */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>225748757</div>
          <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Total Income</div>
          <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 18 }}>↑</span> 3.1% <span style={{ color: '#a0aec0', fontWeight: 400, marginLeft: 4 }}>Than last year</span>
          </div>
        </div>
        <div style={{ width: 1, background: '#f1f5f9', height: 60, margin: '0 24px' }} />
        {/* Risk Score */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#ef4444' }}>500</div>
          <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Risk Score</div>
          <div style={{ color: '#ef4444', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 18 }}>↓</span> 2.56% <span style={{ color: '#a0aec0', fontWeight: 400, marginLeft: 4 }}>Than last year</span>
          </div>
        </div>
        <div style={{ width: 1, background: '#f1f5f9', height: 60, margin: '0 24px' }} />
        {/* Total Refundable Income */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>22029</div>
          <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Total Refundable Income</div>
          <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 18 }}>↑</span> 7.2 <span style={{ color: '#a0aec0', fontWeight: 400, marginLeft: 4 }}>Than last year</span>
          </div>
        </div>
        <div style={{ width: 1, background: '#f1f5f9', height: 60, margin: '0 24px' }} />
        {/* % Growth */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>80</div>
          <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>% Growth</div>
          <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 18 }}>↑</span> 7.2% <span style={{ color: '#a0aec0', fontWeight: 400, marginLeft: 4 }}>Than last year</span>
          </div>
        </div>
      </div>
      {/* End Stats Card Section */}

      {/* Chart Card Section */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>
            Monthly Sales & Tax Summary ({chartData.year})
          </div>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={320}
          />
        </div>
        {/* End Chart Card Section */}

        {/* Bar Chart Card Section */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>
            Monthly Sales & Tax Bar Chart ({chartData.year})
          </div>
          <Chart
            options={barChartOptions}
            series={chartSeries}
            type="bar"
            height={320}
          />
        </div>
        {/* End Bar Chart Card Section */}

        {/* Area Chart Card Section */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>
            Monthly Sales & Tax Area Chart ({chartData.year})
          </div>
          <Chart
            options={areaChartOptions}
            series={chartSeries}
            type="area"
            height={320}
          />
        </div>
        {/* End Area Chart Card Section */}

        {/* Custom Area Chart Card Section */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #ede9fe',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #ede9fe 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #ede9fe55',
            padding: '32px 32px 16px 32px',
            minWidth: 900,
            maxWidth: 1200
          }}
        >
          <div style={{
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 18,
            color: '#7c3aed',
            letterSpacing: 1
          }}>
            Sales Income Trend ({chartData.year})
          </div>
          <Chart
            options={customAreaChartOptions}
            series={customAreaChartSeries}
            type="area"
            height={320}
          />
        </div>
        {/* End Custom Area Chart Card Section */}

        {/* Combo Bar + Line Chart Card Section */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #ede9fe',
            borderRadius: 18,
            background: '#fff',
            boxShadow: '0 2px 16px 0 #ede9fe55',
            padding: '32px 32px 16px 32px',
            minWidth: 900,
            maxWidth: 1200
          }}
        >
          <div style={{
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 18,
            color: '#6366f1',
            letterSpacing: 1
          }}>
            Sales Income & Taxable Sales Comparison ({chartData.year})
          </div>
          <Chart
            options={comboChartOptions}
            series={comboChartSeries}
            type="line"
            height={350}
          />
        </div>
        {/* End Combo Bar + Line Chart Card Section */}
    </Layout>
  );
};

export default Compliance;