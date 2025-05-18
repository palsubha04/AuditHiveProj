import React, { useEffect, useRef, useState } from 'react';
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
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import { fetchDatasets } from '../slice/datasetsSlice';
import RiskAnomalyFrequencyChart from '../components/charts/RiskAnomalyFrequencyChart';
import { fetchRiskAnomaly } from '../slice/riskAnomalyFrequencySlice';
import { Spinner } from 'react-bootstrap';
//import { set } from "react-datepicker/dist/date_utils";

// Added by Soham - Total Tax Payer vs Risk Flagged

const entityTypes = ['large', 'medium', 'small', 'micro'];

function RiskAssessment() {
  const [dateRange, setDateRange] = useState({
    start_date: null,
    end_date: null,
  });
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state?.datasets);
  //const [fetchedFlaggedRange, setFetchedFlaggedRange] = useState(null);

  const {
    totalVsFlaggedTaxpayersData,
    totalVsFlaggedTaxpayersLoading,
    totalVsFlaggedTaxpayersError,
  } = useSelector((state) => state?.totalVsFlaggedTaxpayers);

  const {
    riskBreakdownByCategoryData,
    riskBreakdownByCategoryLoading,
    riskBreakdownByCategoryError,
  } = useSelector((state) => state?.riskBreakdownByCategory);

  const { riskAnalysisData, riskAnalysisLoading, riskAnalysisError } =
    useSelector((state) => state?.riskAnalysisByIndustry);

  const {
    riskAnomalyFrequencyData,
    riskAnomalyFrequencyLoading,
    riskAnomalyFrequencyError,
  } = useSelector((state) => state?.riskAnomalyFrequency);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDatasets());
    }
  }, [data, dispatch]);

  const fetchedRangeRef = useRef(null);

  useEffect(() => {
    if (!dateRange.start_date || !dateRange.end_date) return;

    const currentKey = `${dateRange.start_date}-${dateRange.end_date}`;
    if (fetchedRangeRef.current === currentKey) {
      console.log('Skipping fetch, already fetched:', currentKey);
      return;
    }

    console.log('Dispatching for new range:', currentKey);
    fetchedRangeRef.current = currentKey;

    dispatch(fetchTotalVsFlaggedTaxpayers(dateRange));
    dispatch(fetchRiskBreakdownByCategory(dateRange));
    dispatch(fetchRiskAnalysis(dateRange));
    dispatch(fetchRiskAnomaly(dateRange));
  }, [dateRange, dispatch]);

  const handleFilterChange = (range) => {
    if (
      range.start_date !== dateRange.start_date ||
      range.end_date !== dateRange.end_date
    ) {
      setDateRange(range);
    }
  };
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
              display: 'flex',
              gap: '30px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                marginTop: 32,
                border: '1px solid #e6edff',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
                boxShadow: '0 2px 16px 0 #e0e7ef55',
                padding: '24px 24px 8px 24px',
                maxWidth: '50%',
                minWidth: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '500px',
                maxHeight: '500px',
              }}
            >
              {totalVsFlaggedTaxpayersLoading ? (
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div className="p-0 w-100">
                  <TotalVsFlaggedLineChart
                    totalTaxPayerVsRiskFlagged={totalVsFlaggedTaxpayersData}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: 32,
                border: '1px solid #e6edff',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
                boxShadow: '0 2px 16px 0 #e0e7ef55',
                padding: '24px 24px 8px 24px',
                // maxWidth: "50%",
                // minWidth: "50%",
                flex: 'auto',
                minHeight: '500px',
                maxHeight: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {riskAnomalyFrequencyLoading ? (
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div className="p-0 w-100">
                  <RiskAnomalyFrequencyChart
                    riskAnomalyFrequencyData={riskAnomalyFrequencyData}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: 32,
              border: '1px solid #e6edff',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
              boxShadow: '0 2px 16px 0 #e0e7ef55',
              padding: '24px 24px 8px 24px',
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '500px',
              maxHeight: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {riskBreakdownByCategoryLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <RiskBreakdownByCategoryChart
                  riskBreakdownByCategoryData={riskBreakdownByCategoryData}
                />
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: 32,
              border: '1px solid #e6edff',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
              boxShadow: '0 2px 16px 0 #e0e7ef55',
              padding: '24px 24px 8px 24px',
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '500px',
              maxHeight: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {riskAnalysisLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <RiskAnalysisByIndustryChart riskData={riskAnalysisData} />
              </div>
            )}
          </div>
          {/* Done by Ankita */}
        </div>
      </div>
    </Layout>
  );
}

export default RiskAssessment;
