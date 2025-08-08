import React, { useState } from 'react';
import styles from './IssueNewCard.module.css';
import { useNavigate } from 'react-router-dom';
import { issueCard, getAllCustomers } from './api';

const mediaTypes = [
  'CSC',
  'Contactless EMV Card',
  'Single Ride Ticket',
  'Multi Ride Ticket',
];

const loadProducts = [
  '7-Day Pass',
  '30-Day Pass',
  'Monthly Pass',
  'Daily Pass',
  'Stored Value',
  '10-Ride Pass',
  'Single Ride Ticket',
];

function IssueNewCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mediaType: '',
    cardNumber: '',
    feeAmount: '',
    cardValue: '',
    loadProduct: '',
    price: '',
    paymentMethod: '',
    cvv: '',
    orderTotal: '',
    customerId: '',
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Load customers on component mount
  React.useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customerData = await getAllCustomers();
        setCustomers(customerData);
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    };
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    try {
      // Prepare card data for the API
      const cardData = {
        card_id: form.cardNumber,
        card_type: form.mediaType,
        customer_id: form.customerId,
        issue_date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      };

      const response = await issueCard(cardData);
      
      if (response.id) {
        setStatus('✅ Card issued successfully!');
        // Clear form after successful issue
        setTimeout(() => {
          setForm({
            mediaType: '',
            cardNumber: '',
            feeAmount: '',
            cardValue: '',
            loadProduct: '',
            price: '',
            paymentMethod: '',
            cvv: '',
            orderTotal: '',
            customerId: '',
          });
          setStatus(null);
          navigate('/issuecard');
        }, 2000);
      } else {
        setStatus('❌ Failed to issue card');
      }
    } catch (error) {
      console.error('Issue card error:', error);
      if (error.detail) {
        setStatus(`❌ Error: ${error.detail}`);
      } else {
        setStatus('❌ Network error - please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/issuecard');
  };

  return (
    <form className={styles.formBox} onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.title}>Issue New Card</div>
      <div className={styles.subtitle}>Fill in the details to issue a new card.</div>
        <div className={styles.inputGroup}>
          <label htmlFor="mediaType">Media Type</label>
          <select id="mediaType" name="mediaType" value={form.mediaType} onChange={handleChange} className={styles.input} required>
            <option value="">Select Media Type</option>
            {mediaTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input id="cardNumber" name="cardNumber" type="text" value={form.cardNumber} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="customerId">Customer *</label>
          <select id="customerId" name="customerId" value={form.customerId} onChange={handleChange} className={styles.input} required>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.id} - {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="feeAmount">Fee Amount</label>
          <input id="feeAmount" name="feeAmount" type="number" value={form.feeAmount} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cardValue">Card Value</label>
          <input id="cardValue" name="cardValue" type="number" value={form.cardValue} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="loadProduct">Load Product</label>
          <select id="loadProduct" name="loadProduct" value={form.loadProduct} onChange={handleChange} className={styles.input} required>
            <option value="">Select Product</option>
            {loadProducts.map((prod) => (
              <option key={prod} value={prod}>{prod}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" value={form.price} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="paymentMethod">Payment Method</label>
          <input id="paymentMethod" name="paymentMethod" type="text" value={form.paymentMethod} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cvv">CVV</label>
          <input id="cvv" name="cvv" type="text" value={form.cvv} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="orderTotal">Order Total</label>
          <input id="orderTotal" name="orderTotal" type="number" value={form.orderTotal} onChange={handleChange} className={styles.input} required />
        </div>
        {status && <div style={{color: status.includes('✅') ? 'green' : 'red', marginBottom: '1rem', textAlign: 'center'}}>{status}</div>}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          <button type="submit" className={styles.issueButton} disabled={loading}>
            {loading ? 'Issuing...' : 'Issue Card'}
          </button>
        </div>
    </form>
  );
}

export default IssueNewCard; 