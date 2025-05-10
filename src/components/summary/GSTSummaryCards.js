import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import gstService from '../../services/gst.service';

const SummaryCard = ({ title, value, icon }) => (
  <Card className="h-100">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1">
          <h6 className="text-muted mb-2">{title}</h6>
          <h4 className="mb-0 text-truncate" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}>{value}</h4>
        </div>
        {icon && <div className="text-primary fs-3 ms-2">{icon}</div>}
      </div>
    </Card.Body>
  </Card>
);

const GSTSummaryCards = ({ startDate, endDate }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await gstService.getTaxRecordsSummary(startDate, endDate);
        setSummary(response);
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    if (startDate && endDate) {
      fetchSummary();
    }
  }, [startDate, endDate]);

  const formatCurrency = (value) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-US').format(value);
  };

  if (!summary) return null;

  return (
    <Row className="mb-4 g-3">
      <Col>
        <SummaryCard
          title="Total Taxpayers"
          value={formatNumber(summary.total_tax_payers)}
          icon="👥"
        />
      </Col>
      <Col>
        <SummaryCard
          title="Total Sales Income"
          value={formatCurrency(summary.total_sales_income)}
          icon="💰"
        />
      </Col>
      <Col>
        <SummaryCard
          title="Total GST Taxable"
          value={formatCurrency(summary.total_gst_taxable)}
          icon="📊"
        />
      </Col>
      <Col>
        <SummaryCard
          title="Total GST Payable"
          value={formatCurrency(summary.total_gst_payable)}
          icon="📈"
        />
      </Col>
      <Col>
        <SummaryCard
          title="Total GST Refundable"
          value={formatCurrency(summary.total_gst_refundable)}
          icon="📉"
        />
      </Col>
    </Row>
  );
};

export default GSTSummaryCards; 