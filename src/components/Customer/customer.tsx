import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.scss';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from '../../components/Sociallogins/GoogleLogin';
import FacebookLogin from '../../components/Sociallogins/FacebookLogin';
import urls from "../../utilities/AppSettings";

const onChange = (value) => {
  console.log("Captcha value:", value);
};

const schema = yup.object().shape({
  username: yup.string().email().required("This is a required field"),
  password: yup.string().min(6, "This is a required field").max(24).required("This is a required field"),

});

const Login: React.FC = (props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    data.loginTypeId = "1";
    var params = data;
    axios

      .post(`${urls.baseUrl}login`, params)

      .then(function (response) {
        if (response.status === 200) {
          toast.success("Login Success", {
            theme: "colored",
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const userdetail = response.data.data.userdata;
          localStorage.setItem("user", JSON.stringify(userdetail));
          localStorage.setItem("Authorization", response.data.data.authtoken);
          router.push("/marketplace");
        } else {
          toast.error("Login error", {
            theme: "colored",
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        toast.error("Invalid Credentials", {
          theme: "colored",
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const [password, setPassword] = useState("password");
const [icon, setIcon] = useState("bi bi-eye-slash");

  const show = () => {
    password === "password" ? setPassword("text") : setPassword("password");
    icon === "bi bi-eye"
      ? setIcon("bi bi-eye-slash")
      : setIcon("bi bi-eye");
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    router.push('/forgotpassword');
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
      <div className="container">
        <div>
          <h1 className={`${styles["login-header-title"]} `}>Customer Login</h1>
        </div>
        <div className="container">
          <div className="p-4">
            <div className="row">
              <div className="col-xl-3 col-12 p-1 newgl">
                <GoogleLogin isformlogin={true} />
              </div>
              <div className="col-xl-3 col-12 p-1 newfb">
                <FacebookLogin isformlogin={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-xl-12 col-12 ">
            <div className="row">
              <div className="col-xl-6 col-12">
                <div>
                  <h5 className={`${styles[""]} `}>Existing Customer</h5>
                </div>
                <div className={`${styles[""]}`}>
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div>
                      <div>
                        <div className="row p-1">
                          <div className={`${styles["login-form-text"]}`}>
                            <label>Email</label>
                            <sup className={`${styles["star"]} `}>*</sup>
                          </div>
                          <div className="">
                            <input
                              {...register("username")}
                              type="email"
                              className={`form-control ${errors.username ? "is-invalid" : ""
                                }`}
                            />
                            <div className="invalid-feedback">
                              {errors.username?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row p-1">
                          <div className={`${styles["login-form-text"]}`}>
                            <label>Password</label>
                            <sup className={`${styles["star"]} `}>*</sup>
                            </div>
                          <div>
                            <input
                              {...register("password")}
                              type={password}
                              className={`form-control ${errors.password ? "is-invalid" : ""
                                }`}
                            />
                            <span className='eyeicon'><i onClick={show} className={icon}></i></span>
                            <div className="invalid-feedback">
                              {" "}
                              {errors.password?.message}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-1">
                        <div className="row">
                          <div
                            className={`${styles["login-form-text"]} col-12`}
                          >
                            <label>Verify Captcha</label>
                            <sup className={`${styles["star"]} `}>*</sup>
                          </div>
                          <div>
                            <ReCAPTCHA
                              sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV"
                              onChange={onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col p-3">
                        <button
                          type="submit"
                          className={`${styles["signin-btn"]} `}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="col">
                        <div className="w-100 mx-auto text-right pt-3">
                          <a href="/#" className="verify" onClick={(e) =>{forgotPassword(e)}}>Forgot Password</a>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-6 col-12 p-4 regcard">
                <div>
                  <div className={`${styles[""]}`}>
                    <div className={`${styles[""]}`}>
                      <strong>New Customer</strong>
                    </div>
                    <div>
                      <p className={`${styles["signin-info"]} `}>
                        If you don't have account please signup with your email
                        account.
                      </p>
                    </div>
                    <div className={`${styles["regbtn"]}`}>
                      <Link href="/customerregister">
                        <button
                          type="submit"
                          className={`${styles["signin-btn"]} `}
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;