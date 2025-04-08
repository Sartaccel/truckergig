import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Register.module.scss";
import * as MdIcons from 'react-icons/md';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import urls from "../../utilities/AppSettings";
import ReCAPTCHA from "react-google-recaptcha";
import router from "next/router";

const onChange = (value) => {
  console.log("Captcha value:", value);
};

const schema = yup.object().shape({
  firstName: yup.string().required("This is a required field").min(2).max(24),
  lastName: yup.string().required("This is a required field").min(2).max(24),
  phone: yup
    .number()
    .typeError("This is a required field")
    .required("This is a required field"),
  emailId: yup.string().email().required("This is a required field"),
  password: yup
    .string()
    .min(6, "Password must be atleast six characters")
    .max(24)
    .required("This is a required field"),
  confirmPassword: yup
    .string()
    .required("This is a required field")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    var params = (data);
    console.log(params)
    axios
      .post(`${urls.baseUrl}users/register`, params)

      .then(function (response) {
        if (response.status === 200) {
          alert("Users added successfully");
          router.push("/customerlogin")
        }
        else {
          alert("error");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("User already exists");
      });
  }

  return (
    <>
    <div className='row p-2' style={{marginLeft:"55px"}}>
				<div className='col'>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/customerlogin">Customer Login</Breadcrumb.Item>
						<Breadcrumb.Item active>Customer Registration</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>
      <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register New Customer Account</h1>
        <div className={styles.subtitle}>
          <h4>
            Registration - <span>IT'S FREE</span>
          </h4>
          <p>Register to Shop on TruckerGIG.com</p>
        </div>

        <div className={styles.container}>
  <form onSubmit={handleSubmit(onSubmitHandler)}>
    <div className={styles.formWrapper}>
      {/* Left Column - Personal Information */}
      <div className={styles.column}>
        <p className={styles.sectionTitle}>Personal Information</p>
        <div className={styles.formGroup}>
          <label>First Name<span className={styles.star}>*</span></label>
          <input {...register("firstName")} type="text" onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} className={errors.firstName ? styles.invalid : ""} />
          {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Last Name<span className={styles.star}>*</span></label>
          <input {...register("lastName")} type="text"onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} className={errors.lastName ? styles.invalid : ""} />
          {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number<span className={styles.star}>*</span></label>
          <input {...register("phone")} type="text"onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} placeholder="(xxx) xxx-xxxx" className={errors.phone ? styles.invalid : ""} />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Please Verify Captcha<span className={styles.star}>*</span></label>
          <ReCAPTCHA sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV" onChange={() => {}} />
        </div>
        
      </div>

      {/* Right Column - Sign-in Information */}
      <div className={styles.column}>
        <p className={styles.sectionTitle}>Sign-in Information</p>
        <div className={styles.formGroup}>
          <label>Email<span className={styles.star}>*</span></label>
          <input {...register("emailId")} type="email"onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} className={errors.emailId ? styles.invalid : ""} />
          {errors.emailId && <span className={styles.error}>{errors.emailId.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Password<span className={styles.star}>*</span></label>
          <input {...register("password")} type="password" onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} className={errors.password ? styles.invalid : ""} />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password<span className={styles.star}>*</span></label>
          <input {...register("confirmPassword")} type="password" onBlur={(e) => {
							e.target.style.borderColor = ""; // Reset border color on blur
							e.target.style.boxShadow = ""; // Reset box shadow on blur
						  }}
						  onFocus={(e) => {
							e.target.style.borderColor = "#ff8c00"; // Orange border on focus
							e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
						  }} className={errors.confirmPassword ? styles.invalid : ""} />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
        </div>
        <div className={styles.buttonContainer}>
  <button type="submit" className={styles.submitBtn}>Register</button>
</div>
        
      </div>
    </div>

    {/* Submit Button */}
   

  </form>
</div></div></div>

    </>
  )
};
  
export default Register;
