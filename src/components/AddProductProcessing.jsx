import React, { useEffect, useState } from 'react';
import styles from './AddProductProcessing.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';

function AddProductProcessing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};

  const handleCancel = () => {
    navigate('/add-product-cardreader', { state: { cardNumber, selectedProduct, startTime } });
  };

  const handleNext = () => {
    navigate('/add-product-tap-final', { 
      state: { 
        cardNumber: cardNumber,
        selectedProduct: selectedProduct,
        startTime: startTime
      } 
    });
  };

  const [countdown, setCountdown] = useState(2);

  // Auto-advance to next page after 2 seconds with countdown
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer if component unmounts
    return () => clearInterval(countdownTimer);
  }, []);

  // Get the correct price based on selected product
  const getProductPrice = () => {
    if (!selectedProduct) return '$2.75';
    switch (selectedProduct.title) {
      case '7-Day Pass': return '$25.00';
      case '30-Day Pass': return '$85.00';
      case 'Stored Value': return '$10.00';
      default: return '$2.75';
    }
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.contentBox}>
        <div className={styles.total}>Processing: <span>{getProductPrice()}</span></div>
        <div className={styles.instruction}>Processing payment...</div>
        <div className={styles.countdown}>Advancing in {countdown} second{countdown !== 1 ? 's' : ''}...</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '64px 0' }}>
          <FaMoneyBillWave style={{ fontSize: '8rem', color: '#3476f7', background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(52, 118, 247, 0.10)' }} />
        </div>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductProcessing; 