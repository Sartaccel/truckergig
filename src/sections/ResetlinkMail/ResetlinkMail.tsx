import React, { Component, Fragment } from 'react';
import router from "next/router";
import styles from "../ResetlinkMail/Restlink.module.scss"

const ResetLinkMail: React.FC = () => {

    const checkReset = (e) => {          
        e.preventDefault();
        router.push('/customerlogin');
    }

    return (
        <>
            <div className={styles.resetLinkContainer}>
      <div className={`${styles.card}`}>
        <div className="row no-gutters">
          <div className="col text-center">
            <img className={styles.logo} src="/images/logo_black.png" alt="logo" />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <h1 className={styles.heading}>Reset Link Mailed</h1>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <form action="/#" className="pt-4">
              <p className={styles.message}>
                Please check your inbox for the reset link. The link is valid for 10 minutes.
              </p>
              <div className="row no-gutters">
                <div className="col">
                  <button
                    className={styles.submitButton}
                    type="button"
                    onClick={(e) => checkReset(e)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        </>
    );
}

export default ResetLinkMail;