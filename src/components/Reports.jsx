import React, { useState, useEffect } from 'react';
import styles from './Reports.module.css';
import { useNavigate } from 'react-router-dom';
import { getReportsSummary } from './api';

function Reports() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getReportsSummary();
        setSummary(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports');
        // Fallback to dummy data if API fails
        setSummary({
          total_cards: 1000,
          total_customers: 500,
          total_trips: 2000,
          total_balance: 12345.67,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className={styles.formBox}>
        <div className={styles.title}>Reports Summary</div>
        <div className={styles.summaryBox}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.formBox}>
      <div className={styles.title}>Reports Summary</div>
      {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
      <div className={styles.summaryBox}>
        <div><b>Total Cards:</b> {summary?.total_cards || 0}</div>
        <div><b>Total Customers:</b> {summary?.total_customers || 0}</div>
        <div><b>Total Trips:</b> {summary?.total_trips || 0}</div>
        <div><b>Total Balance:</b> ${summary?.total_balance || 0}</div>
        {summary?.total_cases && <div><b>Total Cases:</b> {summary.total_cases}</div>}
        {summary?.total_tap_entries && <div><b>Total Tap Entries:</b> {summary.total_tap_entries}</div>}
      </div>
      <button className={styles.doneButton} onClick={() => navigate('/')}>Done</button>
    </div>
  );
}

export default Reports; 