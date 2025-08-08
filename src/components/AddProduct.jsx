import React, { useState } from 'react';
import styles from './AddProduct.module.css';
import { useNavigate } from 'react-router-dom';
import tapCardImg from './tap-card.jpg';
import { addProduct, getRandomCard } from './api';

function AddProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = async () => {
    console.log('Image clicked - attempting to get random card...');
    setIsLoading(true);
    try {
      // Get a random card from CRM database
      const randomCard = await getRandomCard();
      console.log('Random card response:', randomCard);
      if (randomCard && randomCard.card_number) {
        // Navigate to add product types page with the random card number
        console.log('Using random card:', randomCard.card_number);
        console.log('Navigating to /add-product-types with state:', { cardNumber: randomCard.card_number });
        navigate('/add-product-types', { state: { cardNumber: randomCard.card_number } });
      } else {
        alert('No cards found in database');
      }
    } catch (error) {
      console.error('Error getting random card:', error);
      alert('Error getting random card from database');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={styles.formBox}>
      <h2 className={styles.title}>Add Product</h2>
      <div className={styles.cardReaderContent}>
        {/* Remove .cardReaderCard wrapper, place contents directly */}
        <img 
          src={tapCardImg} 
          alt="Tap your card" 
          className={styles.tapCardImg} 
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <h3 className={styles.cardReaderTitle}>Tap Card to Read</h3>
        {isLoading && <div className={styles.loadingText}>Loading...</div>}
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct; 