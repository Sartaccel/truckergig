import React, { useState, useEffect } from "react";
// import ReactGoogleLogin from "react-google-login";
import router from "next/router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import urls from "../../utilities/AppSettings";

export default function GoogleLogin(props) {
  const onResponse = (response) => {
    var Rese = response.profileObj
    var params = ({firstName:Rese.givenName,lastName:Rese.familyName,phone:"",email:Rese.email,profileImage:Rese.imageUrl,socialLoginId:Rese.googleId,loginTypeId:"2"});
      axios.post(`${urls.baseUrl}login`, params)
      .then(function (response) {
        console.log("gl",response)
        if (response.status === 200) {
          toast.success('Login Sucess', {
            theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
          });
          const userdetail = (response.data.data.userdata)
          localStorage.setItem("user", JSON.stringify(userdetail));
          localStorage.setItem("Authorization", response.data.data.authtoken);
          router.push("/service")
        }
        else {
          toast.error('Login error', {
            theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
          });
        }
      })
      .catch(function (error) {
        toast.warning('Check error', {
          theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
          closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
      });
  }


  const onGooglefailure = resp => {
    if (resp) {
      toast.error('Google Login error', {
        theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
    }
  };

  // props.isformlogin
  return (
    <>
      {/* <ReactGoogleLogin
        clientId="758755086277-r7tlrojvoi55u9ojc9c3jiaj59fov8a2.apps.googleusercontent.com" // We created this earlier, remember?
        buttonText={props.isformlogin ? "LOGIN WITH GOOGLE" : ""}
        onSuccess={onResponse}
        onFailure={onGooglefailure}
      /> */}
    </>
  );
}