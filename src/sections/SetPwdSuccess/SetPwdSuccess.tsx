import React, { Component, Fragment } from 'react';
import router from "next/router";
import styles from "../SetPwdSuccess/Setpwd.module.scss"

const SetPwdSuccess: React.FC = () => {

    const checkReset = (e) => {
        e.preventDefault();
        router.push('/login');
    }
    return (
        <>
            <div className={styles.resetPasswordContainer}>
      
      {/* Left side: Content */}
      <div className={styles.contentSection}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src="/images/logo_black.png" alt="logo" />
        </div>

        <h3 className={styles.heading}>Reset Password</h3>

        <p className={styles.message}>Your Password is reset successfully. Please login</p>

        <button
          className={styles.submitButton}
          type="button"
          onClick={(e) => { checkReset(e); }}
        >
          Close
        </button>
      </div>

      {/* Right side: Image */}
      <div className={styles.imageSection}>
        <img src="/images/flight.jpg" alt="Reset Password Visual" />
      </div>

    </div>
        </>
    );
}

export default SetPwdSuccess;