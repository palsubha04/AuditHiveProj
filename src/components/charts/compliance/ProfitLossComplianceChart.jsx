import { Tally1 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "react-bootstrap";

const sampleData = {
  start_date: "01-01-2020",
  end_date: "01-01-2022",
  gst: {
    large: {
      profit_making_taxpayers: 450,
      loss_making_taxpayers: 50,
      total: 500,
    },
    medium: {
      profit_making_taxpayers: 400,
      loss_making_taxpayers: 50,
      total: 500,
    },
    small: {
      profit_making_taxpayers: 350,
      loss_making_taxpayers: 50,
      total: 500,
    },
    micro: {
      profit_making_taxpayers: 150,
      loss_making_taxpayers: 50,
      total: 500,
    },
  },
  swt: {
    large: {
      profit_making_taxpayers: 350,
      loss_making_taxpayers: 50,
      total: 500,
    },
    medium: {
      profit_making_taxpayers: 440,
      loss_making_taxpayers: 50,
      total: 500,
    },
    small: {
      profit_making_taxpayers: 320,
      loss_making_taxpayers: 50,
      total: 500,
    },
    micro: {
      profit_making_taxpayers: 150,
      loss_making_taxpayers: 50,
      total: 500,
    },
  },
  cit: {
    large: {
      profit_making_taxpayers: 450,
      loss_making_taxpayers: 50,
      total: 500,
    },
    medium: {
      profit_making_taxpayers: 400,
      loss_making_taxpayers: 50,
      total: 500,
    },
    small: {
      profit_making_taxpayers: 350,
      loss_making_taxpayers: 50,
      total: 500,
    },
    micro: {
      profit_making_taxpayers: 150,
      loss_making_taxpayers: 50,
      total: 500,
    },
  },
};

const entityTypes = ["large", "medium", "small", "micro"];

const ProfitLossComplianceChart = ({ x }) => {
  console.log("TotalVsFlaggedLineChart from chart", sampleData);
  const [selectedCategory, setSelectedCategory] = useState("gst");
  const [chartSeries, setChartSeries] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!sampleData || !sampleData[selectedCategory]) {
      setChartSeries([]);
      setChartOptions({});
      return;
    }

    const currentData = sampleData[selectedCategory];

    const totalSeries = entityTypes.map(
      (type) => currentData[type]?.profit_making_taxpayers ?? 0
    );
    const flaggedSeries = entityTypes.map(
      (type) => currentData[type]?.loss_making_taxpayers ?? 0
    );

    setChartSeries([
      { name: "Profit", data: totalSeries },
      { name: "Loss", data: flaggedSeries },
    ]);

    setChartOptions({
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: true },
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      xaxis: {
        categories: ["Large", "Medium", "Small", "Micro"],
        title: { text: "Segmentation" },
        labels: {
          style: { fontWeight: 500, color: "#334155", fontSize: "14px" },
        },
      },
      yaxis: {
        title: { text: "Number of Taxpayers" },
        labels: { style: { fontWeight: 500, color: "#334155" } },
      },
      legend: { position: "top", fontWeight: 600 },
      colors: ["#2563eb", "#f97316"],
      markers: { size: 5 },
      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          const sizeLabel = w.globals.categoryLabels[dataPointIndex];
          const total = series[0]?.[dataPointIndex] ?? 0;
          const flagged = series[1]?.[dataPointIndex] ?? 0;

          return `
            <div style="padding: 8px 12px;">
              <strong>${sizeLabel}</strong><br/>
              Total Taxpayers: ${total}<br/>
              Risk-Flagged: ${flagged}<br/>
            </div>
          `;
        },
        style: { fontSize: "15px" },
      },
      grid: { borderColor: "#e0e7ef", strokeDashArray: 4 },
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
    });
  }, [selectedCategory, sampleData]);

  const isDataAvailable = sampleData && sampleData[selectedCategory];

  return (
    <>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
    <span className='chart-headers'> Profit vs Loss</span>
    <Tally1 style={{ color: "#7c879d" }} />
               <span
                style={{
                  color: "#7c879d",
                  fontSize: "16px",
                  marginRight: "10px",
                }}
              >
                Filter By :{" "}
              </span>
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className='chart-filter'
    >
      <option value="gst">GST</option>
      <option value="swt">SWT</option>
      <option value="cit">CIT</option>
    </select>
  </div>
  <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
  </>
    // <Card className="mb-4 box-background">
    //   <Card.Body>
    //     <Row className="mb-4">
    //       <Col>
    //         <div
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             marginBottom: 16,
    //           }}
    //         >
    //           <h4
    //             className="mb-0 me-3 fw-bold"
    //             style={{ color: "#6366F1", fontSize: "22px" }}
    //           >
    //             Profit vs Loss
    //           </h4>
    //           <Tally1 style={{ color: "#7c879d" }} />
    //           <span
    //             style={{
    //               color: "#7c879d",
    //               fontSize: "16px",
    //               marginRight: "10px",
    //             }}
    //           >
    //             Filter By :{" "}
    //           </span>

    //           <select
    //             value={selectedCategory}
    //             onChange={(e) => {
    //               const newCategory = e.target.value;
    //               setSelectedCategory(newCategory);
    //             }}
    //             style={{
    //               padding: "4px 8px",
    //               borderRadius: 4,
    //               border: "1px solid #ccc",
    //               marginRight: "5px",
    //             }}
    //           >
    //             <option value="gst">GST</option>
    //             <option value="swt">SWT</option>
    //             <option value="cit">CIT</option>
    //           </select>
    //         </div>
    //       </Col>
    //     </Row>
    //     <Chart
    //       options={chartOptions}
    //       series={chartSeries}
    //       type="line"
    //       height={350}
    //     />
    //   </Card.Body>
    // </Card>
  );
};

export default ProfitLossComplianceChart;
