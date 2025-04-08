import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import urls from "../../utilities/AppSettings";
import styles from './Forgotpassword.module.scss';

const schema = yup.object().shape({
    emailId: yup.string().required("Email is required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is not valid"),
});
const Forgotpassword: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
    const onSubmitHandler = (data) => {
        var params = data;
        console.log(params)
        axios.post(`${urls.baseUrl}users/change/password`, params)

            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    toast.success("password sent to mailid", {
                        theme: "colored",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    //   e.preventDefault();
                    router.push("/resetlinkmail")
                }
                else {
                    toast.error("Oops!", {
                        theme: "colored",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Oops! Unable to reset password", {
                    theme: "colored",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const close = (e) => {
        e.preventDefault();
        router.push('/customerlogin');
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={styles.container}>
      <div className={styles.leftImage}></div>

      <div className={styles.rightForm}>
        <div className={styles.formCard}>
          <div className={styles.logoWrapper}>
            <img src="/images/logo_black.png" alt="logo" className={styles.logo} />
          </div>

          <h1>Reset Password</h1>
          <p>Don’t worry!<br/>
          Enter your email to reset your password and get back on track</p>

          <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
            <div className={styles.inputGroup}>
              {/* <label htmlFor="emailId">Email Address</label> */}
              <div className={styles.iconInput}>
                <span><i className="bi bi-at"></i></span>
                <input
                  type="email"
                  id="emailId"
                  placeholder="Email address"
                  {...register("emailId")}
                  className={errors.emailId ? styles.invalid : ""}
                />
              </div>
              {errors.emailId && <div className={styles.error}>{errors.emailId.message}</div>}
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>Reset</button>
              <button type="button" className={styles.submitButton} onClick={close}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}

export default Forgotpassword;