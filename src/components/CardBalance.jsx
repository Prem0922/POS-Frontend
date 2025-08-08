import React, { useState, useEffect } from 'react';
import styles from './CardBalance.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCardBalance } from './api';

function CardBalance() {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      // Get card number from navigation state
      const cardNum = location.state?.cardNumber;
      if (cardNum) {
        setCardNumber(cardNum);
        try {
          const data = await getCardBalance(cardNum);
          if (data && data.balance !== undefined) {
            setBalance(`$${data.balance}`);
          } else if (data && data.card_id) {
            setBalance(`$${data.balance}`);
          } else {
            setBalance('Card not found');
          }
        } catch (err) {
          setBalance('Card not found');
        }
      } else {
        setBalance('No card selected');
      }
      setLoading(false);
    };

    fetchBalance();
  }, [location.state]);

  const handleDone = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className={styles.balanceBox}>
        <div className={styles.title}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.balanceBox}>
      <div className={styles.title}>Card Balance</div>
      
      {cardNumber && (
        <div className={styles.cardNumberDisplay}>
          <div className={styles.cardNumberLabel}>Card Number:</div>
          <div className={styles.cardNumberValue}>{cardNumber}</div>
        </div>
      )}
      
      <div className={styles.transitCardBox}>
        <div className={styles.transitCardStyled}>
          <div className={styles.nfcIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#glow)">
                <path d="M14 20c0-4.418 3.582-8 8-8" stroke="#00cfff" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 20c0-2.209 1.791-4 4-4" stroke="#00cfff" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M24 20c0-1.105.895-2 2-2" stroke="#00cfff" strokeWidth="2.5" strokeLinecap="round"/>
              </g>
              <defs>
                <filter id="glow" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00cfff"/>
                </filter>
              </defs>
            </svg>
          </div>
          <div className={styles.transitCardText}>TRANSIT CARD</div>
        </div>
      </div>
      
      <div className={styles.balanceLabel}>Balance</div>
      <div className={styles.balanceValue}>{balance}</div>
      <button className={styles.doneButton} onClick={handleDone}>Done</button>
    </div>
  );
}

export default CardBalance; 