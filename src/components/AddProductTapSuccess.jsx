import React, { useEffect, useState, useRef } from 'react';
import styles from './AddProductTapSuccess.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTrip, getRandomOperator } from './api';

function AddProductTapSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};
  const [operator, setOperator] = useState('');
  const receiptIdRef = useRef(null);

  // Default values if no data is passed
  const productName = selectedProduct?.title || 'One-Time Ticket';
  const productPrice = selectedProduct?.title === '7-Day Pass' ? '$25.00' : 
                      selectedProduct?.title === '30-Day Pass' ? '$85.00' : 
                      selectedProduct?.title === 'Stored Value' ? '$10.00' : '$2.50';
  const cardId = cardNumber || '109234';

  // Get random operator and create trip record in CRM for the credit card transaction
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Generate receipt ID only once
        if (!receiptIdRef.current) {
          receiptIdRef.current = `RID${Math.floor(Math.random() * 900) + 100}`;
        }

        // Get random operator from CRM
        const randomOperator = await getRandomOperator();
        setOperator(randomOperator);

        if (cardNumber && selectedProduct && startTime) {
          const productValue = selectedProduct.title === '7-Day Pass' ? 25.00 : 
                              selectedProduct.title === '30-Day Pass' ? 85.00 : 
                              selectedProduct.title === 'Stored Value' ? 10.00 : 2.50;
          
          const endTime = new Date().toISOString(); // End time is when reaching success page
          const tripData = {
            id: receiptIdRef.current, // Use the stored receipt ID
            start_time: startTime, // Start time from when user entered tapcard page
            end_time: endTime, // End time when reaching success page
            entry_location: 'POS Terminal', // Location where card payment was made
            exit_location: 'POS Terminal', // Same as entry for card transactions
            fare: productValue,
            route: selectedProduct.title, // Product type as route
            operator: randomOperator, // Random operator from CRM
            transit_mode: 'Card Payment', // Transit mode for card transactions
            adjustable: 'Yes', // Card transactions are adjustable
            card_id: cardNumber
          };
          
          const tripResponse = await createTrip(tripData);
          if (tripResponse.id) {
            console.log('Trip record created successfully:', tripResponse.id);
          }
        }
      } catch (tripError) {
        console.error('Error creating trip record:', tripError);
        // Don't fail the success page if trip creation fails
      }
    };

    initializeComponent();
  }, [cardNumber, selectedProduct, startTime]); // Removed receiptId from dependencies

  const handlePrintReceipt = () => {
    navigate('/add-product-printing', { 
      state: { 
        cardNumber, 
        selectedProduct, 
        receiptId: receiptIdRef.current 
      } 
    });
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.successTitle}>Success</div>
      <div className={styles.loadedText}>Product successfully loaded onto card</div>
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