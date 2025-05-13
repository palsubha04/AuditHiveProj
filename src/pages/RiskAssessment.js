import React from 'react';
import Layout from '../components/Layout';
import MonthlySalesTaxSummaryChart from '../components/charts/MonthlySalesTaxSummaryChart';
import RiskAnalysisByIndustryChart from '../components/charts/RiskAnalysisByIndustryChart';
import RiskBreakdownByCategoryChart from '../components/charts/RiskBreakdownByCategoryChart';

function RiskAssessment() {
  const salesData = []
  return (
    <Layout>
      <div className="page-container">
        {/* <h2 className="page-title">Risk Assessment</h2> */}
        <div className="content">
        
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200,
          }}
        >
          <RiskBreakdownByCategoryChart/>
        </div>
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200,
          }}
        >
          <RiskAnalysisByIndustryChart/>
        </div>
        {/* Done by Ankita */}</div>
      </div>
    </Layout>
  );
}

export default RiskAssessment;
