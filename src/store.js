import { configureStore } from '@reduxjs/toolkit';
import datasetsReducer from './slice/datasetsSlice';
import salesComparisonReducer from './slice/salesComparisonSlice';
import riskBreakdownByCategoryReducer from './slice/riskBreakdownByCategorySlice';
import totalVsFlaggedTaxpayersReducer from './slice/totalVsFlaggedTaxpayersSlice';
import riskAnalysisByIndustryReducer from './slice/riskAnalysisByIndustrySlice';
import riskAnomalyFrequencyReducer from './slice/riskAnomalyFrequencySlice';
import riskBreakdownByCategoryProfilingReducer from './slice/risk-profiling/riskBreakdownCategoryProfilingSlice'
import frequencyOfAnomalyProfilingReducer from './slice/risk-profiling/frequencyOfAnomalyProfilingSlice'
import topFraudRulesProfilingReducer from './slice/risk-profiling/topFraudRulesProfilingSlice'
import gstBenchmarkProfilingReducer from './slice/risk-profiling/gstBenchmarkProfilingSlice'
import citBenchmarkProfilingReducer from "./slice/risk-profiling/citBenchmarkProfilingSlice";
import swtBenchmarkProfilingReducer from "./slice/risk-profiling/swtBenchmarkProfilingSlice";
import swtSalariesComparisonReducer from './slice/swtSalariesComparisonSlice';
import taxPayersDetailsReducer from './slice/taxPayersDetailsSlice';

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    salesComparison: salesComparisonReducer,
    riskBreakdownByCategory: riskBreakdownByCategoryReducer,
    totalVsFlaggedTaxpayers: totalVsFlaggedTaxpayersReducer,
    riskAnalysisByIndustry: riskAnalysisByIndustryReducer,
    riskAnomalyFrequency: riskAnomalyFrequencyReducer,
    riskBreakdownByCategoryProfiling: riskBreakdownByCategoryProfilingReducer,
    frequencyOfAnomalyProfiling: frequencyOfAnomalyProfilingReducer,
    topFraudRulesProfiling: topFraudRulesProfilingReducer,
    gstBenchmarkProfiling: gstBenchmarkProfilingReducer,
    citBenchmarkProfiling: citBenchmarkProfilingReducer,
    swtBenchmarkProfiling: swtBenchmarkProfilingReducer,
    swtSalariesComparison: swtSalariesComparisonReducer,
    taxPayersDetails: taxPayersDetailsReducer,
  },
});

export default store;
