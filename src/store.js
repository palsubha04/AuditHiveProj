import { configureStore } from '@reduxjs/toolkit';
import datasetsReducer from './slice/datasetsSlice';
import salesComparisonReducer from './slice/salesComparisonSlice';
import riskBreakdownByCategoryReducer from './slice/riskBreakdownByCategorySlice';
import totalVsFlaggedTaxpayersReducer from './slice/totalVsFlaggedTaxpayersSlice';
import riskAnalysisByIndustryReducer from './slice/riskAnalysisByIndustrySlice';
import employeeOnPayrollReducer from './slice/employeeOnPayrollSlice';
import gstPayableVsRefundableReducer from './slice/gstPayableVsRefundableSlice';
import riskAnomalyFrequencyReducer from './slice/riskAnomalyFrequencySlice';

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
  },
});

export default store;
