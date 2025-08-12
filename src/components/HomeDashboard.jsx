import React from 'react';
import styles from './HomeDashboard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getReportsSummary } from './api';

const dashboardCards = [
  {
    icon: 'fa-id-card',
    title: 'Issue Card',
    subtitle: 'Print or issue a new card',
  },
  {
    icon: 'fa-redo',
    title: 'Reload Card',
    subtitle: 'Add value to an existing card',
  },
  {
    icon: 'fa-wallet',
    title: 'Card Balance',
    subtitle: 'Check card balance and details',
  },
  {
    icon: 'fa-plus-square',
    title: 'Add Product',
    subtitle: 'Add new products to the system',
  },
  {
    icon: 'fa-user',
    title: 'Customer Lookup',
    subtitle: 'Find and manage customers',
  },
  {
    icon: 'fa-chart-bar',
    title: 'Reports',
    subtitle: 'View analytics and reports',
  },
];

function HomeDashboard({ onMenuSelect }) {
  const handleReportsClick = () => {
    // Navigate to Reports page instead of showing popup
    onMenuSelect('Reports');
  };

  return (
    <div className={styles.dashboardBg}>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Welcome to Point Of Sale</h1>
        <p className={styles.dashboardSubtitle}>
          Manage cards, products, customers, and reports all in one place.
        </p>
        <div className={styles.cardGrid}>
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className={styles.dashboardCard}
              onClick={card.title === 'Reports' ? handleReportsClick : () => onMenuSelect(card.title)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.cardIconWrapper}>
                <i className={`fas ${card.icon} ${styles.cardIcon}`}></i>
              </div>
              <div className={styles.cardText}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardSubtitle}>{card.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard; 