import { Tally1 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './charts.css'

const RiskBreakdownByCategoryChart = ({ riskBreakdownByCategoryData }) => {
  //console.log("data received in RiskBreakdownByCategoryChart", riskBreakdownByCategoryData);
  const [filterData, setFilterData] = useState(riskBreakdownByCategoryData ? riskBreakdownByCategoryData["gst"] ?? {} : {});

  const defaultCategory = "gst";
  useEffect(() => {
    if (riskBreakdownByCategoryData?.[defaultCategory]) {
      setFilterData(riskBreakdownByCategoryData[defaultCategory]);
    }
  }, [riskBreakdownByCategoryData]);

  // Define categories for x-axis
  const categories = ["large", "medium", "small", "micro"];

  // Risk levels to be used for each series
  const riskLevels = [
    { key: 'Critical', color: '#c0392b' },
    { key: 'High', color: '#e74c3c' },
    { key: 'Moderate', color: '#f39c12' },
    { key: 'Elevated', color: '#f1c40f' },
    { key: 'Low', color: '#2ecc71' },
    { key: 'Very Low', color: '#1abc9c' },
  ];

  const series = riskLevels.map(level => ({
    name: level.key,
    data: categories.map(cat => filterData?.[cat]?.[level.key+' Risk'] ?? 0),
  }));

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: true },
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)), // Capitalize
    },
    yaxis: {
      title: {
        text: 'Number of Taxpayers',
      },
    },
    legend: {
      position: 'top',
    },
    fill: {
      opacity: 1,
    },
    colors: riskLevels.map(level => level.color),
    noData: {
      text: 'No Data Found',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#6c757d',
        fontSize: '16px',
        fontFamily: 'inherit',
      },
    },
  };

  const changeCategoryData = (category) => {
    const selectedData = riskBreakdownByCategoryData?.[category] ?? {};
    setFilterData(selectedData);
  };


  return (
    <div>
      <div style={{
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <span className='chart-headers'>Risk Breakdown By Category</span>
        <div>
          <select 
            className='chart-filter'
            onChange={(e) => changeCategoryData(e.target.value)}>
            <option value="gst">GST</option>
            <option value="swt">SWT</option>
            <option value="cit">CIT</option>
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
      {/* Only render chart if series data exists */}
      {/* {riskBreakdownByCategoryData ? (series.length > 0 && (
        <Chart options={options} series={series} type="bar" height={350} />
      )) : <div>No data available</div>} */}
    </div>
  );
};

export default RiskBreakdownByCategoryChart;