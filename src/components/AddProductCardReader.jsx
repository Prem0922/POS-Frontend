import React, { useState } from 'react';
import styles from './AddProductCardReader.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import tapCardImg from './tap-card.jpg';

function AddProductCardReader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = async () => {
    console.log('Image clicked - using existing card...');
    setIsLoading(true);
    try {
      // Use the existing card number from the flow
      if (cardNumber) {
        console.log('Using existing card:', cardNumber);
        navigate('/add-product-processing', { 
          state: { 
            cardNumber: cardNumber,
            selectedProduct: selectedProduct,
            startTime: startTime
          } 
        });
      } else {
        alert('No card found in session');
      }
    } catch (error) {
      console.error('Error processing card:', error);
      alert('Error processing card');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/add-product-payment', { state: { cardNumber, selectedProduct, startTime } });
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.centerContent}>
        <img 
          src={tapCardImg} 
          alt="Tap your card" 
          className={styles.tapCardImg} 
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.slotWrapper}>
          <div className={styles.cardSlotGlow}></div>
          <div className={styles.cardSlot}></div>
          <div className={styles.cardInsert}>
            <div className={styles.chip}></div>
            <div className={styles.stripe}></div>
            <div className={styles.cardText}>CARD DEBIT</div>
          </div>
        </div>
        <div className={styles.instruction}>Insert, Tap, or Swipe Your Card</div>
        {isLoading && <div className={styles.loadingText}>Loading...</div>}
        <div className={styles.buttonGroup}>
          <button className={styles.actionButton + ' ' + styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductCardReader; 