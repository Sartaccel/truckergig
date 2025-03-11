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
    <div className='row p-2'>
				<div className='col'>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/customerlogin">Customer Login</Breadcrumb.Item>
						<Breadcrumb.Item active>Customer Registration</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>
      <div className="container">
        <div>
          <h1 className={`${styles["register-header-title"]} `}>
            Register New Customer Account
          </h1>
          <div className={`${styles["register-page-title"]} `}>
            <h4>
              Registration -<span>IT'S FREE</span>
            </h4>
            <p>Register to Shop on TruckerGIG.com</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <p className={`${styles["form-personal-info"]} `}>
              Personal Information
            </p>
            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>First Name</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    {...register("firstName")}
                    type="text"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Last Name</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    {...register("lastName")}
                    type="text"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.lastName?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Phone Number</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="phonenumber"
                    placeholder="(xxx) xxx-xxxx"
                    {...register("phone")}
                    className={`form-control 
                                    ${errors.phone ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className={`${styles["form-personal-info"]} `}>
              Sign-in Information
            </p>

            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Email</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    {...register("emailId")}
                    type="email"
                    className={`form-control ${errors.emailId ? "is-invalid" : ""
                      }`}
                  />
                  <div className={`${styles["invalid-feedback"]}`}>
                    {errors.emailId?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Password</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    {...register("password")}
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {" "}
                    {errors.password?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Confirm Password</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                      }`}
                  />
                  <div className={`${styles["invalid-feedback"]}`}>
                    {errors.confirmPassword?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles["register-form-row"]} `}>
              <div className="row">
                <div className={`${styles["form-text"]} col-4`}>
                  <label>Please Verify Captcha</label>
                  <sup className="star">*</sup>
                </div>
                <div className="col-8">
                  <ReCAPTCHA
                    sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="row pb-3">
              <div className="col-6">
                <button type="submit" className={`${styles["submit-btn"]} `}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
