import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ristBreakdownByCategoryData = {
    "gst": {
      "large": {
        "Critical Risk": 100,
        "High Risk": 200,
        "Moderate Risk": 200,
        "Elevated Risk": 200,
        "Low Risk": 200,
        "Very Low Risk": 200
      },
      "medium": {
        "Critical Risk": 80,
        "High Risk": 160,
        "Moderate Risk": 180,
        "Elevated Risk": 180,
        "Low Risk": 170,
        "Very Low Risk": 180
      },
      "small": {
        "Critical Risk": 60,
        "High Risk": 130,
        "Moderate Risk": 150,
        "Elevated Risk": 140,
        "Low Risk": 130,
        "Very Low Risk": 140
      },
      "micro": {
        "Critical Risk": 30,
        "High Risk": 100,
        "Moderate Risk": 110,
        "Elevated Risk": 90,
        "Low Risk": 70,
        "Very Low Risk": 80
      }
    },
    "swt": {
      "large": {
        "Critical Risk": 90,
        "High Risk": 180,
        "Moderate Risk": 190,
        "Elevated Risk": 190,
        "Low Risk": 180,
        "Very Low Risk": 180
      },
      "medium": {
        "Critical Risk": 70,
        "High Risk": 150,
        "Moderate Risk": 160,
        "Elevated Risk": 160,
        "Low Risk": 150,
        "Very Low Risk": 150
      },
      "small": {
        "Critical Risk": 50,
        "High Risk": 110,
        "Moderate Risk": 120,
        "Elevated Risk": 120,
        "Low Risk": 110,
        "Very Low Risk": 110
      },
      "micro": {
        "Critical Risk": 25,
        "High Risk": 80,
        "Moderate Risk": 90,
        "Elevated Risk": 85,
        "Low Risk": 80,
        "Very Low Risk": 100
      }
    },
    "cit": {
      "large": {
        "Critical Risk": 85,
        "High Risk": 160,
        "Moderate Risk": 180,
        "Elevated Risk": 170,
        "Low Risk": 160,
        "Very Low Risk": 170
      },
      "medium": {
        "Critical Risk": 65,
        "High Risk": 130,
        "Moderate Risk": 150,
        "Elevated Risk": 140,
        "Low Risk": 130,
        "Very Low Risk": 140
      },
      "small": {
        "Critical Risk": 65,
        "High Risk": 130,
        "Moderate Risk": 150,
        "Elevated Risk": 140,
        "Low Risk": 130,
        "Very Low Risk": 140
      },
      "micro": {
        "Critical Risk": 65,
        "High Risk": 130,
        "Moderate Risk": 150,
        "Elevated Risk": 140,
        "Low Risk": 130,
        "Very Low Risk": 140
      },
    }
}

const RiskBreakdownByCategoryChart = () => {
  const [filterData, setFilterData] = useState(ristBreakdownByCategoryData["gst"] ?? {});

  // Define categories for x-axis
  const categories = ["large", "medium", "small", "micro"];

  // Risk levels to be used for each series
  const riskLevels = [
    { key: 'Critical Risk', color: '#c0392b' },
    { key: 'High Risk', color: '#e74c3c' },
    { key: 'Moderate Risk', color: '#f39c12' },
    { key: 'Elevated Risk', color: '#f1c40f' },
    { key: 'Low Risk', color: '#2ecc71' },
    { key: 'Very Low Risk', color: '#1abc9c' },
  ];

  const series = riskLevels.map(level => ({
    name: level.key,
    data: categories.map(cat => filterData?.[cat]?.[level.key] ?? 0),
  }));

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
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
        text: 'Number of Companies',
      },
    },
    legend: {
      position: 'top',
    },
    fill: {
      opacity: 1,
    },
    colors: riskLevels.map(level => level.color),
  };

  const changeCategoryData = (category) => {
    const selectedData = ristBreakdownByCategoryData?.[category] ?? {};
    setFilterData(selectedData);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: 18,
          color: '#222'
        }}>
          Risk Breakdown By Category
        </div>
        <div>
          <select style={{
            marginRight: 8,
            padding: '4px 8px',
            borderRadius: 4,
            border: '1px solid #ccc'
          }} onChange={(e) => changeCategoryData(e.target.value)}>
            <option value="gst">GST</option>
            <option value="swt">SWT</option>
            <option value="cit">CIT</option>
          </select>
        </div>
      </div>

      {/* Only render chart if series data exists */}
      {series.length > 0 && (
        <Chart options={options} series={series} type="bar" height={350} />
      )}
    </div>
  );
};

export default RiskBreakdownByCategoryChart;
