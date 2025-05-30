import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios.config";

// Accept parameters for dynamic end_date and tin
export const fetchSwtBenchmarkProfiling = createAsyncThunk(
  "swtBenchmarkProfiling/fetch",
  async ({ start_date, end_date, tin }) => {
    console.log("start_date", start_date);
    console.log("end_date", end_date);
    console.log("tin", tin);
    const response = await api.get(
      `/analytics/compliance/benchmark/total_salary_wages_paid_vs_total_swt_tax_deducted/${tin}?start_date=${start_date}&end_date=${end_date}`
    );
    console.log("response", response);
    return response.data;
  }
);

const swtBenchmarkProfilingSlice = createSlice({
  name: "swtBenchmarkProfiling",
  initialState: {
    swtBenchmarkProfilingData: null,
    swtBenchmarkProfilingLoading: false,
    swtBenchmarkProfilingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwtBenchmarkProfiling.pending, (state) => {
        state.swtBenchmarkProfilingLoading = true;
        state.swtBenchmarkProfilingError = null;
      })
      .addCase(fetchSwtBenchmarkProfiling.fulfilled, (state, action) => {
        state.swtBenchmarkProfilingLoading = false;
        state.swtBenchmarkProfilingData = action.payload;
      })
      .addCase(fetchSwtBenchmarkProfiling.rejected, (state, action) => {
        state.swtBenchmarkProfilingLoading = false;
        state.swtBenchmarkProfilingError = action.error.message;
      });
  },
});

export default swtBenchmarkProfilingSlice.reducer;