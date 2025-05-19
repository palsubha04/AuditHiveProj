import { Tally1 } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import './charts.css';

const RiskAnomalyFrequencyChart = ({ riskAnomalyFrequencyData }) => {
  const [selectedCategory, setSelectedCategory] = useState('gst');
  const [filteredData, setFilteredData] = useState([]);
  const categories = ['gst', 'swt', 'cit'];

  useEffect(() => {
    if (riskAnomalyFrequencyData && selectedCategory) {
      const rules =
        riskAnomalyFrequencyData[selectedCategory]?.fraud_rules || [];
      setFilteredData(rules);
    }
  }, [riskAnomalyFrequencyData, selectedCategory]);

  const { labels, series } = useMemo(() => {
    if (!filteredData?.length) return { labels: [], series: [] };
    return {
      labels: filteredData.map((item) => item.rule),
      series: filteredData.map((item) => item.count),
    };
  }, [filteredData]);

  const options = {
    chart: {
      type: 'pie',
      height: 350,
      toolbar: { show: true },
    },
    labels: labels,
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
    legend: {
      position: 'bottom',
      onItemClick: {
        toggleDataSeries: true, // explicitly allow toggling
      },
    },
  };

  return (
    <div>
      {/* Heading and dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span className="chart-headers">Frequency Of Risk Anomalies</span>
        <div>
          <select
            className="chart-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <ReactApexChart
          key={`${selectedCategory}-${series.length}`} // important for rerendering
          options={options}
          series={series}
          type="pie"
          width={500}
        />
      </div>
    </div>
  );
};

export default RiskAnomalyFrequencyChart;
