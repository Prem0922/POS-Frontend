import React, { useState } from 'react';
import styles from './AddProductStoredValue.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { reloadCard } from './api';

const presetAmounts = [5, 10, 30];

function AddProductStoredValue() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber: passedCardNumber, selectedProduct } = location.state || {};
  const [cardNumber, setCardNumber] = useState(passedCardNumber || '');
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (amount) => {
    setSelected(amount);
    setCustom('');
  };

  const handleCustomChange = (e) => {
    setSelected(null);
    setCustom(e.target.value.replace(/[^0-9.]/g, ''));
  };

  const handleContinue = async () => {
    setLoading(true);
    setStatus(null);
    
    try {
      const amount = selected || parseFloat(custom);
      
      if (!cardNumber || !amount || isNaN(amount) || amount <= 0) {
        setStatus('Invalid card number or amount');
        return;
      }

      // Call the actual CRM backend API
      const response = await reloadCard(cardNumber, amount);
      
      if (response.status === 'success') {
        setStatus(`✅ ${response.message}`);
        // Clear form after successful reload
        setTimeout(() => {
          setCardNumber('');
          setSelected(null);
          setCustom('');
          setStatus(null);
        }, 3000);
      } else {
        setStatus(`❌ ${response.message || 'Reload failed - please try again'}`);
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
    <div className={styles.formBox}>
      <div className={styles.title}>Add Stored Value</div>
      <form className={styles.form} onSubmit={e => { e.preventDefault(); handleContinue(); }} autoComplete="off">
        <label className={styles.label} htmlFor="cardNumber">Card Number</label>
        <input
          className={styles.input}
          id="cardNumber"
          name="cardNumber"
          type="text"
          placeholder="0000 0000 0000"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          required
        />
        <div className={styles.optionsRow}>
          {presetAmounts.map((amt) => (
            <button
              type="button"
              key={amt}
              className={selected === amt ? styles.amountButtonSelected : styles.amountButton}
              onClick={() => handleSelect(amt)}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className={styles.orText}>or enter custom amount</div>
        <input
          className={styles.input}
          type="number"
          min="1"
          placeholder="Other amount"
          value={custom}
          onChange={handleCustomChange}
        />
        <button
          className={styles.continueButton}
          type="submit"
          disabled={!(cardNumber && (selected || custom)) || loading}
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>
        {status && <div className={styles.status}>{status}</div>}
      </form>
    </div>
  );
}

export default AddProductStoredValue; 