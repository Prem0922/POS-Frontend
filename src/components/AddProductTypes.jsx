import React from 'react';
import styles from './AddProductTypes.module.css';
import { FaCalendarAlt, FaPiggyBank, FaUserTag, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const products = [
  {
    icon: <FaCalendarAlt />, // 7-Day Pass
    title: '7-Day Pass',
    desc: 'Unlimited rides for 7 days',
    accent: 'linear-gradient(135deg, #4f8cff 60%, #a0e9ff 100%)',
  },
  {
    icon: <FaCalendarAlt />, // 30-Day Pass
    title: '30-Day Pass',
    desc: 'Unlimited rides for 30 days',
    accent: 'linear-gradient(135deg, #ff7e5f 60%, #feb47b 100%)',
  },
  {
    icon: <FaPiggyBank />, // Stored Value
    title: 'Stored Value',
    desc: 'Add cash value to card',
    accent: 'linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)',
  },
];

function AddProductTypes() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardNumber = location.state?.cardNumber;

  const handleBack = () => {
    navigate('/add-product-tapcard');
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product.title);
    console.log('Card number:', cardNumber);
    
    // Create a clean product object without React elements
    const cleanProduct = {
      title: product.title,
      desc: product.desc,
      accent: product.accent
    };
    
    if (product.title === 'Stored Value') {
      console.log('Navigating to stored value...');
      navigate('/add-product-stored-value', { 
        state: { 
          cardNumber: cardNumber,
          selectedProduct: cleanProduct 
        } 
      });
    } else {
      console.log('Navigating to payment...');
      navigate('/add-product-payment', { 
        state: { 
          cardNumber: cardNumber,
          selectedProduct: cleanProduct 
        } 
      });
    }
  };

  return (
    <div className={styles.formBox}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <FaArrowLeft className={styles.backIcon} />
          Back
        </button>
        <h2 className={styles.title}>Add Product</h2>
      </div>
      <div className={styles.cardList}>
        {products.map((product, idx) => (
          <div
            className={styles.optionCard}
            tabIndex={0}
            role="button"
            key={product.title}
            onClick={() => handleProductClick(product)}
          >
            <div
              className={styles.accentBar}
              style={{ background: product.accent }}
            >
              {product.icon}
            </div>
            <div className={styles.optionText}>
              <div className={styles.optionTitle}>{product.title}</div>
              <div className={styles.optionDesc}>{product.desc}</div>
            </div>
            <div className={styles.arrow}>&#8250;</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddProductTypes; 