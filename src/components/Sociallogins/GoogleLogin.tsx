import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import urls from "../../utilities/AppSettings";
import styles from "../Customer/Login.module.scss"

export default function GoogleAuth(props) {
  const onResponse = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google Login Failed!", { autoClose: 1500 });
        return;
      }

      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential);
      
      // Prepare user data
      const params = {
        firstName: decoded.given_name || "",
        lastName: decoded.family_name || "",
        phone: "",
        email: decoded.email || "",
        profileImage: decoded.picture || "",
        socialLoginId: decoded.sub || "",
        loginTypeId: "2",
      };

      // Send login request to backend
      const response = await axios.post(`${urls.baseUrl}login`, params);

      if (response.status === 200) {
        toast.success("Login Successful!", { autoClose: 1500 });

        const userDetail = response.data.data.userdata;
        localStorage.setItem("user", JSON.stringify(userDetail));
        localStorage.setItem("Authorization", response.data.data.authtoken);
        router.push("/service");
      } else {
        toast.error("Login Failed!", { autoClose: 1500 });
      }
    } catch (error) {
      toast.warning("An error occurred!", { autoClose: 1500 });
    }
  };

  const onGoogleFailure = () => {
    toast.error("Google Login Failed!", { autoClose: 1500 });
  };

  return (
    <div className={`${styles["google"]} `}>
    <GoogleOAuthProvider clientId="758755086277-r7tlrojvoi55u9ojc9c3jiaj59fov8a2.apps.googleusercontent.com">
      <GoogleLogin onSuccess={onResponse} onError={onGoogleFailure} />  
    </GoogleOAuthProvider>
    </div>
  );
}
