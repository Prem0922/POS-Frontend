import React, { useState } from 'react';
import styles from './ReloadCard.module.css';
import { useNavigate } from 'react-router-dom';
import { reloadCard } from './api';

function ReloadCard() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    try {
      const reloadAmount = parseFloat(amount);
      
      if (!cardNumber || !amount || isNaN(reloadAmount) || reloadAmount <= 0) {
        setStatus('Invalid card number or amount');
        return;
      }

      // Call the actual CRM backend API
      const response = await reloadCard(cardNumber, reloadAmount);
      
      if (response.message) {
        setStatus(`✅ ${response.message} - New balance: $${response.new_balance}`);
        // Clear form after successful reload
        setTimeout(() => {
          setCardNumber('');
          setAmount('');
          setStatus(null);
        }, 3000);
      } else {
        setStatus('❌ Reload failed - please try again');
      }
    } catch (error) {
      console.error('Reload error:', error);
      if (error.detail) {
        setStatus(`❌ Error: ${error.detail}`);
      } else {
        setStatus('❌ Network error - please check your connection');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formBox} onSubmit={handleReload} autoComplete="off">
      <div className={styles.title}>Reload Card</div>
      <div className={styles.inputGroup}>
        <label htmlFor="cardNumber" className={styles.label}>Enter Card Number</label>
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
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="amount" className={styles.label}>Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className={styles.input}
          required
          min="1"
          step="0.01"
        />
      </div>
      {status && <div className={styles.statusLabel}>{status}</div>}
      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton} onClick={() => navigate('/')}>Done</button>
        <button type="submit" className={styles.reloadButton} disabled={loading}>{loading ? 'Reloading...' : 'Reload'}</button>
      </div>
    </form>
  );
}

export default ReloadCard; 