import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import urls from "../../utilities/AppSettings";
import styles from "../Customer/Login.module.scss"
import router from "next/router";

export default function GoogleAuth(props) {
  interface GoogleJwtPayload {
    given_name?: string;
    family_name?: string;
    email?: string;
    picture?: string;
    sub: string;
  }
  
  const onResponse = async (credentialResponse: { credential?: string }) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google Login Failed!", { autoClose: 1500 });
        return;
      }
  
      // Decode the JWT token from Google
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
  
      // Prepare user data
      const params = {
        firstName: decoded?.given_name || "",
        lastName: decoded?.family_name || "",
        phone: "",
        email: decoded?.email || "",
        profileImage: decoded?.picture || "",
        socialLoginId: decoded?.sub || "",
        loginTypeId: "2",
      };
  
      // Send login request to backend
      const response = await axios.post(`${urls.baseUrl}login`, params);
  
      if (response.status === 200) {
        toast.success("Login Successful!", { autoClose: 1500 });
  
        const userDetail = response.data.data.userdata;
        localStorage.setItem("user", JSON.stringify(userDetail));
        localStorage.setItem("Authorization", response.data.data.authtoken);
  
        router.push("/marketplace");
      } else {
        toast.error("Login Failed!", { autoClose: 1500 });
      }
    } catch (error) {
      // toast.warning("An error occurred!", { autoClose: 1500 });
    }
  };

  const onGoogleFailure = () => {
    toast.error("Google Login Failed!", { autoClose: 1500 });
  };

  return (
    <div className={`${styles["google"]} `}>
    <GoogleOAuthProvider clientId="1065378203448-na0u99v571sgfj994c8a38ihc7jskval.apps.googleusercontent.com">
      <GoogleLogin onSuccess={onResponse} onError={onGoogleFailure} />  
    </GoogleOAuthProvider>
    </div>
  );
}
