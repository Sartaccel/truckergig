import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from "next/router"
import TiSocialFacebookCircular from "react-icons/ti";
import urls from "../../utilities/AppSettings";
import styles from "../Customer/Login.module.scss"

export default function FacebookLogin(props) {


  const onResponse = (response) => {
    if (response) {
      var Rese = response
      var params = ({ firstName: Rese.name, lastName: "", phone: "", email: Rese.email, profileImage: Rese.picture.data.url, socialLoginId: Rese.id, loginTypeId: "3" });

      axios.post(`${urls.baseUrl}login`, params)

        .then(function (response) {
          if (response.status === 200) {
            toast.success('Login Sucess', {
              theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
              closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            });
            const userdetail = (response.data.data.userdata)
            localStorage.setItem("user", JSON.stringify(userdetail));
            localStorage.setItem("Authorization", response.data.data.authtoken);
            router.push("/marketplace")
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
  };




  const onFailures = resp => {
    if (resp) {
      toast.error('Facebook Login error', {
        theme: "colored", position: "top-right", autoClose: 1500, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
    }
  }

  return (
    <>
    <ReactFacebookLogin
  icon="fa-facebook"
  textButton="Sign in with Facebook"
  size="small"
  appId="347743046916982"
  autoLoad={false}
  scope="public_profile,email"
  fields="name,email,picture"
  callback={onResponse}
  onFailure={onFailures}
  // cssClass=""
  // style={{
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100%",
  //   maxWidth: "250px",
  //   padding: "10px",
  //   fontSize: "14px",
  //   borderRadius: "4px",
  //   border: "1px solid #ccc",
  //   backgroundColor: "white",
  //   color: "black",
  //   // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
  //   fontWeight: "bold",
  //   // cursor: "pointer",
  // }}
/>


    </>
  );
}