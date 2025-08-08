import React from 'react';
import styles from './AddProductTapSuccess.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function AddProductTapSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct } = location.state || {};

  // Default values if no data is passed
  const productName = selectedProduct?.title || 'One-Time Ticket';
  const productPrice = selectedProduct?.title === '7-Day Pass' ? '$25.00' : 
                      selectedProduct?.title === '30-Day Pass' ? '$85.00' : 
                      selectedProduct?.title === 'Stored Value' ? '$10.00' : '$2.50';
  const cardId = cardNumber || '109234';

  const handlePrintReceipt = () => {
    navigate('/add-product-printing', { state: { cardNumber, selectedProduct } });
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.successTitle}>Success</div>
      <div className={styles.loadedText}>Product successfully loaded onto card.</div>
      <div className={styles.productCard}>
        <div className={styles.ticketInfo}>
          <div className={styles.ticketName}>{productName}</div>
          <div className={styles.ticketPrice}>{productPrice}</div>
        </div>
        <div className={styles.cardIdRow}>
          <span>Card ID</span>
          <span className={styles.cardId}>{cardId}</span>
        </div>
      </div>
      <div className={styles.totalRow}><span>Total</span><span>{productPrice}</span></div>
      <button className={styles.printButton} onClick={handlePrintReceipt}>Print Receipt</button>
    </div>
  );
}

export default AddProductTapSuccess; 