import React from 'react';
import styles from './CallToAction.module.css';
import { relFor } from '@/lib/outbound';

export default function CallToAction({ title, description, buttonText, buttonLink }) {
  return (
    <div className={styles.ctaContainer}>
      <h3 className={styles.ctaTitle}>{title}</h3>
      <p className={styles.ctaDescription}>{description}</p>
      <a href={buttonLink} className={styles.ctaButton} rel={relFor(buttonLink || '')}>
        {buttonText}
      </a>
    </div>
  );
} 