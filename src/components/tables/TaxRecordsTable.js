import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Form, Badge } from 'react-bootstrap';
import Table from '../Table';
import gstService from '../../services/gst.service';
import debounce from 'lodash/debounce';
import '../../pages/Dashboard.css';

const TaxRecordsTable = ({ startDate, endDate }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTin, setSearchTin] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [fraudFilter, setFraudFilter] = useState('all'); // all | fraud | valid

  const fetchRecords = async (tin = '', page = 1, append = false) => {
    if (loading || isLoadingMore) return;

    if (page === 1) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    setError(null);
    try {
      let response;
      if (tin) {
        response = await gstService.getTaxRecordsByTIN(tin);
        console.log('received data', response);
        setRecords(response.records);
      } else {
        response = await gstService.getTaxRecords(startDate, endDate, page);
        console.log('received data', response);
        if (append) {
          setRecords((prev) => [...prev, ...response.records]);
        } else {
          setRecords(response.records);
        }
      }
      setTotalRecords(response.total_data_count);
    } catch (err) {
      setError('Failed to fetch tax records');
      console.error('Error fetching tax records:', err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      setCurrentPage(1);
      if (value) {
        fetchRecords(value);
      } else {
        fetchRecords();
      }
    }, 500),
    [startDate, endDate]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTin(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (startDate && endDate) {
      setCurrentPage(1);
      fetchRecords();
    }
  }, [startDate, endDate]);

  const handleLoadMore = useCallback(() => {
    if (records.length < totalRecords && !loading && !isLoadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchRecords(searchTin, nextPage, true);
    }
  }, [
    records.length,
    totalRecords,
    loading,
    isLoadingMore,
    currentPage,
    searchTin,
  ]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const columns = [
    {
      accessorKey: 'tin',
      header: 'TIN',
    },
    {
      accessorKey: 'taxpayer_name',
      header: 'Taxpayer Name',
      cell: ({ getValue }) => getValue() || 'N/A',
    },
    {
      accessorKey: 'taxpayer_type',
      header: 'Type',
    },
    {
      accessorKey: 'segmentation',
      header: 'Segmentation',
    },
    {
      accessorKey: 'total_sales_income',
      header: 'Total Sales',
      cell: ({ getValue }) => formatCurrency(getValue()),
    },
    {
      accessorKey: 'gst_payable',
      header: 'GST Payable',
      cell: ({ getValue }) => formatCurrency(getValue()),
    },
    {
      accessorKey: 'gst_refundable',
      header: 'GST Refundable',
      cell: ({ getValue }) => formatCurrency(getValue()),
    },
    {
      accessorKey: 'is_fraud',
      header: 'Is Fraud',
      cell: ({ getValue }) => {
        const isFraud = getValue();
        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: '16px', // Adjust for more or less rounded corners
              //backgroundColor: isFraud ? '#FEE2E2' : '#D1FAE5', // Light red for Fraud, Light green for Valid
              //border: isFraud ? '1px solid #FECACA' : '1px solid #A7F3D0',
              //border: '1px solid #D1D5DB', // Light gray border for both Fraud and Valid
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isFraud ? '#FF3535' : '#34C759', // Red for Fraud, Green for Valid
                marginRight: '8px',
              }}
            ></span>
            <span
              style={{
                color: '#000000',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {isFraud ? 'Fraud' : 'Valid'}
            </span>
          </div>
        );
      },
      header: 'Is Fraud', // Keep this if you want to prevent filtering on this column
    },
  ];

  return (
    <Card className="mb-4 box-background">
      <Card.Body>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : records.length === 0 ? (
          <>
            <Card.Title>Tax Records</Card.Title>
            <div className="text-center text-muted" style={{ padding: '2rem' }}>
              No Data Found
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title>
                <span className="chart-headers">Tax Records</span>
              </Card.Title>
              <Form.Group className="mb-0" style={{ width: '300px' }}>
                <Form.Control
                  type="text"
                  placeholder="Search by TIN"
                  value={searchTin}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </div>
            <Table
              columns={columns}
              data={records}
              loading={loading}
              error={error}
              hasMore={records.length < totalRecords}
              onLoadMore={handleLoadMore}
              loadingMore={isLoadingMore}
              jobId={'test'}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaxRecordsTable;
