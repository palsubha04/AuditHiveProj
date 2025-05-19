import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FixedSizeList as List } from 'react-window';
import TenureFilter from '../components/filters/TenureFilter';
import Layout from '../components/Layout';
import { fetchDatasets } from '../slice/datasetsSlice';
import { fetchtaxPayersDetails } from '../slice/taxPayersDetailsSlice';
import { ChevronDown } from 'lucide-react';
import TaxPayersGrid from '../components/TaxPayersGrid';
import { Spinner } from 'react-bootstrap';
import './Compliance.css';

const Compliance = () => {
  const dispatch = useDispatch();
  const [selectedTIN, setSelectedTIN] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // Added for search functionality
  const [dateRange, setDateRange] = useState({
    start_date: null,
    end_date: null,
  });
  const { data, loading, error } = useSelector((state) => state?.datasets);
  const { taxPayersData, taxPayersLoading, taxPayersError } = useSelector(
    (state) => state?.taxPayersDetails
  );

  // console.log('Tin Data', data);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDatasets());
    }
  }, [data, dispatch]);

  // useEffect(() => {
  //   if (!taxPayersData) {
  //     dispatch(
  //       fetchtaxPayersDetails({
  //         start_date: '01-01-2020',
  //         end_date: '31-12-2020',
  //         tin: '500000009',
  //       })
  //     );
  //   }
  // }, [taxPayersData, dispatch]);

  const tins = data?.tins || [];
  const yearOptions =
    data?.years?.map((year) => ({
      label: String(year),
      value: String(year),
    })) || [];

  const handleFilterChange = (range) => {
    if (
      range.start_date !== dateRange.start_date ||
      range.end_date !== dateRange.end_date
    ) {
      setDateRange(range);
    }
  };

  const handleSearch = () => {
    // Implement search logic here
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // useEffect(() => {
  //   if (error || monthlySalesError || payrollError || gstError || swtSalariesComparisonError) {
  //     toast.error(error, { position: 'top-right' });
  //   }
  // }, [error, monthlySalesError, payrollError, gstError, swtSalariesComparisonError]);

  useEffect(() => {
    if (data?.tins && data.tins.length > 0 && !selectedTIN) {
      // Ensure selectedTIN is set only once initially
      setSelectedTIN(data.tins[data.tins.length - 1]);
    }
  }, [data?.tins, selectedTIN]); // Added selectedTIN to dependency array

  const filteredTins = tins.filter((tin) =>
    tin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Layout>
        <div className="page-container">
          <div className="filter-container">
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
                    maxHeight: 240, // Adjusted maxHeight to accommodate input
                    overflow: 'hidden',
                    display: 'flex', // Added to manage layout of input and list
                    flexDirection: 'column', // Added for vertical layout
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search TIN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      borderBottom: '1px solid #eee',
                      outline: 'none',
                      width: 'calc(100% - 24px)', // Adjust width to account for padding
                      boxSizing: 'border-box',
                    }}
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
          <div
            style={{
              marginTop: 24,
              padding: '20px',
              background: '#f1f5ff',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: 600,
              color: '#2563eb',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px 0 #e0e7ef55',
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            New Page View Will Be coming soon
          </div>
        </div>

        {/* --- Dat Grid Row --- */}
        {/* <div
          style={{
            marginTop: 32,
            border: '1px solid #f1f5f9',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #f1f5ff 0%, #fff 100%)',
            boxShadow: '0 2px 16px 0 #e0e7ef55',
            padding: '24px 24px 8px 24px',
            minWidth: 900,
            maxWidth: 1200,
          }}
        >
          {taxPayersLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 250,
              }}
            >
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <TaxPayersGrid data={taxPayersData} />
          )}
        </div> */}
        {/* --- End Line & SWT Chart Row --- */}
      </Layout>
    </>
  );
};

export default Compliance;
