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
import { CircularProgress } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

const schema = yup.object().shape({
    emailId: yup.string().required("Email is required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is not valid"),
    newPassword: yup
    .string()
    .required("Enter new password")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.*[^a-zA-Z0-9]).{6}$/,
      "Password must be exactly 6 characters, include uppercase, lowercase, and special character"
    ),
    retypepwd: yup
    .string()
    .required("Enter new password")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.*[^a-zA-Z0-9]).{6}$/,
      "Password must be exactly 6 characters, include uppercase, lowercase, and special character"
    )
    .oneOf([yup.ref("newPassword")], "Passwords do not match")});

const Customerresetpassword: React.FC = () => {
    
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false)
        
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
        setLoading(true);   
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
                    setTimeout(() => {
                        router.push("/resetnext");
                        setLoading(false);
                      }, 1000);
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
		        setLoading(false)
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
		        setLoading(false)
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

            <div className={styles.inputGroup} style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="New Password"
        {...register('newPassword', { required: "Enter new password" })}
        className={errors.newPassword ? styles.invalid : ''}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
      {errors.newPassword && <span className={styles.error}>{errors.newPassword.message}</span>}
    </div>
    <div className={styles.inputGroup} style={{ position: 'relative' }}>
      <input
        type={showRetypePassword ? 'text' : 'password'}
        placeholder="Retype Password"
        {...register('retypepwd', { required: "Please retype your password" })}
        className={errors.retypepwd ? styles.invalid : ''}
      />
      <span
        onClick={() => setShowRetypePassword(!showRetypePassword)}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
      >
        {showRetypePassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
      {errors.retypepwd && <span className={styles.error}>{errors.retypepwd.message}</span>}
    </div>

    <div className={styles.buttonGroup}>
  <button
    type="submit"
    className={styles.resetButton}
    disabled={loading}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "0.5rem 1rem", // Added padding to ensure spacing and even height
    }}
  >
    {loading ? (
      <>
        Reset
        <CircularProgress size={20} style={{ color: "#fff" }} />
      </>
    ) : (
      "Reset"
    )}
  </button>
  <button
      type="button"
      className={styles.cancelButton}
      onClick={() => router.back()}
    >
      Cancel
    </button>
</div>

          </form>
        </div>
      </div>
    </div>
        </>
    );
}

export default Customerresetpassword;