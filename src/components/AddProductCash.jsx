import React, { useEffect, useState } from 'react';
import styles from './AddProductCash.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';

function AddProductCash() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};
  const [countdown, setCountdown] = useState(2);

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

  const handleCancel = () => {
    navigate('/add-product-payment', { state: { cardNumber, selectedProduct, startTime } });
  };

  // Auto-advance to next page after 2 seconds with countdown
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          navigate('/add-product-cash-change', { 
            state: { 
              cardNumber: cardNumber, 
              selectedProduct: selectedProduct,
              startTime: startTime
            } 
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer if component unmounts
    return () => clearInterval(countdownTimer);
  }, [navigate, cardNumber, selectedProduct, startTime]);

  return (
    <div className={styles.formBox}>
      <div className={styles.contentBox}>
        <div className={styles.total}>Total: <span>{getProductPrice()}</span></div>
        <div className={styles.instruction}>Insert cash</div>
        <div className={styles.countdown}>Advancing in {countdown} second{countdown !== 1 ? 's' : ''}...</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '64px 0' }}>
          <FaMoneyBillWave style={{ fontSize: '12rem', color: '#3476f7', background: '#fff', padding: '48px' }} />
        </div>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductCash; 