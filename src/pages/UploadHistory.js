import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Eye, Download, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import * as XLSX from 'xlsx';
//import './UploadHistory.css';
import {
  Table,
  Button,
  Card,
  Pagination,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const tableData = [
  {
    No: 1,
    'File Name': '#12594',
    'Uploaded By': 'John Dow',
    'Tax Parameter': 'GST',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 2,
    'File Name': '#12595',
    'Uploaded By': 'Victor Meza',
    'Tax Parameter': 'Income Tax',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 3,
    'File Name': '#12596',
    'Uploaded By': 'John Nethan',
    'Tax Parameter': 'VAT',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 4,
    'File Name': '#12597',
    'Uploaded By': 'Jeff Kuang',
    'Tax Parameter': 'Sales Tax',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 5,
    'File Name': '#12598',
    'Uploaded By': 'Christian Bale',
    'Tax Parameter': 'GST',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 6,
    'File Name': '#12599',
    'Uploaded By': 'Lionel Mesi',
    'Tax Parameter': 'Income Tax',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 7,
    'File Name': '#12600',
    'Uploaded By': 'Ed Sheren',
    'Tax Parameter': 'VAT',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 8,
    'File Name': '#12601',
    'Uploaded By': 'Cristiano Ronaldo',
    'Tax Parameter': 'Sales Tax',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 9,
    'File Name': '#12602',
    'Uploaded By': 'Benzema',
    'Tax Parameter': 'Sales Tax',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 10,
    'File Name': '#12603',
    'Uploaded By': 'Torres',
    'Tax Parameter': 'VAT',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 11,
    'File Name': '#12604',
    'Uploaded By': 'Torres',
    'Tax Parameter': 'VAT',
    Date: '31/03/2024',
    Time: '12:30',
  },
  {
    No: 12,
    'File Name': '#12605',
    'Uploaded By': 'Ansu Fati',
    'Tax Parameter': 'GST',
    Date: '31/03/2024',
    Time: '12:30',
  },
];

const UploadHistory = () => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page, changed to 10

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return tableData;

    return [...tableData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const SortIcon = ({ columnName }) => {
    if (sortConfig.key !== columnName) {
      return <ArrowUpDown className="h-3 w-3 inline-block ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowDownUp className="h-4 w-4 inline-block ml-1" />
    ) : (
      <ArrowUpDown className="h-4 w-4 inline-block ml-1" />
    );
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  // Get current items
  const sortedData = getSortedData();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout>
      <div className="page-container">
        <h4 className="page-title">Upload History</h4>
        <Container
          fluid
          className="d-flex align-items-center justify-content-center min-vh-100"
        >
          <Row className="w-100 justify-content-center">
            <Col md={10} lg={12}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-4">Upload Validation</Card.Title>
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => sortData('File Name')}
                          >
                            File Name
                            <SortIcon columnName="File Name" />
                          </th>
                          <th>Uploaded By</th>
                          <th
                            style={{ cursor: 'pointer' }}
                            onClick={() => sortData('Tax Parameter')}
                          >
                            Tax Parameter
                            <SortIcon columnName="Tax Parameter" />
                          </th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((item) => (
                          <tr key={item.No}>
                            <td>{item.No}</td>
                            <td style={{ color: '#2563eb' }}>
                              {item['File Name']}
                            </td>
                            <td>{item['Uploaded By']}</td>
                            <td>{item['Tax Parameter']}</td>
                            <td>{item.Date}</td>
                            <td>{item.Time}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={downloadExcel}
                                  className="me-2"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline-secondary" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={currentPage === number}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() =>
                        paginate(Math.min(currentPage + 1, pageNumbers.length))
                      }
                      disabled={currentPage === pageNumbers.length}
                    />
                  </Pagination>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default UploadHistory;
