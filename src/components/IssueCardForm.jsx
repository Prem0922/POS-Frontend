import React from 'react';
import styles from './IssueCardForm.module.css';
import { FaUserPlus, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function IssueCardForm() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register-card');
  };

  const handleIssueNewCard = () => {
    navigate('/issue-new-card');
  };

  return (
    <div className={styles.stylishBg}>
      <div className={styles.glassCardSection}>
        <h2 className={styles.sectionTitle}>Card Issuance and Registration</h2>
        <div className={styles.cardList}>
          <div className={styles.optionCard} tabIndex={0} role="button" onClick={handleIssueNewCard}>
            <div className={styles.accentBar} style={{ background: 'linear-gradient(135deg, #4f8cff 60%, #a0e9ff 100%)' }}>
              <FaIdCard className={styles.cardIcon} />
            </div>
            <div className={styles.optionText}>
              <div className={styles.optionTitle}>Issue New Card <span className={styles.optionSubTitle}></span></div>
              <div className={styles.optionDesc}>Print a new fare card without collecting customer info</div>
            </div>
            <div className={styles.arrow}>&#8250;</div>
          </div>
          <div className={styles.optionCard} tabIndex={0} role="button" onClick={handleRegisterClick}>
            <div className={styles.accentBar} style={{ background: 'linear-gradient(135deg, #ff7e5f 60%, #feb47b 100%)' }}>
              <FaUserPlus className={styles.cardIcon} />
            </div>
            <div className={styles.optionText}>
              <div className={styles.optionTitle}>Register Card to a Customer</div>
              <div className={styles.optionDesc}>Enter customer details, link the card</div>
            </div>
            <div className={styles.arrow}>&#8250;</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueCardForm; 