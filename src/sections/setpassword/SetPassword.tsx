import React, { Component, Fragment, useEffect, useState } from 'react';
import router from "next/router";
import * as yup from "yup";
import axios from "axios";
import urls from "../../utilities/AppSettings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
const schema = yup.object().shape({
    password: yup.string().required("Enter Password").min(6, "Password must be atleast six characters").max(24),
    retypepwd: yup.string().required("Enter Retype Password ").oneOf([yup.ref("password")], "retypePassword not matched with password"),
})

const SetPassword: React.FC = () => {
    const [direct, setDirect] = useState("");
    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const redirect = params.get('redirect');
        setDirect(redirect)
        console.log(direct);

        if (params.get('redirect')) {
            axios.get(`${urls.userUrl}gateway/tgigcheckresetlink?redirect=` + params.get('redirect'))
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
                            router.push("/setexpiry")
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
                        router.push("/setexpiry")
                    }
                })
        }
        else {
            console.log('error');
            router.push("/setexpiry")
        }
    }, [])

    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

    const onSubmitHandler = (data) => {
        var params = data;
        params = {
            password: $("#password").val(),
            redirect: direct
        }
        console.log(params)
        axios.post(`${urls.userUrl}gateway/tgigsetlogin`, params)
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    toast.success("Password set successfully", {
                        theme: "colored",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    router.push("/setsuccess")
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
                <div className="col-md-4 shadow p-5 bg-white rounded">
                    <div className="row no-gutters">
                        <div className="col text-center">
                            <Image className="logo"  width={100}
                  height={100} src="/images/logo_black.png" alt="logo" />
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <h1 className="pt-4  bold text-center">Set Your Password!</h1>
                            <form onSubmit={handleSubmit(onSubmitHandler)} className="pt-4">
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="float-left"> <i className="bi bi-key-fill"></i>&nbsp; Password</label>
                                    <div className="input-group">
                                        <input name="password" id="password" placeholder="Password"
                                            {...register("password")}
                                            type="password"
                                            className={`form-control ${errors.password ? "is-invalid" : ""
                                                }`} />
                                        <div className="invalid-feedback">
                                            {errors.password?.message}
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="float-left"> <i className="bi bi-key-fill"></i>&nbsp; Retype Password</label>
                                    <div className="input-group">
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

                                <div className="row no-gutters mt-3 pt-5">
                                    <div className='col-3'></div>
                                    <div className="col-6 sign-button">
                                        <button type="submit" className="submit-button">Set My Password</button>&nbsp;
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

export default SetPassword;