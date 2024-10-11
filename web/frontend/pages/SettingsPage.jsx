import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

export function SettingsPage() {
  const [shopDetails, setShopDetails] = useState({
    email: '',
    shopOwner: '',
    planName: '',
    domain: '',
    country: ''
  });

  useEffect(() => {
    fetch('/api/shop/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        const shopData = data.data[0]; // Assuming the first object in 'data' array
        setShopDetails({
          email: shopData.email,
          shopOwner: shopData.shop_owner,
          planName: shopData.plan_display_name,
          domain: shopData.domain,
          country: shopData.country_name
        });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="settings-page">
      <h1>Store Details</h1>
      <section className="settings-section">
        <h2>Store Information</h2>
        <div className="form-group">
          <label>Store Email</label>
          <input type="text" value={shopDetails.email} readOnly />
        </div>
        <div className="form-group">
          <label>Store Owner</label>
          <input type="text" value={shopDetails.shopOwner} readOnly />
        </div>
        <div className="form-group">
          <label>Plan Name</label>
          <input type="text" value={shopDetails.planName} readOnly />
        </div>
        <div className="form-group">
          <label>Domain</label>
          <input type="text" value={shopDetails.domain} readOnly />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input type="text" value={shopDetails.country} readOnly />
        </div>
      </section>
    </div>
  );
}
