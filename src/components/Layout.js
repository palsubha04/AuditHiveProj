import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidenav from './Sidenav';
import './Layout.css';

function Layout({ children }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <div className="layout">
      <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav}/>
      <div className="layout-content">
        <Header isOpen={isSidenavOpen} />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
