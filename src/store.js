import { configureStore } from '@reduxjs/toolkit';
import datasetsReducer from './slice/datasetsSlice';
import salesComparisonReducer from './slice/salesComparisonSlice';
import riskBreakdownByCategoryReducer from './slice/riskBreakdownByCategorySlice';
import totalVsFlaggedTaxpayersReducer from './slice/totalVsFlaggedTaxpayersSlice';
import riskAnalysisByIndustryReducer from './slice/riskAnalysisByIndustrySlice';
import employeeOnPayrollReducer from './slice/employeeOnPayrollSlice';
import gstPayableVsRefundableReducer from './slice/gstPayableVsRefundableSlice';
import riskAnomalyFrequencyReducer from './slice/riskAnomalyFrequencySlice';
import swtSalariesComparisonReducer from './slice/swtSalariesComparisonSlice';
import taxPayersDetailsReducer from './slice/taxPayersDetailsSlice';
import riskBreakdownByCategoryProfilingReducer from './slice/risk-profiling/riskBreakdownCategoryProfilingSlice';
import frequencyOfAnomalyProfilingReducer from './slice/risk-profiling/frequencyOfAnomalyProfilingSlice';
import topFraudRulesProfilingReducer from './slice/risk-profiling/topFraudRulesProfilingSlice';
import gstBenchmarkProfilingReducer from './slice/risk-profiling/gstBenchmarkProfilingSlice';
import citBenchmarkProfilingReducer from './slice/risk-profiling/citBenchmarkProfilingSlice';
import swtBenchmarkProfilingReducer from './slice/risk-profiling/swtBenchmarkProfilingSlice';

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    salesComparison: salesComparisonReducer,
    riskBreakdownByCategory: riskBreakdownByCategoryReducer,
    totalVsFlaggedTaxpayers: totalVsFlaggedTaxpayersReducer,
    riskAnalysisByIndustry: riskAnalysisByIndustryReducer,
    employeeOnPayroll: employeeOnPayrollReducer,
    gstPayableVsRefundable: gstPayableVsRefundableReducer,
    riskAnomalyFrequency: riskAnomalyFrequencyReducer,
    swtSalariesComparison: swtSalariesComparisonReducer,
    taxPayersDetails: taxPayersDetailsReducer,
    riskBreakdownByCategoryProfiling: riskBreakdownByCategoryProfilingReducer,
    frequencyOfAnomalyProfiling: frequencyOfAnomalyProfilingReducer,
    topFraudRulesProfiling: topFraudRulesProfilingReducer,
    gstBenchmarkProfiling: gstBenchmarkProfilingReducer,
    citBenchmarkProfiling: citBenchmarkProfilingReducer,
    swtBenchmarkProfiling: swtBenchmarkProfilingReducer,
  },
});

export default store;
