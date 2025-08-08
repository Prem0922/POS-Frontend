import React from 'react';
import styles from './AddProductCashSuccess.module.css';
import { useNavigate } from 'react-router-dom';

function AddProductCashSuccess() {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/');
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.successTitle}>Purchase Successful</div>
      <div className={styles.checkIcon}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#00cfff" strokeWidth="4" fill="none"/>
          <path d="M20 34l8 8 16-16" stroke="#00cfff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={styles.reminder}>Remember to collect your change and take your card</div>
      <button className={styles.doneButton} onClick={handleDone}>Done</button>
    </div>
  );
}

export default AddProductCashSuccess; 