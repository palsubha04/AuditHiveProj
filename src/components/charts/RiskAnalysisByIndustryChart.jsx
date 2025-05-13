import React from 'react'

const riskData = {
    "start_date": "01-01-2021",
    "end_date": "31-12-2021",
    "gst": {
      "large": [
        {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
        {"civil": {"high": 100, "medium": 50, "low": 200}}
      ],
      "medium": [
        {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
        {"civil": {"high": 100, "medium": 50, "low": 200}}
      ],
      "low": [
        {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
        {"civil": {"high": 100, "medium": 50, "low": 200}}
      ]
    },
    "swt": {
        "large": [
          {"manufacturer": {"high": 150, "medium": 100, "low": 200}},
          {"civil": {"high": 100, "medium": 50, "low": 200}}
        ],
        "medium": [
          {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
          {"civil": {"high": 500, "medium": 50, "low": 200}}
        ],
        "low": [
          {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
          {"civil": {"high": 100, "medium": 50, "low": 200}}
        ]
    },
    "cit": {
        "large": [
          {"manufacturer": {"high": 450, "medium": 100, "low": 200}},
          {"civil": {"high": 100, "medium": 50, "low": 200}}
        ],
        "medium": [
          {"manufacturer": {"high": 200, "medium": 50, "low": 200}},
          {"civil": {"high": 500, "medium": 50, "low": 200}}
        ],
        "low": [
          {"manufacturer": {"high": 100, "medium": 50, "low": 200}},
          {"civil": {"high": 100, "medium": 250, "low": 200}}
        ]
    },
}

const RiskAnalysisByIndustryChart = () => {
    return (
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 16 
        }}>
          <div style={{ 
            fontWeight: 600, 
            fontSize: 18, 
            color: '#222' 
          }}>
            Risk Analysis by Industry
          </div>
          <div>
            <select style={{ 
              marginRight: 8, 
              padding: '4px 8px', 
              borderRadius: 4, 
              border: '1px solid #ccc' 
            }}>
              <option>GST</option>
              <option>SWT</option>
              <option>CIT</option>
            </select>
            <select style={{ 
              padding: '4px 8px', 
              borderRadius: 4, 
              border: '1px solid #ccc' 
            }}>
              <option>Large</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
  
        {/* <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={320}
        /> */}
      </div>
    );
  };

export default RiskAnalysisByIndustryChart
