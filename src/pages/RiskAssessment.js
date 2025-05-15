import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MonthlySalesTaxSummaryChart from "../components/charts/MonthlySalesTaxSummaryChart";
import RiskAnalysisByIndustryChart from "../components/charts/RiskAnalysisByIndustryChart";
import RiskBreakdownByCategoryChart from "../components/charts/RiskBreakdownByCategoryChart";

import EmployeeLineChart from "../components/charts/EmployeeLineChart";
import TotalVsFlaggedLineChart from "../components/charts/TotalVsFlaggedLineChart";
import { useDispatch, useSelector } from "react-redux";
import TenureFilter from "../components/filters/TenureFilter";
import { fetchTotalVsFlaggedTaxpayers } from "../slice/totalVsFlaggedTaxpayersSlice";
import { fetchRiskBreakdownByCategory } from "../slice/riskBreakdownByCategorySlice";
import { fetchRiskAnalysis } from "../slice/riskAnalysisByIndustrySlice";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import { fetchDatasets } from "../slice/datasetsSlice";
//import { set } from "react-datepicker/dist/date_utils";

// Added by Soham - Total Tax Payer vs Risk Flagged

const entityTypes = ["large", "medium", "small", "micro"];

function RiskAssessment() {
  const [dateRange, setDateRange] = useState({ start_date: null, end_date: null });
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state?.datasets);
  const [fetchedFlaggedRange, setFetchedFlaggedRange] = useState(null);

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
  const {
    riskAnalysisData,
    riskAnalysisLoading,
    riskAnalysisError,
  } = useSelector((state) => state?.riskAnalysisByIndustry);

  const [
    totalVsFlaggedTaxpayersDataState,
    setTotalVsFlaggedTaxpayersDataState,
  ] = useState({});
  const [
    riskBreakdownByCategoryDataState,
    setRiskBreakdownByCategoryDataState,
  ] = useState({});

  useEffect(() => {
    if (!data) {
      dispatch(fetchDatasets());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!dateRange.start_date || !dateRange.end_date) return;
    const currentKey = `${dateRange.start_date}-${dateRange.end_date}`;
  if (fetchedFlaggedRange === currentKey) return;


   // if (!totalVsFlaggedTaxpayersData) {
      dispatch(
        fetchTotalVsFlaggedTaxpayers({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
        })
      );
    //}
    setFetchedFlaggedRange(currentKey);

  }, [totalVsFlaggedTaxpayersData,dateRange, dispatch]);

  useEffect(() => {
    if (!dateRange.start_date || !dateRange.end_date) return;
    const currentKey = `${dateRange.start_date}-${dateRange.end_date}`;
    if (fetchedFlaggedRange === currentKey) return;
  
  
   // if (!riskBreakdownByCategoryData) {
      dispatch(
        fetchRiskBreakdownByCategory({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
        })
      );
      setFetchedFlaggedRange(currentKey);
   // }
  }, [riskBreakdownByCategoryData,dateRange, dispatch]);

  useEffect(() => {
    if (!dateRange.start_date || !dateRange.end_date) return;
    const currentKey = `${dateRange.start_date}-${dateRange.end_date}`;
    if (fetchedFlaggedRange === currentKey) return;
  
  
  // if (!riskAnalysisData) {
      dispatch(
        fetchRiskAnalysis({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
        })
      );
      setFetchedFlaggedRange(currentKey);
   // }
  }, [riskAnalysisData,dateRange, dispatch]);

  

  console.log("data", data);
  console.log("dateRange", dateRange);

  

  console.log(
    "totalVsFlaggedTaxpayersDataState",
    totalVsFlaggedTaxpayersDataState
  );

  const handleFilterChange = (range) => {
    setDateRange(range);
  };
  const yearOptions =
    data?.years?.map((year) => ({
      label: String(year),
      value: String(year),
    })) || [];

  if (
    loading ||
    riskBreakdownByCategoryLoading ||
    totalVsFlaggedTaxpayersLoading ||
    riskAnalysisLoading
  ) {
    return (
      <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <ClipLoader size={60} color="#2563eb" />
        <ToastContainer />
      </div>
      </Layout>
    );
  }
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
            border: '1px solid #e6edff',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '24px 24px 8px 24px',
            minWidth: '100%',
            maxWidth: '100%',
          }}
        >
          <RiskBreakdownByCategoryChart
            riskBreakdownByCategoryData={riskBreakdownByCategoryData}
          />
        </div>

        <div style={{ "display": "flex", "gap": "30px", justifyContent: 'space-between' }}>
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
            }}
          >
            <TotalVsFlaggedLineChart
              totalTaxPayerVsRiskFlagged={totalVsFlaggedTaxpayersData}
            />
          </div>
          <div
            style={{
              marginTop: 32,
              border: '1px solid #e6edff',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f1f5ff 80%, #fff 100%)',
              boxShadow: '0 2px 16px 0 #e0e7ef55',
              padding: '24px 24px 8px 24px',
              flex: 'auto',
            }}
          >
            4th Chart Risk Assessment
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
          }}
        >
          <RiskAnalysisByIndustryChart riskData={riskAnalysisData} />
        </div>
        {/* Done by Ankita */}
      </div>
    </div>
  </Layout>
  );
}

export default RiskAssessment;