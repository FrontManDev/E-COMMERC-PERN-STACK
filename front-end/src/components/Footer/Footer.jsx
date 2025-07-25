import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} E-Shope. All Rights Reserved.</p>
      </div>
    </footer>
  );
}