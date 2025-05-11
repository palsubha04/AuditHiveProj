import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import SalesComparison from '../components/charts/SalesComparison';
import GSTPayableVsRefundable from '../components/charts/GSTPayableVsRefundable';
import TaxRecordsTable from '../components/tables/TaxRecordsTable';
import TenureFilter from '../components/filters/TenureFilter';
import GSTSummaryCards from '../components/summary/GSTSummaryCards';
import SegmentationDistributionChart from '../components/charts/SegmentationDistributionChart';
import './Dashboard.css';

function GST() {
  const [dateRange, setDateRange] = useState({
    start_date: '',
    end_date: ''
  });

  const handleFilterChange = (range) => {
    setDateRange(range);
  };

  return (
    <Layout>
      <Container fluid>
        <h1 className="mb-4">GST Analytics</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <TenureFilter onFilterChange={handleFilterChange} />
        </div>
        
        <GSTSummaryCards startDate={dateRange.start_date} endDate={dateRange.end_date} />
        
        <div className="row">
          <div className="col-12 mb-4">
            <SalesComparison startDate={dateRange.start_date} endDate={dateRange.end_date} />
          </div>
          <div className="col-12 mb-4">
            <GSTPayableVsRefundable startDate={dateRange.start_date} endDate={dateRange.end_date} />
          </div>
          <div className="col-12 mb-4">
            <SegmentationDistributionChart 
              startDate={dateRange.start_date} 
              endDate={dateRange.end_date} 
            />
          </div>
          <div className="col-12">
            <TaxRecordsTable startDate={dateRange.start_date} endDate={dateRange.end_date} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default GST; 