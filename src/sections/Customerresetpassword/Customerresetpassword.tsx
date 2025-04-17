import React, { useState, useEffect } from 'react';
import router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import urls from "../../utilities/AppSettings";
import $ from "jquery";
import styles from "../Customerresetpassword/Password.module.scss"

const schema = yup.object().shape({
    emailId: yup.string().required("Email is required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is not valid"),
    newPassword: yup.string().required("Enter new password").min(6, "Password must be atleast six characters").max(24),
    retypepwd: yup.string().required("Enter new password").oneOf([yup.ref("newPassword")], "Password does not matched"),
});

const Customerresetpassword: React.FC = () => {
    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const redirect = params.get('redirect');
        console.log(redirect);

        if (params.get('redirect')) {
            axios.get(`${urls.baseUrl}users/reset/checklink?redirect=` + params.get('redirect'))
                .then(function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        if (response.data.headers.statusCode == 407) {
                            console.log('failed');
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
                            router.push("/resetexpiry")
                        }
                        else {
                            console.log('success');
                        }
                    } else {
                        console.log('failed');
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
                        router.push("/resetexpiry")
                    }
                })
        }
        else {
            console.log('error');
            router.push("/resetexpiry")
        }
    }, [])

    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
    const onSubmitHandler = (data) => {
        var params = data;
        params = {
            emailId: $("#emailId").val(),
            newPassword: $("#newPassword").val(),
        }
        console.log(params)
        axios.post(`${urls.baseUrl}users/reset/password`, params)
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    toast.success("Users modified successfully", {
                        theme: "colored",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    router.push("/resetnext")
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
                toast.error("Oops!, Unable to login", {
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
            <div className={styles.resetPasswordPage}>
      <div className={styles.leftPanel}>
        <img src="/images/mail.jpg" alt="Shipping background" className={styles.backgroundImage} />
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <img src="/images/logo_black.png" alt="Logo" className={styles.logo} />
          <h1>Reset Password</h1>
          <p className={styles.subtitle}>Don’t worry! Enter your email to reset your password and get back on track</p>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email address"
                {...register('emailId', { required: "Email is required" })}
                className={errors.emailId ? styles.invalid : ''}
              />
              {errors.emailId && <span className={styles.error}>{errors.emailId.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="New Password"
                {...register('newPassword', { required: "Password is required" })}
                className={errors.newPassword ? styles.invalid : ''}
              />
              {errors.newPassword && <span className={styles.error}>{errors.newPassword.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Retype Password"
                {...register('retypepwd', { required: "Please retype your password" })}
                className={errors.retypepwd ? styles.invalid : ''}
              />
              {errors.retypepwd && <span className={styles.error}>{errors.retypepwd.message}</span>}
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.resetButton}>Reset</button>
              <button type="button" className={styles.cancelButton}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    );
}

export default Customerresetpassword;