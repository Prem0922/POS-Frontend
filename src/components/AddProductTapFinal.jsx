import React, { useState } from 'react';
import styles from './AddProductTapFinal.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import tapCardImg from './tap-card.jpg';
import { FaCheckCircle } from 'react-icons/fa';

function AddProductTapFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = async () => {
    console.log('NFC image clicked - using existing card...');
    setIsLoading(true);
    try {
      if (cardNumber) {
        console.log('Using existing card:', cardNumber);
        // Navigate to success page with the same card and product
        navigate('/add-product-tap-success', { 
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

  return (
    <div className={styles.formBox}>
      <div className={styles.contentBox}>
        <div className={styles.successMessage}>
          <FaCheckCircle style={{ fontSize: '3rem', color: '#3476f7', marginBottom: '16px' }} />
          <div className={styles.successText}>Purchase Success</div>
        </div>
        <img 
          src={tapCardImg} 
          alt="Tap your card" 
          className={styles.tapCardImg} 
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        {isLoading && <div className={styles.loadingText}>Loading...</div>}
        <div className={styles.heading}>Tap your card on the NFC reader to load the product</div>
      </div>
    </div>
  );
}

export default AddProductTapFinal; 