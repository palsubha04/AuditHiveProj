import { Tally1 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const riskLevels = [
  "Critical Risk",
  "High Risk",
  "Moderate Risk",
  "Elevated Risk",
  "Low Risk",
  "Very Low Risk",
];

const RiskAnalysisByIndustryChart = ({ riskData }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [filteredData, setFilteredData] = useState({});

  // Safe access to categories
  const categories = riskData ? Object.keys(riskData) : [];

  const industries = riskData?.[selectedCategory]
    ? Object.keys(riskData[selectedCategory])
    : [];

  useEffect(() => {
    if (riskData && selectedCategory && selectedIndustry) {
      const data = riskData[selectedCategory]?.[selectedIndustry];
      setFilteredData(data || {});
    } else {
      setFilteredData({});
    }
  }, [riskData, selectedCategory, selectedIndustry]);

  useEffect(() => {
    // Set default selected category and industry on mount or when riskData changes
    if (riskData) {
      const defaultCategory = Object.keys(riskData)[0] || "";
      const defaultIndustry = defaultCategory
        ? Object.keys(riskData[defaultCategory])[0] || ""
        : "";
      setSelectedCategory(defaultCategory);
      setSelectedIndustry(defaultIndustry);
    }
  }, [riskData]);

  const series = Object.entries(filteredData).map(([size, risks]) => ({
    name: size.charAt(0).toUpperCase() + size.slice(1),
    data: riskLevels.map((level) => ({
      x: level,
      y: risks[level] || 0,
    })),
  }));

  const options = {
    chart: {
      type: "heatmap",
      toolbar: { show: true },
    },
    dataLabels: { enabled: true },
    title: {
      text: "Risk Breakdown by Industry",
      align: "center",
    },
    xaxis: {
      type: "category",
      categories: riskLevels,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 50, color: "#FF4D4F", name: "Very High" },
            { from: 51, to: 100, color: "#FA8C16", name: "High" },
            { from: 101, to: 150, color: "#FADB14", name: "Medium" },
            { from: 151, to: 200, color: "#52C41A", name: "Low" },
          ],
        },
      },
    },
  };

  //   if (!riskData) {
  //     return <div>No data available</div>;
  //   }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h4 className="mb-0 me-3 fw-bold" style={{ color: '#6366F1', fontSize: '22px' }}>
          Total Tax Payer vs Risk Flagged
        </h4>
        <Tally1 style={{ color: '#7c879d' }} />
        <span style={{ color: "#7c879d", fontSize: '16px', marginRight: "10px" }}>Filter By : </span>
        <div>
          <select
            style={{
              marginRight: 8,
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              const industryList = Object.keys(riskData?.[newCategory] || {});
              const firstIndustry = industryList[0] || "";
              setSelectedCategory(newCategory);
              setSelectedIndustry(firstIndustry); // Reset industry when category changes
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
          <span style={{ color: "#7c879d", fontSize: '16px', marginRight: "5px" }}>and</span>
          <select
            style={{
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #ccc",
              width: "20rem"
            }}
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            disabled={!selectedCategory}
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind.charAt(0).toUpperCase() + ind.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {riskData ? <Chart options={options} series={series} type="heatmap" height={400} />
        : <div>No data available</div>}
    </div>
  );
};

export default RiskAnalysisByIndustryChart;