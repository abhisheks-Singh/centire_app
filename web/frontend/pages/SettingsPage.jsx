import React, { useState } from 'react';
import './SettingsPage.css';

export function SettingsPage() {
  const [profileSettings, setProfileSettings] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    password: '********'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileSettings((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd submit the settings to the backend or save them.
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* Profile Settings */}
        <section className="settings-section">
          <h2>Profile Settings</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={profileSettings.username}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileSettings.email}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={profileSettings.password}
              onChange={handleProfileChange}
              required
            />
          </div>
        </section>

        {/* Notification Settings */}
        <section className="settings-section">
          <h2>Notification Settings</h2>
          <div className="form-group">
            <label>Email Notifications</label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
            />
          </div>
          <div className="form-group">
            <label>SMS Notifications</label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notificationSettings.smsNotifications}
              onChange={handleNotificationChange}
            />
          </div>
        </section>

        {/* Save Button */}
        <button type="submit" className="save-btn">Save Settings</button>
      </form>
    </div>
  );
}
