import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TENURE_OPTIONS = [
  { label: 'Past 1 Month', value: '1m' },
  { label: 'Past 3 Months', value: '3m' },
  { label: 'Past 6 Months', value: '6m' },
  { label: 'Past 1 Year', value: '1y' },
  { label: 'Past 3 Years', value: '3y' },
  { label: 'Past 6 Years', value: '6y' },
  { label: 'Custom Range', value: 'custom' }
];

function TenureFilter({ onFilterChange }) {
  const [selectedTenure, setSelectedTenure] = useState('1m');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePickers, setShowDatePickers] = useState(false);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Effect for predefined ranges
  useEffect(() => {
    if (selectedTenure === 'custom') return;

    let today = new Date();
    let start = new Date();

    switch (selectedTenure) {
      case '1m':
        start.setMonth(today.getMonth() - 1);
        break;
      case '3m':
        start.setMonth(today.getMonth() - 3);
        break;
      case '6m':
        start.setMonth(today.getMonth() - 6);
        break;
      case '1y':
        start.setFullYear(today.getFullYear() - 1);
        break;
      case '3y':
        start.setFullYear(today.getFullYear() - 3);
        break;
      case '6y':
        start.setFullYear(today.getFullYear() - 6);
        break;
      default:
        start.setMonth(today.getMonth() - 1);
    }

    setStartDate(start);
    setEndDate(today);

    onFilterChange({
      start_date: formatDate(start),
      end_date: formatDate(today)
    });
  }, [selectedTenure]);

  // Effect for custom date range
  useEffect(() => {
    if (selectedTenure === 'custom' && startDate && endDate) {
      onFilterChange({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate)
      });
    }
  }, [startDate, endDate]);

  const handleTenureChange = (e) => {
    const value = e.target.value;
    setSelectedTenure(value);
    setShowDatePickers(value === 'custom');
  };

  return (
    <div className="mb-4 p-3 bg-white rounded shadow-sm">
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Group>
            <Form.Label>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Select Tenure
            </Form.Label>
            <Form.Select 
              value={selectedTenure}
              onChange={handleTenureChange}
              className="form-select"
            >
              {TENURE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        {showDatePickers && (
          <>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default TenureFilter; 