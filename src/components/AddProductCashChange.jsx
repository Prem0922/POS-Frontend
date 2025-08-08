import React from 'react';
import styles from './AddProductCashChange.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function AddProductCashChange() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct } = location.state || {};

  const handleDone = () => {
    navigate('/add-product-cash-success', { state: { cardNumber, selectedProduct } });
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.successTitle}>Purchase Successful</div>
      <div className={styles.changeText}>Issuing <span>$7.25</span> in change ...</div>
      <button className={styles.doneButton} onClick={handleDone}>Done</button>
    </div>
  );
}

export default AddProductCashChange; 