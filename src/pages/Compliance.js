import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';
import TenureFilter from '../components/filters/TenureFilter';
import BarChart from '../components/charts/BarChart';
import SwtSalariesChart from '../components/charts/SwtSalariesChart';
import EmployeeLineChart from '../components/charts/EmployeeLineChart';
import MonthlySalesTaxSummaryChart from '../components/charts/MonthlySalesTaxSummaryChart';

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


// Radar chart options and series for employee data

const employeeData = {
  year: 2024,
  monthly_data: [
    { month: "01", employees_on_payroll: 1200, employees_paid_swt: 950 },
    { month: "02", employees_on_payroll: 1250, employees_paid_swt: 980 },
    { month: "03", employees_on_payroll: 1300, employees_paid_swt: 1000 },
    { month: "04", employees_on_payroll: 1280, employees_paid_swt: 1020 },
    { month: "05", employees_on_payroll: 1350, employees_paid_swt: 1100 },
    { month: "06", employees_on_payroll: 1400, employees_paid_swt: 1150 },
    { month: "07", employees_on_payroll: 1425, employees_paid_swt: 1200 },
    { month: "08", employees_on_payroll: 1450, employees_paid_swt: 1250 },
    { month: "09", employees_on_payroll: 1500, employees_paid_swt: 1300 },
    { month: "10", employees_on_payroll: 1520, employees_paid_swt: 1350 },
    { month: "11", employees_on_payroll: 1550, employees_paid_swt: 1400 },
    { month: "12", employees_on_payroll: 1600, employees_paid_swt: 1450 }
  ]
};

const employeeMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const employeeRadarOptions = {
  chart: {
    type: 'radar',
    height: 350,
    toolbar: { show: false }
  },
  xaxis: {
    categories: employeeMonths,
    labels: {
      style: { fontWeight: 500, color: '#334155', fontSize: '14px' }
    }
  },
  yaxis: {
    labels: {
      style: { fontWeight: 500, color: '#334155' }
    }
  },
  legend: {
    position: 'top',
    fontWeight: 600
  },
  colors: ['#6366f1', '#a5b4fc'],
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.2
  },
  markers: {
    size: 4
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    style: { fontSize: '15px' },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const month = w.globals.categoryLabels[dataPointIndex];
      const payroll = series[0][dataPointIndex];
      const paidSwt = series[1][dataPointIndex];
      return `
        <div style="padding:8px 12px;">
          <div style="font-weight:600; color:#6366f1; margin-bottom:4px;">${month}</div>
          <div><span style="color:#6366f1;">●</span> Employees on Payroll: <b>${payroll}</b></div>
          <div><span style="color:#a5b4fc;">●</span> Employees Paid SWT: <b>${paidSwt}</b></div>
        </div>
      `;
    }
  }
};

const employeeRadarSeries = [
  {
    name: 'Employees on Payroll',
    data: employeeData.monthly_data.map(m => m.employees_on_payroll)
  },
  {
    name: 'Employees Paid SWT',
    data: employeeData.monthly_data.map(m => m.employees_paid_swt)
  }
];


// SWT Salaries Comparison Data
const swtSalariesData = {
  year: 2024,
  monthly_data: [
    { month: 1, total_salary_wages_paid: 1000000, sw_paid_for_swt_deduction: 800000, total_swt_tax_deducted: 1060000 },
    { month: 2, total_salary_wages_paid: 1050000, sw_paid_for_swt_deduction: 850000, total_swt_tax_deducted: 68000 },
    { month: 3, total_salary_wages_paid: 1100000, sw_paid_for_swt_deduction: 60000, total_swt_tax_deducted: 1100000 },
    { month: 4, total_salary_wages_paid: 280000, sw_paid_for_swt_deduction: 870000, total_swt_tax_deducted: 71000 },
    { month: 5, total_salary_wages_paid: 1150000, sw_paid_for_swt_deduction: 920000, total_swt_tax_deducted: 75000 },
    { month: 6, total_salary_wages_paid: 2200000, sw_paid_for_swt_deduction: 950000, total_swt_tax_deducted: 1900000 },
    { month: 7, total_salary_wages_paid: 2230000, sw_paid_for_swt_deduction: 90000, total_swt_tax_deducted: 80000 },
    { month: 8, total_salary_wages_paid: 50000, sw_paid_for_swt_deduction: 1000000, total_swt_tax_deducted: 82000 },
    { month: 9, total_salary_wages_paid: 1270000, sw_paid_for_swt_deduction: 1020000, total_swt_tax_deducted: 83000 },
    { month: 10, total_salary_wages_paid: 1300000, sw_paid_for_swt_deduction: 1040000, total_swt_tax_deducted: 85000 },
    { month: 11, total_salary_wages_paid: 20000, sw_paid_for_swt_deduction: 1060000, total_swt_tax_deducted: 86000 },
    { month: 12, total_salary_wages_paid: 1350000, sw_paid_for_swt_deduction: 1080000, total_swt_tax_deducted: 88000 }
  ],
  totals: {
    total_salary_wages_paid: 14630000,
    total_sw_paid_for_swt_deduction: 11510000,
    total_swt_tax_deducted: 960000
  }
};

const swtSalariesMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const swtSalariesChartSeries = [
  {
    name: 'Total Salary Wages Paid',
    data: swtSalariesData.monthly_data.map(m => m.total_salary_wages_paid)
  },
  {
    name: 'SW Paid for SWT Deduction',
    data: swtSalariesData.monthly_data.map(m => m.sw_paid_for_swt_deduction)
  },
  {
    name: 'Total SWT Tax Deducted',
    data: swtSalariesData.monthly_data.map(m => m.total_swt_tax_deducted)
  }
];

const swtSalariesChartOptions = {
  chart: {
    type: 'area',
    height: 320,
    toolbar: { show: false }
    // background: '#fff' // Remove this line to eliminate white background
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: [2, 2, 2]
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.50,
      opacityTo: 0.45,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: swtSalariesMonths,
    title: { text: 'Month' },
    labels: {
      style: { colors: '#888', fontWeight: 500, fontSize: '14px' }
    },
    axisBorder: { show: true, color: '#e0e7ef' }, // Ensure border is visible and matches other chart
    axisTicks: { show: true, color: '#e0e7ef' },  // Ensure ticks are visible and matches other chart
    offsetY: 0, // Align with EmployeeLineChart
    position: 'bottom'
  },
  yaxis: {
    labels: {
      style: { colors: '#888', fontWeight: 500, fontSize: '14px' },
      formatter: val => val >= 1000 ? `${(val / 1000000).toFixed(1)}M` : val
    }
  },
  legend: {
    position: 'top',
    fontWeight: 700,
    labels: {
      colors: ['#4338ca', '#22c55e', '#f59e42']
    }
  },
  colors: ['#4338ca', '#22c55e', '#f59e42'],
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

// Multi-series line chart for Employees on Payroll vs Paid SWT (2024)
const employeeLineSeries = [
  {
    name: 'Employees on Payroll',
    data: employeeData.monthly_data.map(m => m.employees_on_payroll)
  },
  {
    name: 'Employees Paid SWT',
    data: employeeData.monthly_data.map(m => m.employees_paid_swt)
  }
];

const employeeLineOptions = {
  chart: {
    type: 'line',
    height: 320,
    toolbar: { show: false }
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  xaxis: {
    categories: employeeMonths,
    title: { text: 'Month' },
    labels: {
      style: { fontWeight: 500, color: '#334155', fontSize: '14px' }
    }
  },
  yaxis: {
    title: { text: 'Employees' },
    labels: {
      style: { fontWeight: 500, color: '#334155' }
    }
  },
  legend: {
    position: 'top',
    fontWeight: 600
  },
  colors: ['#2563eb', '#22c55e'],
  markers: {
    size: 5
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: { fontSize: '15px' }
  },
  grid: {
    borderColor: '#e0e7ef',
    strokeDashArray: 4
  }
};


const Compliance = () => {
  const [selectedTax, setSelectedTax] = useState('GST');
  const [dateRange, setDateRange] = useState({
    start_date: '',
    end_date: ''
  });
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = currentYear - i;
    return { label: year.toString(), value: year.toString() };
  });

  const handleFilterChange = (range) => {
    setDateRange(range);
  };

  const handleSearch = () => {
    // Implement search logic here
    // You can use selectedTax, dateRange.start_date, dateRange.end_date
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
          <div style={{ flex: '0 1 auto', minWidth: 0, height: 48, display: 'flex', alignItems: 'center' }}>
            <TenureFilter onFilterChange={handleFilterChange} tenureOptions={yearOptions} />
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
        <MonthlySalesTaxSummaryChart
          year={chartData.year}
          options={chartOptions}
          series={chartSeries}
        />
      </div>
      {/* End Chart Card Section */}

      {/* --- Bar Chart Row --- */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 32,
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {/* Line Chart Card */}
        <div
          style={{
            flex: 1,
            maxWidth: '50%',
            border: '1px solid #e0e7ef',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '32px 32px 16px 32px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            In Progress
          </div>
          <EmployeeLineChart
            options={employeeLineOptions}
            series={employeeLineSeries}
          />
        </div>
        {/* SWT Chart Card */}
        <div
          style={{
            flex: 1,
            maxWidth: '50%',
            border: '1px solid #e0e7ef',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '32px 32px 16px 32px',
            minWidth: 0, // allow shrinking
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            Total TaxPayers vs Risk Flagged ({chartData.year})
          </div>
          <BarChart />
        </div>
      </div>
      {/* <div
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
          Total TaxPayers vs Risk Flagged ({chartData.year})
        </div>
        <BarChart />
      </div> */}
      {/* --- End Bar Chart Row --- */}

      {/* --- Line & SWT Chart Row --- */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 32,
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {/* Line Chart Card */}
        <div
          style={{
            flex: 1,
            maxWidth: '50%',
            border: '1px solid #e0e7ef',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '32px 32px 16px 32px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            Employees on Payroll vs Paid SWT (Line) (2024)
          </div>
          <EmployeeLineChart
            options={employeeLineOptions}
            series={employeeLineSeries}
          />
        </div>
        {/* SWT Chart Card */}
        <div
          style={{
            flex: 1,
            maxWidth: '50%',
            border: '1px solid #e0e7ef',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '32px 32px 16px 32px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            SWT Salaries Comparison (2024)
          </div>
          <SwtSalariesChart
            options={swtSalariesChartOptions}
            series={swtSalariesChartSeries}
          />
        </div>
      </div>
      {/* --- End Line & SWT Chart Row --- */}
    </Layout>
  );
};

export default Compliance;