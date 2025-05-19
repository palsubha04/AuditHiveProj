import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';

var data = [
    { income_type: "718.TAXABLE INCOME", total_amount: 1589320000.0 },
    { income_type: "710.Current Year Profit / Loss", total_amount: 1457600000.0 },
    { income_type: "10.Gross sales (cash / credit", total_amount: 1255804000.0 },
    { income_type: "90. Total Gross Income", total_amount: 856700000.0 },
    { income_type: "911.Total BPT  INCOME", total_amount: 435200000.0 },
    { income_type: "20.Other gross income", total_amount: 216000000.0 },
    { income_type: "15.Dividend income", total_amount: 118000000.0 },
    { income_type: "300.Non-assessable income", total_amount: 98500000.0 },
    { income_type: "17.Interest income", total_amount: 74300000.0 },
    { income_type: "18.Rental income", total_amount: 52800000.0 },
    { income_type: "310.Net exempt income", total_amount: 33400000.0 },
    { income_type: "603.s45B Export sales", total_amount: 21000000.0 },
    { income_type: "19.Royalty income", total_amount: 9700000.0 },
    { income_type: "543.Unearned revenue", total_amount: 4500000.0 },
    { income_type: "750.Plus Additional Profits Ta", total_amount: 1200000.0 }
  ];

const TotalAmountByIncomeType = () => {
    const chartOptions = {
        chart: {
          type: 'bar',
          height: 600,
          toolbar: { show: true }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '60%',
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          title: {
            text: 'Amount (in billions)',
          },
          labels: {
            formatter: (val) => `${(val / 1e6).toFixed(0)}M`
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
            }
          }
        },
        tooltip: {
          y: {
            formatter: (val) => `${val.toLocaleString()}`
          }
        },
        title: {
          text: 'Income Types Breakdown',
          align: 'center'
        }
      };
      const chartSeries = [{
        name: 'Total Amount',
        data: data.map(item => ({
          x: item.income_type,
          y: item.total_amount
        }))
      }];

  return (
    <Card className="mb-4 box-background">
      <Card.Body>
        <Row className="mb-4">
          <Col>
            <h5 className="card-title">Sales Comparison</h5>
          </Col>
        </Row>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={600} />
      </Card.Body>
    </Card>
  )
}

export default TotalAmountByIncomeType
