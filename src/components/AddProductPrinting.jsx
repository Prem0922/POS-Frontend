import React from 'react';
import styles from './AddProductPrinting.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function AddProductPrinting() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct } = location.state || {};

  const handleDone = () => {
    navigate('/');
  };

  // Generate dynamic data
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }); // HH:MM format
  };

  const generateReceiptId = () => {
    // Generate a random 3-digit number for receipt ID
    const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999
    return `RID${randomNum.toString().padStart(2, '0')}`; // RID01, RID02, etc.
  };

  // Use actual data or fallback to defaults
  const cardId = cardNumber || '012$209720';
  const product = selectedProduct?.title || 'Over Time Toskett';
  const date = getCurrentDate();
  const time = getCurrentTime();
  const receiptId = generateReceiptId();

  return (
    <div className={styles.formBox}>
      <div className={styles.printingTitle}>Printing...</div>
      <div className={styles.receiptWrapper}>
        <div className={styles.receipt}>
          <div className={styles.receiptRow}><span>Card ID</span><span>{cardId}</span></div>
          <div className={styles.receiptRow}><span>Product</span><span>{product}</span></div>
          <div className={styles.receiptRow}><span>Date</span><span>{date}</span></div>
          <div className={styles.receiptRow}><span>Time</span><span>{time}</span></div>
          <div className={styles.receiptRow}><span>Receipt ID</span><span>{receiptId}</span></div>
        </div>
      </div>
      <button className={styles.doneButton} onClick={handleDone}>Done</button>
    </div>
  );
}

export default AddProductPrinting; 