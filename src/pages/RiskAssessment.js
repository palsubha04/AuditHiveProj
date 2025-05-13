import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MonthlySalesTaxSummaryChart from '../components/charts/MonthlySalesTaxSummaryChart';
import RiskAnalysisByIndustryChart from '../components/charts/RiskAnalysisByIndustryChart';
import RiskBreakdownByCategoryChart from '../components/charts/RiskBreakdownByCategoryChart';

import EmployeeLineChart from '../components/charts/EmployeeLineChart';
import TotalVsFlaggedLineChart from '../components/charts/TotalVsFlaggedLineChart';
import { useDispatch, useSelector } from 'react-redux';
import TenureFilter from '../components/filters/TenureFilter';
import { fetchTotalVsFlaggedTaxpayers } from '../slice/totalVsFlaggedTaxpayersSlice';
import { fetchRiskBreakdownByCategory } from '../slice/riskBreakdownByCategorySlice';
import { fetchRiskAnalysis } from '../slice/riskAnalysisByIndustrySlice';

// Added by Soham - Total Tax Payer vs Risk Flagged



const entityTypes = ['large', 'medium', 'small', 'micro'];

function RiskAssessment() {

  const [dateRange, setDateRange] = useState('');
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.datasets);

  const { totalVsFlaggedTaxpayersData, totalVsFlaggedTaxpayersLoading, totalVsFlaggedTaxpayersError } = useSelector((state) => state?.totalVsFlaggedTaxpayers);
  const { riskBreakdownByCategoryData, riskBreakdownByCategoryLoading, riskBreakdownByCategoryError } = useSelector((state) => state?.riskBreakdownByCategory);
  const { riskAnalysisByIndustryData, riskAnalysisByIndustryLoading, riskAnalysisByIndustryError } = useSelector((state) => state?.riskAnalysisByIndustry);

  console.log("totalVsFlaggedTaxpayersData", totalVsFlaggedTaxpayersData);
 
  useEffect(() => {
    if (!totalVsFlaggedTaxpayersData) {
      dispatch(
        fetchTotalVsFlaggedTaxpayers({
          start_date: '01-01-2022',
          end_date: '31-12-2022'
        })
      );
    }
    if (!riskBreakdownByCategoryData) {
      dispatch(
        fetchRiskBreakdownByCategory({
          start_date: '01-01-2022',
          end_date: '31-12-2022'
        })
      );
    }
    if(!riskAnalysisByIndustryData) {
      dispatch(
        fetchRiskAnalysis({
          start_date: '01-01-2022',
          end_date: '31-12-2022'
        })
      );
    }
  }, [totalVsFlaggedTaxpayersData,riskBreakdownByCategoryData,riskAnalysisByIndustryData, dispatch]);
  const handleFilterChange = (range) => {
    setDateRange(range);
  }
  const yearOptions =
  data?.years?.map((year) => ({
    label: String(year),
    value: String(year),
  })) || [];
  return (
    <Layout>
      <div className="page-container">
      <TenureFilter
                onFilterChange={handleFilterChange}
                tenureOptions={yearOptions}
              />
        {/* <h2 className="page-title">Risk Assessment</h2> */}
        <div className="content">
        {/* <div style={{display: 'flex', gap: "5px"}}> */}
        <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            // minWidth: 900,
            // maxWidth: 1200,
            width: "100%",
          }}
        >
          <RiskBreakdownByCategoryChart riskBreakdownByCategoryData={riskBreakdownByCategoryData}/>
        </div>
        <div style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: '#fff',
            boxShadow: '0 0 0 0 #0000',
            padding: '24px 24px 8px 24px',
            // minWidth: 900,
            // maxWidth: 1200,
            width: "100%",
            
          }}
        >
          <TotalVsFlaggedLineChart totalTaxPayerVsRiskFlagged={totalVsFlaggedTaxpayersData}/>
        </div>
        {/* </div> */}
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
          <RiskAnalysisByIndustryChart riskData={riskAnalysisByIndustryData}/>
        </div>
        {/* Done by Ankita */}</div>
      </div>
    </Layout>
  );
}

export default RiskAssessment;
