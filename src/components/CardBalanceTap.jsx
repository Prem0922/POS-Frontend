import React, { useState } from 'react';
import styles from './CardBalance.module.css';
import { useNavigate } from 'react-router-dom';
import tapCardImg from './tap-card.jpg';
import { getRandomCard, getCardBalance } from './api';

function CardBalanceTap() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');

  const handleImageClick = async () => {
    console.log('Image clicked - attempting to get random card...');
    try {
      // Get a random card from CRM database
      const randomCard = await getRandomCard();
      console.log('Random card response:', randomCard);
      if (randomCard && randomCard.card_number) {
        // Navigate to card balance page with the random card number
        console.log('Using random card:', randomCard.card_number);
        navigate('/card-balance', { state: { cardNumber: randomCard.card_number } });
      } else {
        alert('No cards found in database');
      }
    } catch (error) {
      console.error('Error getting random card:', error);
      alert('Error getting random card from database');
    }
  };

  const handleCardNumberSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber.trim()) {
      alert('Please enter a card number');
      return;
    }
    
    try {
      // Check if the card exists in CRM database
      const cardData = await getCardBalance(cardNumber);
      if (cardData && cardData.card_id) {
        // Navigate to card balance page with the entered card number
        navigate('/card-balance', { state: { cardNumber: cardNumber } });
      } else {
        alert('Card not found in database');
      }
    } catch (error) {
      console.error('Error checking card:', error);
      alert('Card not found in database');
    }
  };

  return (
    <div className={styles.balanceBox}>
      <img 
        src={tapCardImg} 
        alt="Tap your card" 
        className={styles.tapCardImg} 
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.title}>Please tap your card</div>
      <div className={styles.orText}>OR</div>
      
      <form className={styles.searchForm} onSubmit={handleCardNumberSubmit} autoComplete="off">
        <label htmlFor="cardNumber" className={styles.label}>Enter Card Number</label>
        <div className={styles.inputRow}>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            placeholder="0000 0000 0000"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            className={styles.input}
            autoComplete="off"
            required
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </div>
      </form>
    </div>
  );
}

export default CardBalanceTap; 