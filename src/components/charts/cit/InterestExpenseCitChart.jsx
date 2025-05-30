import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import citService from '../../../services/cit.service';
import CSVExportButton from '../../CSVExportButton';

const sample = {
  png: 450,
  foreign: 50,
};

const InterestExpenseCitChart = ({ startDate, endDate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);

  const chartOptions = {
    chart: {
      width: 380,
      type: 'pie',
      toolbar: { show: true },
    },
    labels: ['PNG', 'Foreign'],
    tooltip: {
      custom: function ({ series, seriesIndex, w }) {
        const value = series[seriesIndex];
        const total = series.reduce((acc, val) => acc + val, 0);
        const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
        const label = w.globals.labels[seriesIndex];

        return `
          <div class="arrow_box" style="padding: 8px; line-height: 1.4">
            <span> ${label}</span><br/>
            <span><strong>Value:</strong> ${value.toLocaleString()}</span><br/>
            <span><strong>Percentage:</strong> ${percentage}%</span>
          </div>
        `;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  const [chartData, setChartData] = useState({
    series: [sample.png, sample.foreign],
    options: chartOptions,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await citService.getPngvsForeignData(
          startDate,
          endDate
        );

        setRecords(response?.records || []);

        //var chart_Data = response;
        var chartSeries = [
          response.interest_expense_png,
          response.interest_expense_foreign,
        ];

        setChartData((prevData) => ({
          ...prevData,
          series: chartSeries,
        }));
      } catch (err) {
        console.error('Error fetching Total Amount By Expense Type:', err);
        setError('Failed to load Total Amount By Expense Type data');
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchData();
    } else {
      setLoading(false);
      setChartData((prevData) => ({
        ...prevData,
        series: [],
      }));
    }
  }, [startDate, endDate]);

  if (loading) {
    return (
      <Card className="mb-4 box-background">
        <Card.Body
          className="d-flex align-items-center justify-content-center"
          style={{ height: '400px' }}
        >
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-4 box-background">
        <Card.Body
          className="text-center text-danger"
          style={{ height: '400px' }}
        >
          {error}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 box-background">
      <Card.Body>
        <Row className="mb-4">
          <Col>
            <span className="chart-headers">
              Interest Expense PNG vs Foreign
            </span>
          </Col>
          <Col>
            <CSVExportButton
              records={records}
              filename="risk_taxpayers.csv"
              buttonLabel="Download Risk Taxpayer List"
            />
          </Col>
        </Row>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}
        />
      </Card.Body>
    </Card>
  );
};

export default InterestExpenseCitChart;
