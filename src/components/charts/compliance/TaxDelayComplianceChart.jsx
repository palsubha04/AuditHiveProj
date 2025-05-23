import { Tally1 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "react-bootstrap";

// const sampleData = {
//   start_date: "01-01-2020",
//   end_date: "01-01-2022",
//   gst: {
//     large: {
//       delayed: 450,
//       non_delayed: 50,
//       total: 500,
//     },
//     medium: {
//       delayed: 400,
//       non_delayed: 50,
//       total: 500,
//     },
//     small: {
//       delayed: 350,
//       non_delayed: 50,
//       total: 500,
//     },
//     micro: {
//       delayed: 400,
//       non_delayed: 50,
//     },
//   },
//   swt: {
//     large: {
//       delayed: 400,
//       non_delayed: 150,
//     },
//     medium: {
//       delayed: 400,
//       non_delayed: 120,
//     },
//     small: {
//       delayed: 400,
//       non_delayed: 70,
//     },
//     micro: {
//       delayed: 400,
//       non_delayed: 53,
//     },
//   },
//   cit: {
//     large: {
//       delayed: 420,
//       non_delayed: 50,
//     },
//     medium: {
//       delayed: 400,
//       non_delayed: 150,
//     },
//     small: {
//       delayed: 400,
//       non_delayed: 520,
//     },
//     micro: {
//       delayed: 400,
//       non_delayed: 150,
//     },
//   },
// };

const TaxDelayComplianceChart = ({ taxDelayComplianceData }) => {
  const [selectedCategory, setSelectedCategory] = useState("gst");
  const [selectedSegment, setSelectedSegment] = useState("large");
  const [filterData, setFilterData] = useState({});
  console.log("taxDelayComplianceData inside", taxDelayComplianceData);

  useEffect(() => {
    if (taxDelayComplianceData && selectedCategory && selectedSegment) {
      const data = taxDelayComplianceData[selectedCategory]?.[selectedSegment];
      setFilterData(data || {});
    } else {
      setFilterData({});
    }
  }, [taxDelayComplianceData, selectedCategory, selectedSegment]);

  const series = [filterData?.delayed || 0, filterData?.non_delayed || 0];
  const options = {
    chart: {
      width: 380,
      type: "pie",
      toolbar: { show: true },
    },
    // tooltip: {
    //   custom: function ({ series, seriesIndex, w }) {
    //     const value = series[seriesIndex];
    //     const total = series.reduce((acc, val) => acc + val, 0);
    //     const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
    //     const label = w.globals.labels[seriesIndex];

    //     return `
    //       <div class="arrow_box" style="padding: 8px; line-height: 1.4">
    //         <span> ${label}</span><br/>
    //         <span><strong>Value:</strong> ${value.toLocaleString()}</span><br/>
    //         <span><strong>Percentage:</strong> ${percentage}%</span>
    //       </div>
    //     `;
    //   },
    // },
    labels: ["Delayed", "Non Delayed"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
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

  return (
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
    //             Delayed vs On-Time Returns
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
    //               const industryList = Object.keys(
    //                 taxDelayComplianceData?.[newCategory] || {}
    //               );
    //               const firstIndustry = industryList[0] || "";
    //               setSelectedCategory(newCategory);
    //               setSelectedSegment("large");
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

    //           <select
    //             style={{
    //               padding: "4px 8px",
    //               borderRadius: 4,
    //               border: "1px solid #ccc",
    //               width: "10rem",
    //             }}
    //             value={selectedSegment}
    //             onChange={(e) => setSelectedSegment(e.target.value)}
    //           >
    //             <option value="large">Large</option>
    //             <option value="medium">Medium</option>
    //             <option value="small">Small</option>
    //             <option value="micro">Micro</option>
    //           </select>
    //         </div>
    //       </Col>
    //     </Row>
    //     <Chart options={options} series={series} type="pie" height={350} />
    //   </Card.Body>
    // </Card>
    <>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
    <span className='chart-headers'>Delayed vs On-Time Returns</span>
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
   
    <select
      value={selectedSegment}
      onChange={(e) => setSelectedSegment(e.target.value)}
      className='chart-filter'
    >
       <option value="large">Large</option>
        <option value="medium">Medium</option>
        <option value="small">Small</option>
        <option value="micro">Micro</option>
    </select>
  </div>
  <Chart options={options} series={series} type="pie" height={350} />
  </>
  );
};

export default TaxDelayComplianceChart;
