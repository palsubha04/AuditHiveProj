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
  console.log("riskData",riskData);
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

  function generateRiskRanges(data) {
    console.log("in generate risk",data);
    if(data && data.length > 0) {
      let max = -Infinity;
    let min = Infinity;

    for (const size in data) {
      const riskLevels = data[size];
      for (const level in riskLevels) {
        const value = riskLevels[level];
        if (value > max) max = value;
        if (value < min) min = value;
      }
    }


    const range = max - min;
    const step = range / 4;

    const colors = ["#52C41A", "#FADB14", "#FA8C16", "#FF4D4F",];
    const names = ["Low", "Medium", "High", "Very High"];

    const ranges = [];

    for (let i = 0; i < 4; i++) {
      const from = Math.round(min + i * step);
      const to = Math.round(min + (i + 1) * step) - 1;

      ranges.push({
        from,
        to: i === 3 ? max : to, // Ensure the last "to" is exactly max
        color: colors[i],
        name: names[i]
      });
    }
    console.log("Ranges ---> ", ranges);
    return ranges;
    }
  }


  const series =filteredData && typeof filteredData === 'object' ? Object.entries(filteredData).map(([size, risks]) => ({
    name: size.charAt(0).toUpperCase() + size.slice(1),
    data: riskLevels.map((level) => ({
      x: level,
      y: risks[level] || 0,
    })),
  })) : [];
  
  const options = {
    chart: {
      type: "heatmap",
      toolbar: { show: true },
    },
    dataLabels: { enabled: true },

    xaxis: {
      type: "category",
      categories: riskLevels,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: generateRiskRanges(riskData && riskData[selectedCategory] && riskData[selectedCategory][selectedIndustry] ? riskData[selectedCategory][selectedIndustry] : [])
        },
      },
    },
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
                {ind.charAt(0).toUpperCase() + ind.slice(1).replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="heatmap" height={400} />
      {/* {riskData ? <Chart options={options} series={series} type="heatmap" height={400} />
        : <div>No data available</div>} */}
    </div>
  );
};

export default RiskAnalysisByIndustryChart;