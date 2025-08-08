import React from 'react';
import styles from './Sidebar.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: 'fa-home', label: 'Home' },
  { icon: 'fa-id-card', label: 'Issue Card' },
  { icon: 'fa-redo', label: 'Reload Card' },
  { icon: 'fa-wallet', label: 'Card Balance' },
  { icon: 'fa-plus-square', label: 'Add Product' },
  { icon: 'fa-user', label: 'Customer Lookup' },
  { icon: 'fa-chart-bar', label: 'Reports' },
];

const menuToPath = {
  'Home': '/',
  'Issue Card': '/issuecard',
  'Reload Card': '/reloadcard',
  'Card Balance': '/card-balance-tap',
  'Add Product': '/add-product-tapcard',
  'Customer Lookup': '/customer-lookup',
  'Reports': '/reports',
};

function Sidebar({ selectedMenu, onMenuSelect }) {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Point Of Sale</div>
      <div className={styles.divider}></div>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className={
                styles.navItem +
                (selectedMenu === item.label ? ' ' + styles.activeNavItem : '')
              }
              onClick={() => onMenuSelect(item.label)}
              tabIndex={0}
              role="button"
            >
              <i className={`fas ${item.icon} ${styles.icon}`}></i>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      {/* Only the logout button at the bottom */}
      <button 
        className={styles.logoutButton}
        onClick={logout}
        title="Logout"
        style={{ marginTop: 'auto', marginBottom: '16px' }}
      >
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar; 