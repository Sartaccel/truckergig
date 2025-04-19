import React, { Component, Fragment } from 'react';
import router from "next/router";
import styles from "../ResetlinkMail/Restlink.module.scss"

const ResetLinkMail: React.FC = () => {

    const checkReset = (e) => {          
        e.preventDefault();
        router.push('/login');
    }

    return (
        <>
            <div className={styles.container}>
  {/* Left Side - Background Image */}
  <div className={styles.leftSide}></div>

  {/* Right Side - Reset Link Message */}
  <div className={styles.rightSide}>
    <div className={styles.card}>
      <div className="text-center">
        <img className={styles.logo} src="/images/logo_black.png" alt="logo" />
      </div>
      <h1 className={styles.heading}>Reset Link Mailed</h1>
      <p className={styles.message}>
        Please check your inbox for the reset link. The link is valid for 10 minutes.
      </p>
      <div className="text-center">
        <button
          className={styles.submitButton}
          type="button"
          onClick={(e) => checkReset(e)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

        </>
    );
}

export default ResetLinkMail;