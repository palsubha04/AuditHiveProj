import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Sidenav.css';

function Sidenav() {
  const location = useLocation();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Check if any analytics child route is active
  const isAnalyticsChildActive = () => {
    return [
      '/consolidated-profile',
      '/pending-returns',
      '/fraud-detections',
      '/risk-assessment',
      '/risk-profiling',
      '/compliance',
    ].includes(location.pathname);
  };

  // Check if any dashboard child route is active
  const isDashboardChildActive = () => {
    return ['/gst', '/cit', '/swt'].includes(location.pathname);
  };

  // Initialize menu states based on current route
  if (isAnalyticsChildActive() && !isAnalyticsOpen) {
    setIsAnalyticsOpen(true);
  }
  if (isDashboardChildActive() && !isDashboardOpen) {
    setIsDashboardOpen(true);
  }

  const toggleAnalytics = () => {
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div className="sidenav">
      <div className="logo-container">
        <Link to="/gst">
          <img src="/Logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <Nav className="flex-column">
        <div className="nav-group">
          <Nav.Link onClick={toggleDashboard} className="nav-item">
            <img src="/chart.svg" alt="Dashboard" className="nav-icon" />
            <span>Dashboard</span>
            <span className={`arrow ${isDashboardOpen ? 'open' : ''}`}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Nav.Link>

          <div className={`submenu ${isDashboardOpen ? 'open' : ''}`}>
            <Nav.Link
              as={Link}
              to="/gst"
              active={location.pathname === '/gst'}
              className="nav-item submenu-item"
            >
              <span>GST</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cit"
              active={location.pathname === '/cit'}
              className="nav-item submenu-item"
            >
              <span>CIT</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/swt"
              active={location.pathname === '/swt'}
              className="nav-item submenu-item"
            >
              <span>SWT</span>
            </Nav.Link>
          </div>
        </div>

        <Nav.Link
          as={Link}
          to="/upload-sheets"
          active={location.pathname === '/upload-sheets'}
          className="nav-item"
        >
          <img src="/Upload.svg" alt="Upload" className="nav-icon" />
          <span>Upload Sheets</span>
        </Nav.Link>

        <div className="nav-group">
          <Nav.Link onClick={toggleAnalytics} className="nav-item">
            <img src="/case.svg" alt="Analytics" className="nav-icon" />
            <span>Analytics</span>
            <span className={`arrow ${isAnalyticsOpen ? 'open' : ''}`}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Nav.Link>

          <div className={`submenu ${isAnalyticsOpen ? 'open' : ''}`}>
            {/* <Nav.Link
              as={Link}
              to="/consolidated-profile"
              active={location.pathname === '/consolidated-profile'}
              className="nav-item submenu-item"
            >
              <span>Consolidated Profile</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pending-returns"
              active={location.pathname === '/pending-returns'}
              className="nav-item submenu-item"
            >
              <span>Pending Returns</span>
            </Nav.Link> */}
            {/* <Nav.Link
              as={Link}
              to="/fraud-detections"
              active={location.pathname === '/fraud-detections'}
              className="nav-item submenu-item"
            >
              <span>Fraud Detections</span>
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/risk-assessment"
              active={location.pathname === '/risk-assessment'}
              className="nav-item submenu-item"
            >
              <span>Risk Assessment</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/risk-profiling"
              active={location.pathname === '/risk-profiling'}
              className="nav-item submenu-item"
            >
              <span>Risk Profilling</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/compliance"
              active={location.pathname === '/compliance'}
              className="nav-item submenu-item"
            >
              <span>Compliance</span>
            </Nav.Link>
          </div>
        </div>

        <Nav.Link
          as={Link}
          to="/upload-history"
          active={location.pathname === '/upload-history'}
          className="nav-item"
        >
          <img src="/info.svg" alt="Help" className="nav-icon" />
          <span>Upload History</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/help-centre"
          active={location.pathname === '/help-centre'}
          className="nav-item"
        >
          <img src="/info.svg" alt="Help" className="nav-icon" />
          <span>Help Centre</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/contact-us"
          active={location.pathname === '/contact-us'}
          className="nav-item"
        >
          <img src="/chat.svg" alt="Contact" className="nav-icon" />
          <span>Contact us</span>
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidenav;
