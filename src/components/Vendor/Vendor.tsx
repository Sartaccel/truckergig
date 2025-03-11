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
                    <h1 className={`${styles["login-header-title"]} `}>Vendor Login</h1>
                </div>
                <div className="container">
                    <div className="col-xl-12 col-12 ">
                        <div className="row">
                            <div className="col-xl-6 col-12">
                                <div className={`${styles[""]}`}>
                                    <form onSubmit={handleSubmit(onSubmitHandler)} id="formNewService">
                                        <div>
                                            <div>
                                                <div className="row p-1">
                                                    <div className={`${styles["login-form-text"]}`}>
                                                        <label>Username</label>
                                                        <sup className={`${styles["star"]} `}>*</sup>
                                                    </div>
                                                    <div className="">
                                                        <input
                                                            {...register("userName")}
                                                            type="email"
                                                            className={`form-control ${errors.userName ? "is-invalid" : ""
                                                                }`}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.userName?.message}
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
                                                    <div className="">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vendor;