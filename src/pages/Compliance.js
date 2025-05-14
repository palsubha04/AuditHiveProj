import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { FixedSizeList as List } from 'react-window';
import EmployeeLineChart from '../components/charts/EmployeeLineChart';
import MonthlySalesTaxSummaryChart from '../components/charts/MonthlySalesTaxSummaryChart';
import SwtSalariesChart from '../components/charts/SwtSalariesChart';
import TenureFilter from '../components/filters/TenureFilter';
import Layout from '../components/Layout';
import { fetchDatasets } from '../slice/datasetsSlice';
import { fetchSalesComparison } from '../slice/salesComparisonSlice';
import { ChevronDown } from 'lucide-react';
import TaxpayersRiskChart from '../components/charts/TaxpayersRiskChart';
import TaxPayersGrid from '../components/TaxPayersGrid';

const Compliance = () => {
  const dispatch = useDispatch();
  const [selectedTIN, setSelectedTIN] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dateRange, setDateRange] = useState('');
  const { data, loading, error } = useSelector((state) => state?.datasets);
  const { monthlySalesData, monthlySalesLoading, monthlySalesError } =
    useSelector((state) => state?.salesComparison);
  const [salesData, setSalesData] = useState({});

  console.log('current data', dateRange);

  useEffect(() => {
    if (!monthlySalesData) {
      dispatch(
        fetchSalesComparison({
          start_date: '01-01-2021',
          end_date: '31-12-2021',
          tin: '500000009',
        })
      );
    }
  }, [monthlySalesData, dispatch]);

  useEffect(() => {
    if (monthlySalesData) {
      setSalesData(monthlySalesData);
    }
  }, [monthlySalesData]);

  console.log('Sales Data: ', salesData);

  const tins = data?.tins || [];
  const yearOptions =
    data?.years?.map((year) => ({
      label: String(year),
      value: String(year),
    })) || [];

  console.log('year options: ', yearOptions);

  const handleFilterChange = (range) => {
    setDateRange(range);
  };

  // const formatDate = (date) => {
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  const handleSearch = () => {
    // Implement search logic here
    // You can use selectedTax, dateRange.start_date, dateRange.end_date
    dispatch(
      fetchSalesComparison({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        tin: selectedTIN,
      })
    );
    // dispatch(
    //   fetchSalesComparison({
    //     start_date: '01-01-2022',
    //     end_date: '31-12-2022',
    //     tin: '500000009',
    //   })
    // );
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchDatasets());
    }
  }, [data, dispatch]);

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
    if (error || monthlySalesError) {
      toast.error(error, { position: 'top-right' });
    }
  }, [error, monthlySalesError]);

  useEffect(() => {
    if (data?.tins && data.tins.length > 0) {
      setSelectedTIN(data.tins[0]);
    }
  }, [data?.tins]);

  // if (loading || monthlySalesLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         minHeight: '60vh',
  //       }}
  //     >
  //       <ClipLoader size={60} color="#2563eb" />
  //       <ToastContainer />
  //     </div>
  //   );
  // }

  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="page-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <label style={{ fontWeight: 'bold', marginRight: 8 }}>TIN</label>
            <div ref={dropdownRef} style={{ position: 'relative', width: 200 }}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: 3,
                  background: '#fff',
                  cursor: 'pointer',
                  minHeight: 6,
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onClick={() => setIsDropdownOpen((open) => !open)}
              >
                {selectedTIN || 'Select TIN'} <ChevronDown />
              </div>
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '100%',
                    zIndex: 10,
                    border: '1px solid #eee',
                    borderRadius: 4,
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    maxHeight: 200,
                    overflow: 'hidden',
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
                          padding: '8px 12px',
                          background:
                            tins[index] === selectedTIN ? '#e0e7ef' : '#fff',
                          cursor: 'pointer',
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
                flex: '0 1 auto',
                minWidth: 0,
                height: 48,
                display: 'flex',
                alignItems: 'center',
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
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 20,
                padding: '8px 24px',
                fontWeight: 500,
                marginLeft: 8,
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Chart Card Section */}
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
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            Monthly Sales & Tax Summary
          </div>
          <MonthlySalesTaxSummaryChart salesData={salesData} />
        </div>
        {/* End Chart Card Section */}

        {/* --- Bar Chart Row --- */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 32,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Line Chart Card */}
          <div
            style={{
              flex: 1,
              maxWidth: '50%',
              border: '1px solid #e0e7ef',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
              boxShadow: '0 2px 16px 0 #e0e7ef55',
              padding: '32px 32px 16px 32px',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: '#6366f1',
                letterSpacing: 1,
                minHeight: 28,
                marginBottom: 18,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              Employees on Payroll vs Paid SWT
            </div>
            <EmployeeLineChart />
          </div>

          {/* Bar Chart Card */}
          <div
            style={{
              flex: 1,
              maxWidth: '50%',
              border: '1px solid #e0e7ef',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
              boxShadow: '0 2px 16px 0 #e0e7ef55',
              padding: '32px 32px 16px 32px',
              minWidth: 0, // allow shrinking
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: '#6366f1',
                letterSpacing: 1,
                minHeight: 28,
                marginBottom: 18,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              Total TaxPayers vs Risk Flagged
            </div>
            <TaxpayersRiskChart />
          </div>
        </div>

        {/* --- Line & SWT Chart Row --- */}
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
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#6366f1',
              letterSpacing: 1,
              minHeight: 28,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            SWT Salaries Comparison
          </div>
          <SwtSalariesChart />
        </div>

        {/* --- Dat Grid Row --- */}
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
          <TaxPayersGrid />
        </div>
        {/* --- End Line & SWT Chart Row --- */}
      </Layout>
    </>
  );
};

export default Compliance;
