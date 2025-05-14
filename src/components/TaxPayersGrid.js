import React, { useState } from 'react';
import { Table, Badge, Dropdown, DropdownButton } from 'react-bootstrap';

const taxpayersData = [
  {
    no: 1,
    id: '#12594',
    dueDate: 'Nov 15, 2021',
    customerName: 'Frank Murlo',
    location: '312 S Wilmette Ave',
    amount: '$847.69',
    status: 'Paid On Time',
  },
  {
    no: 2,
    id: '#12490',
    dueDate: 'Nov 15, 2021',
    customerName: 'Thomas Bleir',
    location: 'Lathrop Ave, Harvey',
    amount: '$477.14',
    status: 'Delayed',
  },
  {
    no: 3,
    id: '#12306',
    dueDate: 'Nov 15, 2021',
    customerName: 'Bill Norton',
    location: '5685 Bruce Ave, Portage',
    amount: '$477.14',
    status: 'Pending',
  },
];

const statusVariant = {
  'Paid On Time': { color: 'success', text: 'Paid On Time' },
  Delayed: { color: 'warning', text: 'Delayed' },
  Pending: { color: 'danger', text: 'Pending' },
};

const getSortIcon = (column, sortBy, sortOrder) => {
  if (sortBy !== column) return <span style={{ fontSize: '0.8em' }}>⇅</span>;
  return sortOrder === 'asc' ? (
    <span style={{ fontSize: '0.8em' }}>↑</span>
  ) : (
    <span style={{ fontSize: '0.8em' }}>↓</span>
  );
};

function TaxPayersGrid() {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...taxpayersData].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // For id, remove '#' and compare as numbers
    if (sortBy === 'id') {
      aValue = parseInt(aValue.replace('#', ''), 10);
      bValue = parseInt(bValue.replace('#', ''), 10);
    }
    // For amount, remove '$' and compare as numbers
    if (sortBy === 'amount') {
      aValue = parseFloat(aValue.replace('$', ''));
      bValue = parseFloat(bValue.replace('$', ''));
    }
    // For status, compare as string
    if (sortBy === 'status' || sortBy === 'customerName') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 me-3 fw-bold" style={{ color: '#6366F1' }}>
            Tax Payers Name
          </h4>
          <DropdownButton
            id="dropdown-basic-button"
            title="GST"
            variant="light"
            size="sm"
          >
            <Dropdown.Item>GST</Dropdown.Item>
            <Dropdown.Item>CIT</Dropdown.Item>
            <Dropdown.Item>SWT</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <Table hover responsive className="align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
              ID {getSortIcon('id', sortBy, sortOrder)}
            </th>
            <th>Due Date</th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('customerName')}
            >
              Customer Name {getSortIcon('customerName', sortBy, sortOrder)}
            </th>
            <th>Location</th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('amount')}
            >
              Amount {getSortIcon('amount', sortBy, sortOrder)}
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('status')}
            >
              Status {getSortIcon('status', sortBy, sortOrder)}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>{row.no}</td>
              <td>{row.id}</td>
              <td>{row.dueDate}</td>
              <td>{row.customerName}</td>
              <td>{row.location}</td>
              <td>{row.amount}</td>
              <td>
                <Badge
                  bg={statusVariant[row.status].color}
                  className="me-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                >
                  &nbsp;
                </Badge>
                <span className="bg-white px-2 py-1 rounded shadow-sm">
                  {statusVariant[row.status].text}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TaxPayersGrid;
