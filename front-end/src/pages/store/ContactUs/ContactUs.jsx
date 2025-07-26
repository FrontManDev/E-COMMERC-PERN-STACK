import styles from './ContactUs.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Send us a message or contact us directly.</p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="your@email.com" 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="Your message here..." 
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              <FaPaperPlane className={styles.icon} /> Send Message
            </button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <div>
              <h3>Email</h3>
              <p>contact@example.com</p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Address</h3>
              <p>123 Business Street<br />City, State 12345<br />Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}