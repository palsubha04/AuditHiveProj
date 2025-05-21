import React, { useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faUser,
  faSignOutAlt,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const capitalizeWord = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getFirstName = () => {
    if (!user) return 'Guest';
    if (user.first_name) return capitalizeWord(user.first_name);
    if (user.username) return capitalizeWord(user.username);
    return capitalizeWord(user.email.split('@')[0]);
  };

  const getFullName = () => {
    if (!user) return 'Guest';
    if (user.first_name && user.last_name) {
      return `${capitalizeWord(user.first_name)} ${capitalizeWord(
        user.last_name
      )}`;
    }
    if (user.username) return capitalizeWord(user.username);
    return user.email;
  };

  let headerTitle = `Welcome Back, ${getFirstName()}`;
  let headerSubtitle = 'Here is the information about all your orders';
  if (location.pathname === '/compliance') {
    headerTitle = 'Compliance';
    headerSubtitle = '';
  } else if (location.pathname === '/risk-assessment') {
    headerTitle = 'Risk Assessment';
    headerSubtitle = '';
  } else if (location.pathname === '/upload-history') {
    headerTitle = 'Upload History';
    headerSubtitle = '';
  }else if (location.pathname === '/risk-profiling') {
    headerTitle = 'Risk Profiling';
    headerSubtitle = '';
  }else if (location.pathname === '/upload-sheets') {
    headerTitle = 'Upload Sheets';
    headerSubtitle = '';
  }

  return (
    <Navbar className="header">
      <Container fluid>
        <div className="header-left">
          <div className="header-titles">
            <h1>{headerTitle}</h1>
            {headerSubtitle && <p>{headerSubtitle}</p>}
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <Dropdown
            align="end"
            show={isDropdownOpen}
            onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
          >
            <Dropdown.Toggle className="user-dropdown">
              <FontAwesomeIcon icon={faUser} className="avatar" />
              <span>{getFullName()}</span>
              <FontAwesomeIcon
                icon={isDropdownOpen ? faChevronUp : faChevronDown}
                className="dropdown-arrow"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
