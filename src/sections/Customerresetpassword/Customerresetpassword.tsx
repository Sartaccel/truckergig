import React, { useState, useEffect } from 'react';
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
                            <p>Please enter your email address and new password</p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="bi bi-key"></i></div>
                                        </div>
                                        <input name="newPassword" id="newPassword" placeholder="New Password"
                                            {...register("newPassword")}
                                            type="password"
                                            className={`form-control ${errors.newPassword ? "is-invalid" : ""
                                                }`} />
                                        <div className="invalid-feedback">
                                            {errors.newPassword?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="bi bi-key"></i></div>
                                        </div>
                                        <input name="retypepwd" id="retypepwd" placeholder="Retype Password"
                                            {...register("retypepwd")}
                                            type="password"
                                            className={`form-control ${errors.retypepwd ? "is-invalid" : ""
                                                }`} />
                                        <div className="invalid-feedback">
                                            {errors.retypepwd?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col">
                                        <button type="submit" className="submit-button">Reset</button>&nbsp;
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

export default Customerresetpassword;