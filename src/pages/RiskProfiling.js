import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import TenureFilter from "../components/filters/TenureFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatasets } from "../slice/datasetsSlice";
import { ToastContainer, toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { FixedSizeList as List } from "react-window";
import { fetchRiskBreakdownByCategoryProfiling } from "../slice/risk-profiling/riskBreakdownCategoryProfilingSlice";
import { Spinner } from "react-bootstrap";
import RiskBreakdownCategoryProfiling from "../components/charts/risk-profiling/RiskBreakdownCategoryProfilingChart";
import { fetchFrequencyOfAnomalyProfiling } from "../slice/risk-profiling/frequencyOfAnomalyProfilingSlice";
import RiskAnomalyFrequencyChart from "../components/charts/RiskAnomalyFrequencyChart";
import { fetchTopFraudRulesProfiling } from "../slice/risk-profiling/topFraudRulesProfilingSlice";
import TopFraudRulesProfiling from "../components/charts/risk-profiling/TopFraudRulesProfiling";

function RiskProfiling() {
  const [dateRange, setDateRange] = useState({
    start_date: null,
    end_date: null,
  });
  const dispatch = useDispatch();
  const [selectedTIN, setSelectedTIN] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data, loading, error } = useSelector((state) => state?.datasets);

  //filters for top fraud
  const [selectedTaxType, setSelectedTaxType] = useState("gst");
  const [selectedSegmentation, setSelectedSegmentation] = useState("all");

  const {
    riskBreakdownByCategoryDataProfiling,
    riskBreakdownByCategoryLoadingProfiling,
    riskBreakdownByCategoryErrorProfiling,
  } = useSelector((state) => state?.riskBreakdownByCategoryProfiling);

  const {
    frequencyOfAnomalyProfilingData,
    frequencyOfAnomalyProfilingLoading,
    frequencyOfAnomalyProfilingError,
  } = useSelector((state) => state?.frequencyOfAnomalyProfiling);

  const {
    topFraudRulesProfilingData,
    topFraudRulesProfilingLoading,
    topFraudRulesProfilingError,
  } = useSelector((state) => state?.topFraudRulesProfiling);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (data?.tins && data.tins.length > 0) {
      setSelectedTIN(data.tins[0]);
    }
  }, [data?.tins]);

    useEffect(() => {
      if (!riskBreakdownByCategoryDataProfiling) {
        dispatch(
          fetchRiskBreakdownByCategoryProfiling({
            start_date: "01-01-2021",
            end_date: "31-12-2021",
            tin: "500000009",
          })
        );
      }

      if(!topFraudRulesProfilingData){
        dispatch(
          fetchTopFraudRulesProfiling({
            start_date: "01-01-2021",
            end_date: "31-12-2021",
            tin: "500000009",
            taxType: "gst",
            segmentation: "large",
          })
        );
      }
    }, []);

  const handleSearch = () => {
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
      fetchTopFraudRulesProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: "500000009",
        taxType: "gst",
        segmentation: "large",
      })
    );

  };

  const handleTopFraudFilterChange = (taxType, segmentation) => {
    console.log("filter chaged");
    console.log("taxtype", taxType);
    console.log("segmentaion", segmentation)
    setSelectedTaxType(taxType);
    setSelectedSegmentation(segmentation);
    dispatch(
      fetchTopFraudRulesProfiling({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: "500000009",
        taxType: taxType,
        segmentation: segmentation,
      })
    );
  }
  return (
    <Layout>
      <div className="page-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <label style={{ fontWeight: "bold", marginRight: 8 }}>TIN</label>
          <div ref={dropdownRef} style={{ position: "relative", width: 200 }}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 3,
                background: "#fff",
                cursor: "pointer",
                minHeight: 6,
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              {selectedTIN || "Select TIN"} <ChevronDown />
            </div>
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  width: "100%",
                  zIndex: 10,
                  border: "1px solid #eee",
                  borderRadius: 4,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  maxHeight: 200,
                  overflow: "hidden",
                }}
              >
                <List
                  height={200}
                  itemCount={tins.length}
                  itemSize={35}
                  width={240}
                >
                  {({ index, style }) => (
                    <div
                      style={{
                        ...style,
                        padding: "8px 12px",
                        background:
                          tins[index] === selectedTIN ? "#e0e7ef" : "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedTIN(tins[index]);
                        setIsDropdownOpen(false);
                      }}
                      key={tins[index]}
                    >
                      {tins[index]}
                    </div>
                  )}
                </List>
              </div>
            )}
          </div>
          <div
            style={{
              flex: "0 1 auto",
              minWidth: 0,
              height: 48,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TenureFilter
              onFilterChange={handleFilterChange}
              tenureOptions={yearOptions}
            />
          </div>
          <button
            onClick={handleSearch}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "8px 24px",
              fontWeight: 500,
              marginLeft: 8,
            }}
          >
            Search
          </button>
        </div>

        <div className="content">{/* Content will be added later */}</div>
        <div
          style={{
            marginTop: 32,
            border: "1px solid #e6edff",
            borderRadius: 16,
            background: "linear-gradient(135deg, #f1f5ff 80%, #fff 100%)",
            boxShadow: "0 2px 16px 0 #e0e7ef55",
            padding: "24px 24px 8px 24px",
            maxWidth: "100%",
            minWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "500px",
            maxHeight: "500px",
          }}
        >
          {riskBreakdownByCategoryLoadingProfiling ? (
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div className="p-0 w-100">
              <RiskBreakdownCategoryProfiling
                riskBreakdownByCategoryDataProfiling={
                  riskBreakdownByCategoryDataProfiling
                }
              />
            </div>
          )}
          3
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginTop: 32,
              border: "1px solid #e6edff",
              borderRadius: 16,
              background: "linear-gradient(135deg, #f1f5ff 80%, #fff 100%)",
              boxShadow: "0 2px 16px 0 #e0e7ef55",
              padding: "24px 24px 8px 24px",
              maxWidth: "50%",
              minWidth: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "500px",
              maxHeight: "500px",
            }}
          >
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
          <div
            style={{
              marginTop: 32,
              border: "1px solid #e6edff",
              borderRadius: 16,
              background: "linear-gradient(135deg, #f1f5ff 80%, #fff 100%)",
              boxShadow: "0 2px 16px 0 #e0e7ef55",
              padding: "24px 24px 8px 24px",
              maxWidth: "50%",
              minWidth: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "500px",
              maxHeight: "500px",
            }}
          >
            {topFraudRulesProfilingLoading ? (
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="p-0 w-100">
                <TopFraudRulesProfiling
                  topFraudRulesProfilingData={topFraudRulesProfilingData}
                  handleTopFraudFilterChange={handleTopFraudFilterChange}
                  selectedTaxType={selectedTaxType}
                  selectedSegmentation={selectedSegmentation}
                />
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginTop: 32,
              border: "1px solid #e6edff",
              borderRadius: 16,
              background: "linear-gradient(135deg, #f1f5ff 80%, #fff 100%)",
              boxShadow: "0 2px 16px 0 #e0e7ef55",
              padding: "24px 24px 8px 24px",
              maxWidth: "50%",
              minWidth: "50%",
            }}
          >
            {" "}
            4
          </div>
          <div
            style={{
              marginTop: 32,
              border: "1px solid #e6edff",
              borderRadius: 16,
              background: "linear-gradient(135deg, #f1f5ff 80%, #fff 100%)",
              boxShadow: "0 2px 16px 0 #e0e7ef55",
              padding: "24px 24px 8px 24px",
              flex: "auto",
            }}
          >
            5
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RiskProfiling;
