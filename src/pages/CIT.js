import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import TenureFilter from '../components/filters/TenureFilter';
import CITSummaryCards from '../components/summary/CITSummaryCards';
import './Dashboard.css';

function CIT() {
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
        <h1 className="mb-4">CIT Analytics</h1>
        
        {/* <TenureFilter onFilterChange={handleFilterChange} /> */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <TenureFilter onFilterChange={handleFilterChange} />
         </div>
        
        <CITSummaryCards startDate={dateRange.start_date} endDate={dateRange.end_date} />
        
        <div className="row">
          <div className="col-12 mb-4">
            Chart 1
            {/* <SalesComparison startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
          <div className="col-12 mb-4">
            Chart 2
            {/* <CITPayableVsRefundable startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              Chart 3
              {/* <SegmentationDistributionChart 
                startDate={dateRange.start_date} 
                endDate={dateRange.end_date} 
              /> */}
            </div>
            <div className="col-md-6">
              Chart 4
              {/* <RiskCategoriesChart
                startDate={dateRange.start_date}
                endDate={dateRange.end_date}
                taxType="cit"
              /> */}
            </div>
          </div>
          <div className="col-12">
            CIT Table
            {/* <TaxRecordsTable startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default CIT; 