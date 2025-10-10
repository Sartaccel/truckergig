import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Register.module.scss";
import * as MdIcons from 'react-icons/md';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import urls from "../../utilities/AppSettings";
import ReCAPTCHA from "react-google-recaptcha";
import router from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from "@mui/material";


const onChange = (value) => {
  console.log("Captcha value:", value);
};

const checkResponse = (responseStatusCode) => {
  let code = Number(responseStatusCode);
  return (code > 199 && code < 300)
}

const schema = yup.object().shape({
firstName: yup
  .string()
  .required("First Name is a required field")
  .min(2, "Minimum 2 characters required")
  .max(24, "Maximum 24 characters allowed")
  .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),

  lastName: yup.string()
  .required("Last Name is a required field")
  .min(2, "Minimum 1 characters required")
  .max(24, "Maximum 24 characters allowed")
  .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
  phoneNumber: yup
  .string()
  .required("Phone is Required")
  .matches(/^\d{10}$/, "Phone number is not valid"),
  emailId: yup
  .string()
  .required("Email is required")
  .matches(/^[a-z0-9@.]+$/, "Only lowercase letters, numbers, @ and . allowed")
  .email("Enter a valid email address"),
  password: yup
  .string()
  .required("This is a required field")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/,
    "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
  ),

confirmPassword: yup
  .string()
  .required("This is a required field")
  .oneOf([yup.ref("password")], "Passwords must match"),
   captcha: yup.string().required("Please verify the Captcha"),
})


const Register = () => {
const { register, handleSubmit, formState: { errors }, setValue } = useForm({
  resolver: yupResolver(schema),
});

  const [selectedCode, setSelectedCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

   useEffect(() => {
    setValue("captcha", captchaValue);
  }, [captchaValue, setValue]);



  const onSubmitHandler = (data) => {
    setLoading(true);
    // Combine the country code with the phone number
    const fullPhone = `${selectedCode}${data.phoneNumber}`;
    
    // Prepare the params object to send to the API
    const params = { 
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: fullPhone, // Use the combined phone number with country code
      emailId: data.emailId,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
  
    console.log(params); // For debugging to check the final phone number

    axios
  .post(`${urls.baseUrl}users/register`, params)
  .then((response) => {
    const res = response.data;
    const headers = res.headers;

      if (response && checkResponse(headers.statusCode)){
      toast.success("User Added Successfully", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        router.push("/login");
    } else {
      toast.error(headers.message || "Something went wrong", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    setLoading(false);
    }
  })
  .catch((error) => {
    const errorMsg =
      error.response?.data?.headers?.message ||
      "Registration failed. Please try again.";
    toast.error(errorMsg, {
      theme: "dark",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false);
    console.log(error);
  });

  
  };
  

  return (
    <>
    <div className='row p-2' style={{marginLeft:"55px"}}>
				<div className='col'>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/login">Customer Login</Breadcrumb.Item>
						<Breadcrumb.Item active>Customer Registration</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>
      <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register New Customer Account</h1>
        <div className={styles.subtitle}>
          <h4>
            Registration - <span>IT'S FREE</span>
          </h4>
          <p>Register to Shop on TruckerGIG.com</p>
        </div>

        <div className={styles.container}>
  <form onSubmit={handleSubmit(onSubmitHandler)}>
    <div className={styles.formWrapper}>
      {/* Left Column - Personal Information */}
      <div className={styles.column}>
        <p className={styles.sectionTitle}>Personal Information</p>
     <div className={styles.formGroup}>
  <label>
    First Name<span className={styles.star}>*</span>
  </label>
  <input
    {...register("firstName")}
    type="text"
    placeholder="Enter your First Name"
    onKeyPress={(e) => {
      const key = e.key;
      const value = e.currentTarget.value;

      // Allow only alphabets and spaces
      if (!/^[A-Za-z ]$/.test(key)) {
        e.preventDefault();
      }
      // Block space if it's the very first character
      else if (key === " " && value.length === 0) {
        e.preventDefault();
      }
    }}
    onBlur={(e) => {
      const input = e.target as HTMLInputElement;
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }}
    onFocus={(e) => {
      const input = e.target as HTMLInputElement;
      input.style.borderColor = "#ff8c00";
      input.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
    }}
    className={errors.firstName ? styles.invalid : ""}
  />
  {errors.firstName && (
    <span className={styles.error}>{errors.firstName.message}</span>
  )}
</div>

       <div className={styles.formGroup}>
  <label>
    Last Name<span className={styles.star}>*</span>
  </label>
  <input
    {...register("lastName")}
    type="text"
    placeholder="Enter your Last Name"
    onKeyPress={(e) => {
      const key = e.key;
      const value = e.currentTarget.value;

      // Allow only alphabets and spaces
      if (!/^[A-Za-z ]$/.test(key)) {
        e.preventDefault();
      }
      // Block space if it's the very first character
      else if (key === " " && value.length === 0) {
        e.preventDefault();
      }
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "";
      e.target.style.boxShadow = "";
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#ff8c00";
      e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
    }}
    className={errors.lastName ? styles.invalid : ""}
  />
  {errors.lastName && (
    <span className={styles.error}>{errors.lastName.message}</span>
  )}
</div>

        <div className={styles.formGroup}>
        <label>Phone Number<span className={styles.star}>*</span></label>
  <div className="d-flex">
    <select
      value={selectedCode}
      onChange={(e) => setSelectedCode(e.target.value)}
      className="form-select"
      style={{
        width: "120px", // Wider for visibility
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0"
      }}
      onBlur={(e) => {
        e.target.style.borderColor = ""; // Reset border color on blur
        e.target.style.boxShadow = ""; // Reset box shadow on blur
        }}
        onFocus={(e) => {
        e.target.style.borderColor = "#ff8c00"; // Orange border on focus
        e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; // Orange glow effect
        }} 
    >
      <option value="" disabled hidden>Country</option>
      <option value="+1">+1</option>
      <option value="+91">+91</option>
      <option value="+61">+61</option>
    </select>

    <input
  {...register("phoneNumber")}
  type="text"
  placeholder="Enter your phone number"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={10}
onKeyPress={(e) => {
  if (!/[0-9]/.test(e.key)){
    e.preventDefault();
  }
}}
  onBlur={(e) => {
    const input = e.target;
    input.style.borderColor = "";
    input.style.boxShadow = "";
  }}
  onFocus={(e) => {
    const input = e.target;
    input.style.borderColor = "#ff8c00";
    input.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
  }}
 
  className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
  style={{
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  }}
/>

  </div>
  {errors.phoneNumber && (
  <div className="invalid-feedback d-block">
    {errors.phoneNumber.message}
  </div>
)}

</div>

        {/* <div className={styles.formGroup}>
          <label>Please Verify Captcha<span className={styles.star}>*</span></label>
          <ReCAPTCHA sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV" onChange={() => {}} />
        </div> */}
        
      </div>

      {/* Right Column - Sign-in Information */}
      <div className={styles.column}>
        <p className={styles.sectionTitle}>Sign-in Information</p>
    <div className={styles.formGroup}>
  <label>
    Email<span className={styles.star}>*</span>
  </label>
  <input
    {...register("emailId")}
    type="email"
    placeholder="Enter your Email"
    onChange={(e) => {
      const lower = e.target.value.toLowerCase();
      setValue("emailId", lower, { shouldValidate: true }); // ✅ updates RHF value + triggers validation
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "";
      e.target.style.boxShadow = "";
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#ff8c00";
      e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
    }}
    className={errors.emailId ? styles.invalid : ""}
  />
  {errors.emailId && (
    <span className={styles.error}>{errors.emailId.message}</span>
  )}
</div>


        <div className={styles.formGroup} style={{ position: "relative" }}>
  <label>
    Password <span className={styles.star}>*</span>
  </label>

  <input
    {...register("password")}
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    onBlur={(e) => {
      e.target.style.borderColor = "";
      e.target.style.boxShadow = "";
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#ff8c00";
      e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
    }}
    className={errors.password ? styles.invalid : ""}
    style={{ paddingRight: "40px" }}
  />

  {/* 👁 Eye Icon */}
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      top: "70%",
      right: "15px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6c757d",
      zIndex: 10,
      pointerEvents: "auto",
    }}
  >
    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </span>

  {/* ✅ Reserve space for error message to prevent layout shift */}
  <div >
    {errors.password && (
      <span className={styles.error}>{errors.password.message}</span>
    )}
  </div>
</div>

<div className={styles.formGroup} style={{ position: "relative" }}>
  <label>
    Confirm Password <span className={styles.star}>*</span>
  </label>

  <input
    {...register("confirmPassword")}
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Enter your confirm password"
    onBlur={(e) => {
      e.target.style.borderColor = "";
      e.target.style.boxShadow = "";
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#ff8c00";
      e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
    }}
    className={errors.confirmPassword ? styles.invalid : ""}
    style={{ paddingRight: "40px" }}
  />

  {/* 👁 Eye icon toggle */}
  <span
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    style={{
      position: "absolute",
      top: "50%",
      right: "15px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6c757d",
      zIndex: 10,
      pointerEvents: "auto",
    }}
  >
    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
  </span>

  {/* 🚫 Prevent layout shift */}
  <div style={{ minHeight: "20px", marginTop: "4px" }}>
    {errors.confirmPassword && (
      <span className={styles.error}>{errors.confirmPassword.message}</span>
    )}
  </div>
</div>
 <div className={styles.formGroup}>
                    <label>
                      Please Verify Captcha
                      <span className={styles.star}>*</span>
                    </label>
                    <ReCAPTCHA
                      sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV"
                      onChange={(value) => {
                        setCaptchaValue(value);
                        setValue("captcha", value, { shouldValidate: true });
                      }}
                    />
                    {errors.captcha && (
                      <span className={styles.error}>
                        {errors.captcha.message}
                      </span>
                    )}
                  </div>
       
        <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? (
          <>
          Registering... <CircularProgress size={20} color="inherit" />
          </>
          ) : (
          "Register"
          )}
        </button>
</div>
        
      </div>
      
    </div>

    {/* Submit Button */}
   

  </form>
</div></div></div>

    </>
  )
};
  
export default Register;
