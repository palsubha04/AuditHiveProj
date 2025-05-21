import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import TenureFilter from '../components/filters/TenureFilter';
import CITSummaryCards from '../components/summary/CITSummaryCards';
import './Dashboard.css';
import TotalAmountByIncomeType from '../components/charts/TotalAmountByIncomeType';
import TotalAmountByExpenseType from '../components/charts/TotalAmountByExpenseType';
import RiskCategoriesChart from '../components/charts/RiskCategoriesChart';
import CITSegmentationDistributionChart from '../components/charts/CITSegmentationDistributionChart';
import CITTaxRecordsTable from '../components/tables/TaxRecordsTableCIT';

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
        <div className='top-filter-class'>
          <TenureFilter
            onFilterChange={handleFilterChange}
          />
          <div className='d-flex ps-2 gap-2 justify-center align-items-center'>
            <span>{dateRange.start_date}</span>
            <span>to</span>
            <span>{dateRange.end_date}</span>
          </div>
        </div>

        {/* <CITSummaryCards startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}

        <div className="row">
          <div className="col-12 chart-columns-div">
          Top 50 Net profit TaxPayers
            {/* <TotalAmountByIncomeType startDate={dateRange.start_date}
              endDate={dateRange.end_date} /> */}
            {/* <SalesComparison startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
          <div className="col-12 chart-columns-div">
          Top 50 Net loss TaxPayers
            {/* <TotalAmountByExpenseType startDate={dateRange.start_date}
              endDate={dateRange.end_date} /> */}
            {/* <CITPayableVsRefundable startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
          <div className="row chart-columns-div pe-0">
            <div className="col-md-6">

              <CITSegmentationDistributionChart
                startDate={dateRange.start_date}
                endDate={dateRange.end_date}
              />
            </div>
            <div className="col-md-6 pe-0">

              <RiskCategoriesChart
                startDate={dateRange.start_date}
                endDate={dateRange.end_date}
                taxType="cit"
              />
            </div>
          </div>
          <div className="col-6">
          superneution png vs superneution foreign 
            {/* <CITTaxRecordsTable startDate={dateRange.start_date} endDate={dateRange.end_date} /> */}
          </div>
          <div className='col-6'>
          interest expense png vs interest expense foreign
            </div>
            <div className='col-12'>
            cost sales comparison
            </div>
        </div>
      </Container>
    </Layout>
  );
}

export default CIT; 