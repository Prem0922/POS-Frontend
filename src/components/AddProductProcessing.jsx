import React from 'react';
import styles from './AddProductProcessing.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight, FaMoneyBillWave } from 'react-icons/fa';

function AddProductProcessing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct } = location.state || {};

  const handleCancel = () => {
    navigate('/add-product-cardreader', { state: { cardNumber, selectedProduct } });
  };

  const handleNext = () => {
    navigate('/add-product-tap-final', { 
      state: { 
        cardNumber: cardNumber,
        selectedProduct: selectedProduct 
      } 
    });
  };

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
      <button className={styles.nextArrow} onClick={handleNext} aria-label="Next">
        <FaArrowRight style={{ fontSize: '2rem', color: '#3476f7', background: '#fff', borderRadius: '50%', padding: '8px' }} />
      </button>
      <div className={styles.contentBox}>
        <div className={styles.total}>Processing: <span>{getProductPrice()}</span></div>
        <div className={styles.instruction}>Processing payment...</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '64px 0' }}>
          <FaMoneyBillWave style={{ fontSize: '8rem', color: '#3476f7', background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(52, 118, 247, 0.10)' }} />
        </div>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductProcessing; 