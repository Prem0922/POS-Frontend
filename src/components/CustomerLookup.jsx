import React, { useState } from 'react';
import styles from './CustomerLookup.module.css';
import { useNavigate } from 'react-router-dom';
import { getCustomer } from './api';

function CustomerLookup() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setCustomer(null);
    try {
      const data = await getCustomer(customerId);
      if (data && !data.detail) {
        setCustomer(data);
      } else {
        setStatus('Customer not found');
      }
    } catch (err) {
      setStatus('Error fetching customer');
    }
    setLoading(false);
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.title}>Customer Lookup</div>
      
      {/* Show form only if no customer found yet */}
      {!customer && (
        <form className={styles.searchForm} onSubmit={handleLookup} autoComplete="off">
          <label htmlFor="customerId" className={styles.label}>Enter Customer ID</label>
          <input
            id="customerId"
            name="customerId"
            type="text"
            placeholder="C001"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            className={styles.input}
            autoComplete="off"
            required
          />
          <button type="submit" className={styles.searchButton} disabled={loading}>{loading ? 'Searching...' : 'Lookup'}</button>
        </form>
      )}
      
      {status && <div className={styles.balanceLabel}>{status}</div>}
      {customer && (
        <div className={styles.balanceLabel} style={{marginTop: '1rem', textAlign: 'left'}}>
          <div style={{marginBottom: '8px'}}><b>ID:</b> {customer.id}</div>
          <div style={{marginBottom: '8px'}}><b>Name:</b> {customer.name}</div>
          <div style={{marginBottom: '8px'}}><b>Email:</b> {customer.email}</div>
          <div style={{marginBottom: '8px'}}><b>Phone:</b> {customer.phone}</div>
          <div style={{marginBottom: '8px'}}><b>Joined:</b> {new Date(customer.join_date).toLocaleString()}</div>
        </div>
      )}
      <button className={styles.doneButton} onClick={() => navigate('/')}>Done</button>
    </div>
  );
}

export default CustomerLookup; 