// import { Tally1 } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexcharts";

// const RiskAnomalyFrequencyChart = ({ riskAnomalyFrequencyData }) => {
//   //console.log("riskAnomalyFrequencyData", riskAnomalyFrequencyData);
//  const [selectedCategory, setSelectedCategory] = useState("gst");
//   const [filteredData, setFilteredData] = useState(riskAnomalyFrequencyData && riskAnomalyFrequencyData["gst"] ? riskAnomalyFrequencyData["gst"].fraud_rules : []);

//   const defaultCategory = "gst";
//   useEffect(() => {
//     if (riskAnomalyFrequencyData?.[defaultCategory]) {
//       setFilteredData(riskAnomalyFrequencyData[defaultCategory].fraud_rules);
//     }
//   }, [riskAnomalyFrequencyData]);

//   // const [series, setSeries] = useState([]);
//   // const [labels, setLabels] = useState([]);

//   const categories = ['gst', 'swt', 'cit']

//   // if (filteredData.length > 0) {
//   //  var labels = filteredData.map((item) => item.rule);
//   //  var series = filteredData.map((item) => item.count);
//   // } else {
//   //   var labels = [];
//   //   var series = [];
//   // }
//   const { labels, series } = useMemo(() => {
//     if (!filteredData?.length) return { labels: [], series: [] };
//     return {
//       labels: filteredData.map((item) => item.rule),
//       series: filteredData.map((item) => item.count),
//     };
//   }, [filteredData]);

//   console.log("series label", series, labels);
//   const options = {
//     chart: {
//       type: "pie",
//       toolbar: { show: true },
//     },
//     labels: labels,
//     noData: {
//       text: "No Data Found",
//       align: "center",
//       verticalAlign: "middle",
//       offsetX: 0,
//       offsetY: 0,
//       style: {
//         color: "#6c757d",
//         fontSize: "16px",
//         fontFamily: "inherit",
//       },
//     },
//     legend: {
//       position: "bottom",
//     },
//   };

//   // useEffect(() => {
//   //   //console.log("in use effect")
//   //   if (riskAnomalyFrequencyData && selectedCategory) {
//   //     console.log("category changed",selectedCategory)
//   //     const data = riskAnomalyFrequencyData[selectedCategory];
//   //     console.log("current filtered data",data);
//   //     setFilteredData(data || []);
//   //   } else {
//   //     setFilteredData([]);
//   //   }
//   // }, [riskAnomalyFrequencyData, selectedCategory]);

//   const changeChartCategory = (val) => {
//     console.log("category changed", val, riskAnomalyFrequencyData[val]);
//     setFilteredData(riskAnomalyFrequencyData && riskAnomalyFrequencyData[val] ? riskAnomalyFrequencyData[val].fraud_rules : []);
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
//         <h4
//           className="mb-0 me-3 fw-bold"
//           style={{ color: "#6366F1", fontSize: "22px" }}
//         >
//           Frequency Of Risk Anomalies
//         </h4>
//         <Tally1 style={{ color: "#7c879d" }} />
//         <span
//           style={{ color: "#7c879d", fontSize: "16px", marginRight: "10px" }}
//         >
//           Filter By :{" "}
//         </span>
//         <div>
//           <select
//             style={{
//               marginRight: 8,
//               padding: "4px 8px",
//               borderRadius: 4,
//               border: "1px solid #ccc",
//             }}
//             value={selectedCategory}
//             onChange={(e) => {
//               setSelectedCategory(e.target.value);
//               changeChartCategory(e.target.value);
//             }}
//           >
//             {categories &&
//               categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat.toUpperCase()}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//           width: "100%",
//         }}
//       >
//         <Chart
//           options={options}
//           series={series}
//           type="pie"
//           width={500}
//         />
//       </div>
//     </div>
//   );
// };

// export default RiskAnomalyFrequencyChart;

import { Tally1 } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import './charts.css'

const RiskAnomalyFrequencyChart = ({ riskAnomalyFrequencyData }) => {
  const [selectedCategory, setSelectedCategory] = useState("gst");
  const [filteredData, setFilteredData] = useState([]);
  const categories = ["gst", "swt", "cit"];

  useEffect(() => {
    if (riskAnomalyFrequencyData && selectedCategory) {
      const rules = riskAnomalyFrequencyData[selectedCategory]?.fraud_rules || [];
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
      type: "pie",
      height: 350,
      toolbar: { show: true },
    },
    labels: labels,
    noData: {
      text: "No Data Found",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#6c757d",
        fontSize: "16px",
        fontFamily: "inherit",
      },
    },
    legend: {
      position: "bottom",
      onItemClick: {
        toggleDataSeries: true, // explicitly allow toggling
      },
    },
  };

  return (
    <div>
      {/* Heading and dropdown */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <span className='chart-headers'>Frequency Of Risk Anomalies</span>
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
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
