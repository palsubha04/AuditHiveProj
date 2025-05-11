import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
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
  // Memoize options to avoid unnecessary re-renders
  const options = useMemo(
    () => tenureOptions || DEFAULT_TENURE_OPTIONS,
    [tenureOptions]
  );
  const [selectedTenure, setSelectedTenure] = useState(options[0]?.value);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePickers, setShowDatePickers] = useState(false);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Effect for predefined ranges and year-based options
  useEffect(() => {
    // Prevent effect from running if options array is empty
    if (!options || options.length === 0) return;

    // Only run if not custom
    if (selectedTenure === 'custom') {
      setShowDatePickers(true);
      return;
    } else {
      setShowDatePickers(false);
    }

    let today = new Date();
    let start = new Date();

    if (options === DEFAULT_TENURE_OPTIONS) {
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
    } else {
      // Year-based options
      const year = parseInt(selectedTenure, 10);
      if (!isNaN(year)) {
        start = new Date(year, 0, 1);
        today = new Date(year, 11, 31);
      }
    }

    // Only update state if changed
    if (
      !startDate ||
      !endDate ||
      start.getTime() !== startDate.getTime() ||
      today.getTime() !== endDate.getTime()
    ) {
      setStartDate(start);
      setEndDate(today);
      if (onFilterChange) {
        onFilterChange({
          start_date: formatDate(start),
          end_date: formatDate(today)
        });
      }
    }
    // eslint-disable-next-line
  }, [selectedTenure, options]); // intentionally not including startDate/endDate to avoid infinite loop

  // Effect for custom date range
  useEffect(() => {
    if (selectedTenure === 'custom' && startDate && endDate) {
      if (onFilterChange) {
        onFilterChange({
          start_date: formatDate(startDate),
          end_date: formatDate(endDate)
        });
      }
    }
    // eslint-disable-next-line
  }, [startDate, endDate, selectedTenure]);

  const handleTenureChange = (e) => {
    const value = e.target.value;
    setSelectedTenure(value);
    setShowDatePickers(value === 'custom');
    // Reset custom dates when switching away from custom
    if (value !== 'custom') {
      setStartDate(null);
      setEndDate(null);
    }
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