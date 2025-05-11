import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DEFAULT_TENURE_OPTIONS = [
  { label: 'Past 1 Month', value: '1m' },
  { label: 'Past 3 Months', value: '3m' },
  { label: 'Past 6 Months', value: '6m' },
  { label: 'Past 1 Year', value: '1y' },
  { label: 'Past 3 Years', value: '3y' },
  { label: 'Past 6 Years', value: '6y' },
  { label: 'Custom Range', value: 'custom' }
];

function TenureFilter({ onFilterChange, tenureOptions }) {
  const options = tenureOptions || DEFAULT_TENURE_OPTIONS;
  const [selectedTenure, setSelectedTenure] = useState(options[0].value);
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
    if (options === DEFAULT_TENURE_OPTIONS) {
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
    } else {
      // Year-based options
      if (selectedTenure) {
        const year = parseInt(selectedTenure, 10);
        if (!isNaN(year)) {
          const start = new Date(year, 0, 1);
          const end = new Date(year, 11, 31);
          setStartDate(start);
          setEndDate(end);
          onFilterChange({
            start_date: formatDate(start),
            end_date: formatDate(end)
          });
        }
      }
    }
  }, [selectedTenure, options]);

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <label style={{ fontWeight: 500, marginRight: 8, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: 6 }} />
        Select Tenure
      </label>
      <Form.Select
        value={selectedTenure}
        onChange={handleTenureChange}
        style={{ minWidth: 180, maxWidth: 220, marginRight: 8 }}
        size="sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {showDatePickers && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
            dateFormat="dd-MM-yyyy"
            placeholderText="Start Date"
            style={{ width: 110 }}
          />
          <span style={{ margin: '0 4px' }}>to</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
            dateFormat="dd-MM-yyyy"
            placeholderText="End Date"
            style={{ width: 110 }}
          />
        </div>
      )}
    </div>
  );
}

export default TenureFilter; 