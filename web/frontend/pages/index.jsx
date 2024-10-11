import React, { useState, useCallback } from 'react';
import { TopBar, ActionList, Frame, Layout, Card } from '@shopify/polaris';
import HomeIcon from '@mui/icons-material/Home';
import { OrderGraphs } from '../components/OrderGraphs'; 
import { useEffect } from "react";

export default function IndexPage() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  // useEffect(() => {
  //   fetch("/api/customers", {
  //     method: "GET",
  //     headers: {"Content-Type": "application/json"}
  //   })
  //   .then(request => request.json())
  //   .then(response => console.log('customers data ', response))
  //   .catch(error => console.error(error));
  // })

  const toggleUserMenu = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const userMenuActions = [
    {
      items: [{ content: 'Profile' }, { content: 'Settings' }, { content: 'Logout' }],
    },
  ];

  // const topBarMarkup = (
  //   <TopBar
  //     showNavigationToggle
  //     userMenu={
  //       <TopBar.UserMenu
  //         actions={userMenuActions}
  //         name="Abhishek"
  //         initials="A"
  //         open={isUserMenuOpen}
  //         onToggle={toggleUserMenu}
  //       />
  //     }
  //   />
  // );

  return (
      <div className="index-page">
        {/* Top Bar with Home Icon and Options */}
        <div className="top-bar-section">
          <HomeIcon style={{ fontSize: 40, color: '#008170', marginRight: '10px' }} />
          <h2>Dashboard</h2>
        </div>

        {/* Main content of the index page */}
        <div className="page-content">
          {/* <h3>Welcome to the Dashboard</h3> */}

          {/* Embedding OrderGraphs component */}
          <OrderGraphs />

          {/* Extra Cards Section */}
          <Layout>
           
          </Layout>
        </div>
      </div>
  );
}
