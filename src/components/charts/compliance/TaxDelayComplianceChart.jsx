import { Tally1 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "react-bootstrap";

const sampleData = {
  start_date: "01-01-2020",
  end_date: "01-01-2022",
  gst: {
    large: {
      delayed: 450,
      non_delayed: 50,
      total: 500,
    },
    medium: {
      delayed: 400,
      non_delayed: 50,
      total: 500,
    },
    small: {
      delayed: 350,
      non_delayed: 50,
      total: 500,
    },
    micro: {
      filing: 4000,
      non_filing: 6000,
    },
  },
  swt: {
    large: {
      filing: 420,
      non_filing: 80,
    },
    medium: {
      filing: 870,
      non_filing: 330,
    },
    small: {
      filing: 2000,
      non_filing: 1500,
    },
    micro: {
      filing: 3700,
      non_filing: 6300,
    },
  },
  cit: {
    large: {
      filing: 440,
      non_filing: 60,
    },
    medium: {
      filing: 880,
      non_filing: 320,
    },
    small: {
      filing: 2050,
      non_filing: 1450,
    },
    micro: {
      filing: 3900,
      non_filing: 6100,
    },
  },
};

const TaxDelayComplianceChart = ({ riskData }) => {
  const [selectedCategory, setSelectedCategory] = useState("gst");
  const [selectedSegment, setSelectedSegment] = useState("large");
  const [filterData, setFilterData] = useState({});

   useEffect(() => {
      if (sampleData && selectedCategory && selectedSegment) {
        const data = sampleData[selectedCategory]?.[selectedSegment];
        setFilterData(data || {});
      } else {
        setFilterData({});
      }
    }, [sampleData, selectedCategory, selectedSegment]);
  
    const series = [filterData?.delayed || 0, filterData?.non_delayed || 0];
    const options = {
      chart: {
        width: 380,
        type: "pie",
        toolbar: { show: true },
      },
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
    };

  return (
    <Card className="mb-4 box-background">
      <Card.Body>
        <Row className="mb-4">
          <Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h4
                className="mb-0 me-3 fw-bold"
                style={{ color: "#6366F1", fontSize: "22px" }}
              >
                Tax Delay vs Non Time Delay
              </h4>
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
                onChange={(e) => {
                  const newCategory = e.target.value;
                  const industryList = Object.keys(
                    sampleData?.[newCategory] || {}
                  );
                  const firstIndustry = industryList[0] || "";
                  setSelectedCategory(newCategory);
                  setSelectedSegment("large");
                }}
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  marginRight:"5px"
                }}
              >
                <option value="gst">GST</option>
                <option value="swt">SWT</option>
                <option value="cit">CIT</option>
              </select>
            
              <select
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  width: "10rem",
                }}
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
              >
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
                <option value="micro">Micro</option>
              </select>
            </div>
          </Col>
        </Row>
        <Chart options={options} series={series} type="pie" height={350} />
      </Card.Body>
    </Card>
  );
};

export default TaxDelayComplianceChart;
