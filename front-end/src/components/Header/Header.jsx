import { useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { IoIosClose } from "react-icons/io";
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
export default function Header() {
  const [Show, SetShow] = useState(false);
  return (
    <header className={styles.header}>
      <h2>E-Shope</h2>
      <ul className={Show ? styles.active : null}>
        <li>
          <NavLink to='/Store'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/Products'>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to='/Contact_us'>
            Contact_us
          </NavLink>
        </li>
      </ul>
      <div className={styles.actions}>
        <span><FiShoppingCart /><sup>0</sup></span>
        <NavLink to='/authentication'><span><FiUser /> Login</span></NavLink>
      </div>
      <div className={styles.menu}>
        {Show ?
          <IoIosClose className={styles.icon} onClick={() => SetShow(!Show)} /> :
          <FiMenu className={styles.icon} onClick={() => SetShow(!Show)} />}
      </div>
    </header>
  )
}