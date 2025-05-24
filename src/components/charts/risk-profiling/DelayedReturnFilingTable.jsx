import React, { useEffect, useState } from 'react'
import Table from '../../Table';
import { Badge } from 'react-bootstrap';

const sampleData = {
    "start_date": "01-01-2018",
    "end_date": "31-12-2022",
    "gst": {
        "01": {
            "due_date": "22-02-2021",
            "entry_date": "19-02-2021",
            "receive_date": "17-02-2021",
            "is_delayed": false
        },
        "02": {
            "due_date": "22-03-2021",
            "entry_date": "23-03-2021",
            "receive_date": "23-03-2021",
            "is_delayed": true
        },
        "03": {
            "due_date": "21-04-2021",
            "entry_date": "22-04-2021",
            "receive_date": "21-04-2021",
            "is_delayed": true
        },
        "04": {
            "due_date": "21-05-2021",
            "entry_date": "21-05-2021",
            "receive_date": "20-05-2021",
            "is_delayed": false
        },
        "05": {
            "due_date": "21-06-2021",
            "entry_date": "22-06-2021",
            "receive_date": "22-06-2021",
            "is_delayed": true
        },
        "06": {
            "due_date": "21-07-2021",
            "entry_date": "15-07-2021",
            "receive_date": "14-07-2021",
            "is_delayed": false
        },
        "07": {
            "due_date": "23-08-2021",
            "entry_date": "23-08-2021",
            "receive_date": "23-08-2021",
            "is_delayed": false
        },
        "08": {
            "due_date": "21-09-2021",
            "entry_date": "22-09-2021",
            "receive_date": "22-09-2021",
            "is_delayed": true
        },
        "09": {
            "due_date": "21-10-2021",
            "entry_date": "21-10-2021",
            "receive_date": "20-10-2021",
            "is_delayed": false
        },
        "10": {
            "due_date": "22-11-2021",
            "entry_date": "22-11-2021",
            "receive_date": "19-11-2021",
            "is_delayed": false
        },
        "11": {
            "due_date": "21-12-2021",
            "entry_date": "03-01-2022",
            "receive_date": "21-12-2021",
            "is_delayed": true
        }
    },
    "swt": {},
    "cit": {}
}


const DelayedReturnFilingTable = () => {
    const [selectedCategory, setSelectedCategory] = useState("gst");
    const [filteredData, setFilteredData] = useState([]);
    const categories = ["gst", "swt", "cit"];

    useEffect(() => {
        if (sampleData && selectedCategory) {
          const filingDate =
          sampleData[selectedCategory] ? Object.values(sampleData[selectedCategory]) :  [];
          setFilteredData(filingDate);
        }
      }, [sampleData, selectedCategory]);

    const columns = [
        {
          accessorKey: 'due_date',
          header: 'Due Date',
        },
        {
          accessorKey: 'entry_date',
          header: 'Entry Date',
        },
        {
          accessorKey: 'receive_date',
          header: 'Receive Date',
        },
        {
          accessorKey: 'is_delayed',
          header: 'Is Delayed',
          cell: ({ getValue }) => (
            <Badge bg={getValue() ? 'danger' : 'success'}>
              {getValue() ? 'Delayed' : 'On Time'}
            </Badge>
          ),
        },
      ];
  return (
    <div className="d-flex h-100 flex-column">
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <span className='chart-headers'>Delayed Return Filings</span>
      
      <div>
      <select
            className="chart-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
      </div>
    </div>
    <Table
      columns={columns}
      data={filteredData}
    />
  </div>
  )
}

export default DelayedReturnFilingTable
