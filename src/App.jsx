import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import IssueCardForm from './components/IssueCardForm.jsx';
import HomeDashboard from './components/HomeDashboard.jsx';
import styles from './App.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AddProduct from './components/AddProduct.jsx';
import AddProductTypes from './components/AddProductTypes.jsx';
import AddProductPayment from './components/AddProductPayment.jsx';
import AddProductCardReader from './components/AddProductCardReader.jsx';
import AddProductProcessing from './components/AddProductProcessing.jsx';
import AddProductCash from './components/AddProductCash.jsx';
import AddProductCashSuccess from './components/AddProductCashSuccess.jsx';
import AddProductCashChange from './components/AddProductCashChange.jsx';
import AddProductTapFinal from './components/AddProductTapFinal.jsx';
import AddProductTapSuccess from './components/AddProductTapSuccess.jsx';
import AddProductPrinting from './components/AddProductPrinting.jsx';
import RegisterCard from './components/RegisterCard.jsx';
import CardBalance from './components/CardBalance.jsx';
import ReloadCard from './components/ReloadCard.jsx';
import CustomerLookup from './components/CustomerLookup.jsx';
import Reports from './components/Reports.jsx';
import AddProductStoredValue from './components/AddProductStoredValue.jsx';
import CardBalanceTap from './components/CardBalanceTap.jsx';
import IssueNewCard from './components/IssueNewCard.jsx';
import AuthWrapper from './components/AuthWrapper.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Map menu label to route path
  const menuToPath = {
    'Home': '/',
    'Issue Card': '/issuecard',
    'Reload Card': '/reloadcard',
    'Card Balance': '/card-balance-tap',
    'Add Product': '/add-product-tapcard',
    'Customer Lookup': '/customer-lookup',
    'Reports': '/reports',
  };

  // Map path to menu label
  const pathToMenu = Object.entries(menuToPath).reduce((acc, [label, path]) => {
    acc[path] = label;
    // Also map /card-balance to 'Card Balance' for the second step
    if (label === 'Card Balance') acc['/card-balance'] = label;
    return acc;
  }, {});

  // Determine selected menu from path
  let selectedMenu = pathToMenu[location.pathname] || 'Home';
  if (location.pathname.startsWith('/add-product')) {
    selectedMenu = 'Add Product';
  }
  if (['/register-card', '/issue-new-card', '/issuecard'].includes(location.pathname)) {
    selectedMenu = 'Issue Card';
  }

  const handleMenuSelect = (menu) => {
    navigate(menuToPath[menu] || '/');
  };

  // If not authenticated, show auth routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // If authenticated, show main app
  return (
    <div className={styles.appContainer}>
      <Sidebar selectedMenu={selectedMenu} onMenuSelect={handleMenuSelect} />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomeDashboard onMenuSelect={handleMenuSelect} />} />
          <Route path="/issuecard" element={<IssueCardForm />} />
          <Route path="/reloadcard" element={<ReloadCard />} />
          <Route path="/card-balance-tap" element={<CardBalanceTap />} />
          <Route path="/card-balance" element={<CardBalance />} />
          <Route path="/add-product-tapcard" element={<AddProduct />} />
          <Route path="/add-product-types" element={<AddProductTypes />} />
          <Route path="/add-product-payment" element={<AddProductPayment />} />
          <Route path="/add-product-cardreader" element={<AddProductCardReader />} />
          <Route path="/add-product-processing" element={<AddProductProcessing />} />
          <Route path="/add-product-cash" element={<AddProductCash />} />
          <Route path="/add-product-cash-success" element={<AddProductCashSuccess />} />
          <Route path="/add-product-cash-change" element={<AddProductCashChange />} />
          <Route path="/add-product-tap-final" element={<AddProductTapFinal />} />
          <Route path="/add-product-tap-success" element={<AddProductTapSuccess />} />
          <Route path="/add-product-printing" element={<AddProductPrinting />} />
          <Route path="/add-product-stored-value" element={<AddProductStoredValue />} />
          <Route path="/customer-lookup" element={<CustomerLookup />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/register-card" element={<RegisterCard />} />
          <Route path="/issue-new-card" element={<IssueNewCard />} />
        </Routes>
      </main>
    </div>
  );
}

function Placeholder({ title }) {
  return <div style={{ fontSize: '2rem', color: '#888', textAlign: 'center' }}>{title} Page Coming Soon</div>;
}

export default App; 
