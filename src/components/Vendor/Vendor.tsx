import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Vendor.module.scss';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import urls from "../../utilities/AppSettings";

const onChange = (value) => {
    console.log("Captcha value:", value);
};

const schema = yup.object().shape({
    userName: yup.string().email().required("This is a required field"),
    password: yup.string().required("This is a required field").min(6, "At least 6 characters required").max(24),

});

const Vendor: React.FC = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const onSubmitHandler = (data) => {
        var params = data;
        axios.post(`${urls.userUrl}gateway/trmlogin`, params).then(function (response) {
            console.log(params)
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
                const userdetail = response.data.data;
                localStorage.setItem("user", JSON.stringify(userdetail));
                localStorage.setItem("Authorization", response.data.data.authtoken);
                localStorage.setItem("Clientname", response.data.data.clientName);
                localStorage.setItem("Clientid", response.data.data.clientId);
                router.push("/marketplace");
                // setTimeout(() => { window.location.reload(); }, 3000);
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
                toast.error("Invalid email format", {
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
          
          <div className={styles.wrapper}>
  <div className={styles.card}>
    {/* Left Side */}
    <div className={styles.leftSection}>
      <h1>Welcome back!</h1>
      <p>You can sign in to access with your existing account.</p>
    </div>

    {/* Right Side - Your Existing Code (Unchanged) */}
    <div className={styles.rightSection}>
      <div className={styles["login-header"]}>
        <h1 className={styles.header}>Vendor Login</h1>
      </div>

      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="formNewService">
          <div className={styles["input-wrapper"]}>
            <label className={styles["input-label"]}>Username</label>
            <input 
              {...register("userName")}
              type="email"
              onBlur={(e) => {
                e.target.style.borderColor = ""; 
                e.target.style.boxShadow = ""; 
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#ff8c00"; 
                e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
              }}
              className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            />
            <div className={styles["invalid-feedback"]}>{errors.userName?.message}</div>
          </div>

          <div className={styles["input-wrapper"]}>
            <label className={styles["input-label"]}>Password</label>
            <div className={styles["password-container"]}>
              <input 
                {...register("password")}
                type={password} 
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = ""; 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                }}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <span className={styles.eyeicon} style={{ cursor: "pointer" }} onClick={show}>
                <i className={icon}></i>
              </span>
            </div>
            <div className={styles["invalid-feedback"]}>{errors.password?.message}</div>
          </div>

          <button type="submit" className={styles["signin-btn"]}>Sign In</button>
        </form>
      </div>
    </div>
  </div>
</div>

    
            
                    
                
           
        </>
    );
};

export default Vendor;