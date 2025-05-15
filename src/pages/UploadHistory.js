import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import Layout from '../components/Layout';

// ... existing code ...
const data = [
  {
    id: 1,
    fileName: '#12594',
    uploadedBy: 'John Dow',
    taxParameter: 'GST',
    date: '31/03/2024',
    time: '12:30',
  },
  // ... existing code ...
];

const UploadHistory = () => {
  // For demo, repeat the same row 8 times
  const rowsData = Array.from({ length: 8 }, (_, i) => ({
    ...data[0],
    id: i + 1,
  }));

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedRows = React.useMemo(() => {
    let sortableRows = [...rowsData];
    if (sortConfig.key) {
      sortableRows.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableRows;
  }, [rowsData, sortConfig]);

  const handleDownload = () => {
    const excelData = sortedRows.map((row) => ({
      No: row.id,
      'File Name': row.fileName,
      'Uploaded By': row.uploadedBy,
      'Tax Parameter': row.taxParameter,
      Date: row.date,
      Time: row.time,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Upload Validation');
    XLSX.writeFile(workbook, 'upload_validation.xlsx');
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <Layout>
      <Container
        className="p-4"
        style={{
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #e9eaf0',
        }}
      >
        <h4 className="mb-4" style={{ color: '#1a237e', fontWeight: 700 }}>
          Upload Validation
        </h4>
        <Table hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('fileName')}
              >
                {getSortIndicator('fileName')} File Name
              </th>
              <th>Uploaded By</th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('taxParameter')}
              >
                Tax Parameter {getSortIndicator('taxParameter')}
              </th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fileName}</td>
                <td>{row.uploadedBy}</td>
                <td>{row.taxParameter}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 me-2"
                    title="Download"
                    onClick={handleDownload}
                  >
                    <Download size={18} color="#90a4ae" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default UploadHistory;
