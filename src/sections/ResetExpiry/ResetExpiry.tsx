import React, { Component, Fragment } from 'react';
import router from "next/router";
import styles from "../ResetExpiry/Resetexpiry.module.scss"
import Image from "next/image";
const ResetLinkMail: React.FC = () => {

    const checkReset = (e) => {
        e.preventDefault();
        router.push('/login');
    }

  

  return (
    <div className={styles.resetPage}>
      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.logoWrapper}>
            <Image  width={100}
                  height={100} className={styles.logo} src="/images/logo_black.png" alt="logo" />
          </div>
          <h1 className={styles.title}>Reset Link Expired</h1>
          <p className={styles.description}>Reset password link is expired or invalid.</p>
          <button className={styles.submitButton} type="button" onClick={(e) => checkReset(e)}>
            Close
          </button>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <Image className={styles.backgroundImage} src="/images/forgot.jpg" alt="Background" />
      </div>
    </div>


      
    );
}

export default ResetLinkMail;