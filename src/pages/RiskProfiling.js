import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import TenureFilter from '../components/filters/TenureFilter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatasets } from '../slice/datasetsSlice';
import { ChevronDown } from 'lucide-react';
import { FixedSizeList as List } from 'react-window';
import { fetchRiskBreakdownByCategoryProfiling } from '../slice/risk-profiling/riskBreakdownCategoryProfilingSlice';
import { Spinner } from 'react-bootstrap';
import { fetchFrequencyOfAnomalyProfiling } from '../slice/risk-profiling/frequencyOfAnomalyProfilingSlice';
import RiskAnomalyFrequencyChart from '../components/charts/RiskAnomalyFrequencyChart';
import RiskBreakdownCategoryProfilingChart from '../components/charts/risk-profiling/RiskBreakdownCategoryProfilingChart';
import GSTBenchmarkProfilingChart from '../components/charts/risk-profiling/GSTBenchmarkProfilingChart';
import SWTBenchmarkProfilingChart from '../components/charts/risk-profiling/SWTBenchmarkProfilingChart';
import { fetchGstBenchmarkProfiling } from '../slice/risk-profiling/gstBenchmarkProfilingSlice';
import { fetchSwtBenchmarkProfiling } from '../slice/risk-profiling/swtBenchmarkProfilingSlice';
import { fetchCitBenchmarkProfiling } from '../slice/risk-profiling/citBenchmarkProfilingSlice';
import { fetchGstBenchmarkCreditsProfiling } from '../slice/risk-profiling/gstBenchmarkCreditsProfilingSlice';
import { fetchSwtBenchmarkEmployeesProfiling } from '../slice/risk-profiling/swtBenchmarkEmployeesProfilingSlice';
import SWTBenchmarkEmployeesProfilingChart from '../components/charts/risk-profiling/SWTBenchmarkEmployeesProfilingChart';
import GSTBenchmarkCreditsProfilingChart from '../components/charts/risk-profiling/GSTBenchmarkCreditsProfilingChart';
import EmployeeLineChart from '../components/charts/EmployeeLineChart';
import MonthlySalesTaxSummaryChart from '../components/charts/MonthlySalesTaxSummaryChart';
import SwtSalariesChart from '../components/charts/SwtSalariesChart';
import TaxpayersRiskChart from '../components/charts/TaxpayersRiskChart';
import { fetchSalesComparison } from '../slice/salesComparisonSlice';
import { fetchEmployeeOnPayroll } from '../slice/employeeOnPayrollSlice';
import { fetchGstPayableVsRefundable } from '../slice/gstPayableVsRefundableSlice';
import { fetchswtSalariesComparison } from '../slice/swtSalariesComparisonSlice';
import './RiskProfilling.css';

function RiskProfiling() {
  const [dateRange, setDateRange] = useState({
    start_date: '01-01-2022',
    end_date: '31-12-2022',
  });
  const dispatch = useDispatch();
  const [selectedTIN, setSelectedTIN] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useSelector((state) => state?.datasets);

  const {
    riskBreakdownByCategoryProfilingData,
    riskBreakdownByCategoryProfilingLoading,
    riskBreakdownByCategoryProfilingError,
  } = useSelector((state) => state?.riskBreakdownByCategoryProfiling);

  const {
    frequencyOfAnomalyProfilingData,
    frequencyOfAnomalyProfilingLoading,
    frequencyOfAnomalyProfilingError,
  } = useSelector((state) => state?.frequencyOfAnomalyProfiling);

  // gst benchmark store
  const {
    gstBenchmarkProfilingData,
    gstBenchmarkProfilingLoading,
    gstBenchmarkProfilingError,
  } = useSelector((state) => state?.gstBenchmarkProfiling);

  // swt benchmark store
  const {
    swtBenchmarkProfilingData,
    swtBenchmarkProfilingLoading,
    swtBenchmarkProfilingError,
  } = useSelector((state) => state?.swtBenchmarkProfiling);

  // cit benchmark store
  const {
    citBenchmarkProfilingData,
    citBenchmarkProfilingLoading,
    citBenchmarkProfilingError,
  } = useSelector((state) => state?.citBenchmarkProfiling);

  const {
    gstBenchmarkCreditsProfilingData,
    gstBenchmarkCreditsProfilingLoading,
    gstBenchmarkCreditsProfilingError,
  } = useSelector((state) => state?.gstBenchmarkCreditsProfiling);

  const {
    swtBenchmarkEmployeesProfilingData,
    swtBenchmarkEmployeesProfilingLoading,
    swtBenchmarkEmployeesProfilingError,
  } = useSelector((state) => state?.swtBenchmarkEmployeesProfiling);

  // GST Sales Comparison
  const { monthlySalesData, monthlySalesLoading, monthlySalesError } =
    useSelector((state) => state?.salesComparison);

  // GST Payable vs Refundable
  const { payrollData, payrollLoading, payrollError } = useSelector(
    (state) => state?.employeeOnPayroll
  );

  // Employee on Payroll Vs Paid SWT
  const { gstData, gstLoading, gstError } = useSelector(
    (state) => state?.gstPayableVsRefundable
  );

  // SWT Salaries Comparison
  const {
    swtSalariesComparisonData,
    swtSalariesComparisonLoading,
    swtSalariesComparisonError,
  } = useSelector((state) => state?.swtSalariesComparison);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDatasets());
    }
  }, [data, dispatch]);

  const fetchedRangeRef = useRef(null);

  const handleFilterChange = (range) => {
    if (
      range.start_date !== dateRange.start_date ||
      range.end_date !== dateRange.end_date
    ) {
      setDateRange(range);
    }
  };
  const tins = data?.tins || [];
  const yearOptions =
    data?.years?.map((year) => ({
      label: String(year),
      value: String(year),
    })) || [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (data?.tins && data.tins.length > 0 && !selectedTIN) {
      // Ensure selectedTIN is set only once initially
      setSelectedTIN(data.tins[data.tins.length - 1]);
    }
  }, [data?.tins, selectedTIN]);

  // Added selectedTIN to dependency array

  const filteredTins = tins.filter((tin) =>
    tin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!gstBenchmarkCreditsProfilingData) {
      dispatch(
        fetchGstBenchmarkCreditsProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!swtBenchmarkEmployeesProfilingData) {
      dispatch(
        fetchSwtBenchmarkEmployeesProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!riskBreakdownByCategoryProfilingData) {
      dispatch(
        fetchRiskBreakdownByCategoryProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }

    if (!gstBenchmarkProfilingData) {
      dispatch(
        fetchGstBenchmarkProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }

    if (!swtBenchmarkProfilingData) {
      dispatch(
        fetchSwtBenchmarkProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }

    if (!citBenchmarkProfilingData) {
      dispatch(
        fetchCitBenchmarkProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!frequencyOfAnomalyProfilingData) {
      dispatch(
        fetchFrequencyOfAnomalyProfiling({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!monthlySalesData) {
      dispatch(
        fetchSalesComparison({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!payrollData) {
      dispatch(
        fetchEmployeeOnPayroll({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!gstData) {
      dispatch(
        fetchGstPayableVsRefundable({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
    if (!swtSalariesComparisonData) {
      dispatch(
        fetchswtSalariesComparison({
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
          tin: selectedTIN,
        })
      );
    }
  }, []);

  const handleSearch = () => {
    dispatch(
      fetchGstBenchmarkCreditsProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchSwtBenchmarkEmployeesProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchRiskBreakdownByCategoryProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );

    dispatch(
      fetchFrequencyOfAnomalyProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );

    dispatch(
      fetchGstBenchmarkProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );

    dispatch(
      fetchSwtBenchmarkProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );

    dispatch(
      fetchCitBenchmarkProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchSalesComparison({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchEmployeeOnPayroll({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchGstPayableVsRefundable({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    dispatch(
      fetchswtSalariesComparison({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="filter-conatiner">
          <label>TIN</label>
          <div ref={dropdownRef} className="tin-container">
            <div
              className="tin-dropdown"
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              {selectedTIN || 'Select TIN'} <ChevronDown />
            </div>
            {isDropdownOpen && (
              <div className="tin-dropdown-list">
                <input
                  type="text"
                  placeholder="Search TIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus // Optional: to focus input when dropdown opens
                />
                <List
                  height={200} // Adjusted height for the list itself
                  itemCount={filteredTins.length}
                  itemSize={35}
                  width={'100%'} // Changed width to be responsive
                >
                  {({ index, style }) => (
                    <div
                      style={{
                        ...style,
                        padding: '8px 12px',
                        background:
                          filteredTins[index] === selectedTIN
                            ? '#e0e7ef'
                            : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setSelectedTIN(filteredTins[index]);
                        setIsDropdownOpen(false);
                        setSearchTerm(''); // Reset search term on selection
                      }}
                      key={filteredTins[index]}
                    >
                      {filteredTins[index]}
                    </div>
                  )}
                </List>
              </div>
            )}
          </div>
          <div className="date-dropdown">
            <TenureFilter
              onFilterChange={handleFilterChange}
              tenureOptions={yearOptions}
            />
          </div>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="content">{/* Content will be added later */}</div>
        <div className="chart-container-small">
          <div className="chart-small">
            {frequencyOfAnomalyProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <RiskAnomalyFrequencyChart
                  riskAnomalyFrequencyData={frequencyOfAnomalyProfilingData}
                />
              </div>
            )}
          </div>
          <div className="chart-small">
            {riskBreakdownByCategoryProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <RiskBreakdownCategoryProfilingChart
                  riskBreakdownByCategoryDataProfiling={
                    riskBreakdownByCategoryProfilingData
                  }
                />
              </div>
            )}
          </div>
        </div>
        {/*gst Benchmark */}
        <div className="chart-container-small">
          <div className="chart-small">
            {gstBenchmarkProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <GSTBenchmarkProfilingChart
                  gstBenchmarkProfilingData={gstBenchmarkProfilingData}
                />
              </div>
            )}
          </div>

          <div className="chart-small">
            {gstBenchmarkCreditsProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <GSTBenchmarkCreditsProfilingChart
                  gstBenchmarkCreditsProfilingData={
                    gstBenchmarkCreditsProfilingData
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/*swt Benchmark */}
        <div className="chart-container-small">
          <div className="chart-small">
            {swtBenchmarkProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <SWTBenchmarkProfilingChart
                  swtBenchmarkProfilingData={swtBenchmarkProfilingData}
                />
              </div>
            )}
          </div>

          <div className="chart-small">
            {swtBenchmarkProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <SWTBenchmarkEmployeesProfilingChart
                  swtBenchmarkEmployeesProfilingData={
                    swtBenchmarkEmployeesProfilingData
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* GST Sales Comparison Line Chart */}
        <div className="chart-container-big">
          <div className="chart-big-heading">GST Sales Comparison</div>
          {monthlySalesLoading ? (
            <div className="chart-big">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <MonthlySalesTaxSummaryChart salesData={monthlySalesData} />
          )}
        </div>

        {/* GST Payable Vs Refundable Bar Chart */}
        <div className="chart-container-big">
          <div className="chart-big-heading">GST Payable vs GST refundable</div>
          {gstLoading ? (
            <div className="chart-big">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <TaxpayersRiskChart data={gstData} />
          )}
        </div>

        {/* Employee on Pqayroll Line Chart */}
        <div className="chart-container-big">
          <div className="chart-big-heading">
            Employees on Payroll vs Paid SWT
          </div>
          {payrollLoading ? (
            <div className="chart-big">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <EmployeeLineChart data={payrollData} />
          )}
        </div>

        {/* --- Line & SWT Chart Row --- */}
        <div className="chart-container-big">
          <div className="chart-big-heading">SWT Salaries Comparison</div>
          {swtSalariesComparisonLoading ? (
            <div className="chart-big">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <SwtSalariesChart data={swtSalariesComparisonData} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RiskProfiling;
