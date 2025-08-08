import React from 'react';
import styles from './CardReader.module.css';
import { FaCreditCard } from 'react-icons/fa';

function CardReader({ productType, onProceed, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <h3 className={styles.headerText}>Tap Card to Load Product</h3>
        </div>
        
        <div className={styles.mainCard}>
          <h2 className={styles.title}>Tap Card to Read</h2>
          <p className={styles.instruction}>Please tap the card on the reader</p>
          
          <div className={styles.cardIconWrapper}>
            <FaCreditCard className={styles.cardIcon} />
          </div>
          
          <p className={styles.nextStep}>Proceed to select a product.</p>
        </div>
        
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.proceedButton} onClick={onProceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardReader; 