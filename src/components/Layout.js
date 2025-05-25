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
    <div className="d-flex flex-column overflow-hidden" style={{ height: '100vh' }}>
      <div className='header-main'>
        <Header />
      </div>
      <div className='flex-1 d-flex flex-row overflow-hidden'>
        <div className='h-100'>
          <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav}/>
        </div>
        <div className='flex-1 p-4 overflow-auto'>
          {children}
        </div>
      </div>
      {/* <div className="">
        <Sidenav isOpen={isSidenavOpen} toggleSidenav={toggleSidenav}/>
        <main className="">
          {children}
        </main>
        <Footer />
      </div> */}
    </div>
  );
}

export default Layout;
