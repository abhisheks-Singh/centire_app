import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import { QueryProvider, PolarisProvider, NavigationBar, TopBar } from "./components";

// Importing page components
import IndexPage from './pages/index';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';
import { UserPage } from './pages/UserPage';

export default function App() {
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          <NavMenu>
            <a href="/" rel="home" />
            {/* You can add more menu links if needed */}
          </NavMenu>

          {/* Main app layout */}
          <div className="app-layout">
            {/* Navigation on the left side */}
            <div className="menu-section">
              <NavigationBar />
            </div>

            {/* Page content on the right side */}
            <div className="content-section">
              <TopBar></TopBar>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </div>
          </div>
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
