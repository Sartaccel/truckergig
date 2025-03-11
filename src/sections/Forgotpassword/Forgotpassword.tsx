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
            <div className="row no-gutters align-items-center gig-login">
                <div className="col-md-3 shadow p-5 bg-white rounded">
                    <div className="row no-gutters">
                        <div className="col text-center">
                            <img className="logo" src="/images/logo_black.png" alt="logo" />
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <h1 className="pt-4 text-left">Reset Password</h1>
                            <p>Enter your Email address. We will send you a link to reset your password</p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className="form-group">
                                    <label htmlFor="emailId">Email Address</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="bi bi-at"></i></div>
                                        </div>
                                        <input name="emailId" id="emailId" placeholder="Email address"
                                            {...register("emailId")}
                                            type="email"
                                            className={`form-control ${errors.emailId ? "is-invalid" : ""
                                                }`} />
                                        <div className="invalid-feedback">
                                            {errors.emailId?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col">
                                        <button type="submit" className="submit-button">Reset</button>&nbsp;
                                        <button type="button" className="submit-button" onClick={(e) => { e.preventDefault(); close(e) }} >Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword;