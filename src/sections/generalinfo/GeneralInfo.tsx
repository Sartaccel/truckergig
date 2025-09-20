
import React, { useRef, useState, useEffect, createRef } from "react";
import { Modal } from "react-bootstrap"
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
//import styles from '../generalinfo/Candidateregister.module.scss';
import styles from './GeneralInfo.module.scss';



const schema = yup.object().shape({
	lastName: yup
	.string()
	.matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
	.min(1, "Last name must be at least 1 character")
	.max(24, "Last name must not exceed 24 characters")
	.required("Last name is required"),
	  firstName: yup
  .string()
  .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed') // no spaces, no numbers
  .min(2, "First name must be at least 2 characters")
  .max(24, "First name must not exceed 24 characters")
  .required("First name is required"),
  middleName: yup
  .string()
//   .matches(/^[A-Za-z\s]*$/, "Only alphabets are allowed")
//   .min(2, "Middle name must be at least 6 characters")
//   .max(24, "Middle name must not exceed 24 characters")
  .nullable(), // because Middle Name can be optional

  email: yup
  .string()
  .required("Email is required")
  .matches(
    /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/,
    "Only lowercase email allowed, without special characters except '@'",
  

  ),	phoneNumber: yup.string().required("Phone is Required").matches(/^\d{10}$/, "Phone number is not valid"),
});

const Candidateregister: React.FC = () => {
	const router = useRouter()
	const [show, setShow] = useState(false);
	const [Country, setCountry] = useState();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [PhNumber, setIsPhNumber] = useState('');
	const [mobile, setmobile] = useState('');
	const [verify, setverify] = useState('');
	const [types, settypes] = useState([]);
	const [license, setlicense] = useState([]);
	const [licensetype, setlicensetype] = useState('');
	const [driverlicenseType, setdriverlicenseType] = useState('');
	const [disableRegister, setdisableRegister] = useState(true);
	const [licensetypeHidden, setlicensetypeHidden] = useState(false);

	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
	const onSubmitHandler = (data) => {
		data.profileStatus = '1';
		const code = Country;
		data.phoneNumber = code + data.phoneNumber;
		data.licenseType = driverlicenseType;
	
		const params = data;
		console.log(params);
	
		axios.post(`${urls.baseUrl}candidates/add`, params)
			.then(function (response) {
				if (response.status === 200) {
					toast.success('Driver Registered Successfully', {
						theme: "dark", position: "top-right", autoClose: 5000
					});
					setTimeout(() => { window.location.reload(); }, 1500);
				} else {
					const message = response.data?.message || 'Something went wrong!';
					toast.error(message, {
						theme: "dark", position: "top-right", autoClose: 5000
					});
				}
			})
			.catch(function (error) {
				const message = error.response?.data?.headers?.message || 'Error!';
				toast.error(message, {
					theme: "dark", position: "top-right", autoClose: 5000
				});
			});
	}
	const handleOtpSubmit = (e) => {
		e.preventDefault();
		// values.mobileNo = PhNumber.replace(/[- )(]/g, '');
		// verifyOtp(values);
		verifyOtp()
	}

	const handleChange = (value, action) => {
		if (action == "clear") {
			setCountry(null);
			setlicensetypeHidden(false)
		} else {
			setCountry(value.value);
			setlicensetypeHidden(true)
			console.log(value)
			axios.get(`${urls.baseUrl}candidates/licensetypes/get?countryId=` + value.countryId)
				.then(function (response) {
					const data = response.data.data.map((x: any) => {
						return {
							label: x.title,
							value: x.id,
						};
					});
					setlicense(data);
				});
		}
	}

	const handleChangeLicense = (licensetype) => {
		setlicensetype(licensetype);
		let driverlicense = licensetype.label;
		setdriverlicenseType(driverlicense)
		console.log(driverlicense)
	}

	const sentOtp = () => {
		const phn = mobile
		const code = Country
		console.log(Country);
		if (Country === undefined) {
			toast.error('Please Select Country', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			});
			return;
		}
		if (mobile === undefined || mobile.toString().length != 10
			|| mobile.toString().length < 0 || mobile.substring(0, 1) == "0"
			|| mobile.substring(0, 1) == "-"
			|| mobile.indexOf('.') !== -1) {
			toast.error('Invalid Mobile Number', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			});
			return;
		}
		handleShow();

		let formData = {
			mobileNo: code + phn
		}
		console.log(formData);
		if (mobile) {

			axios.post(`${urls.baseUrl}otp/sent`, formData)

				.then(function (response) {
					console.log(response);
					if (response.data.headers.status == "success") {
						toast.success(response.data.headers.message, {
							theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
							closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
						});
					} else {
						toast.error('Unable to process', {
							theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
							closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
						});
					}
				})
		} else {
			toast.error('Empty Value!', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			});
		}
	}

	const verifyOtp = () => {
		let formValue = {
			mobileNo: Country + mobile,
			otp: verify
		}
		if (!verify
			|| verify.toString().length != 6
			|| verify.toString().length < 0 || verify.substring(0, 1) == "0"
			|| verify.substring(0, 1) == "-"
			|| verify.indexOf('.') !== -1
		) {
			toast.error('Please enter the OTP', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			});
			return;
		}

		axios.post(`${urls.baseUrl}otp/verify`, formValue)

			.then(function (response) {
				console.log(response.data.headers.status);
				if (response.data.headers.status == "success") {
					toast.success('OTP Verified Successfully', {
						theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
						closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
					});
					setdisableRegister(false);
				}
				else {
					toast.error('Incorrect OTP', {
						theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
						closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
					});
					setdisableRegister(true);
					return;
				}
				setShow(false);
			})
	}

	useEffect(() => {
		axios.get(`${urls.baseUrl}summary`)
			.then(function (response) {
				console.log(response)
				const data = response.data.data.countries.map((x: any) => {
					console.log(x)
					return {
						label: x.dialingCode ,
						value: x.dialingCode,
						countryId: x.id,
					};
				});
				settypes(data);
			});
	}, []);
	return (
		<>
			<ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false}
				closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<div className='row p-2'style={{marginLeft:"55px"}} >
				<div className='col'>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
						<Breadcrumb.Item active>Driver Registration</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>
			<div>
				<form onSubmit={handleSubmit(onSubmitHandler)}>
				<div className="row">
    <div className="col-xl-6">
        <div className="row">
            <div className={styles.card}>
                {/* Moved "Driver Registration" inside the card */}
                <h4 className={`${styles["name"]}`}>Driver Registration</h4>

                <div className="row">
                    <div className="col-md-6">
                        <label className={styles.formLabel}>Suffix</label>
                        <select
                            {...register("suffix")}
                            name="suffix"
                            className="form-select"
                            onFocus={(e) => {
                                e.target.style.borderColor = "#ff8c00"; 
                                e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = ""; 
                                e.target.style.boxShadow = "none"; 
                            }}
                        >
                            <option value="selectedsuffix" selected>Select Suffix</option>
                            <option value="mr">Mr.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    


						{/* <label className={styles.formLabel}>First Name</label><sup className="star">*</sup>
<input 
  {...register("firstName", {
    required: "First name is required",
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Only alphabets are allowed",
    },
  })}
  name="firstName"
  type="text"
  placeholder="Enter your first name"
  className={`${styles.inputField} form-control ${errors.firstName ? "is-invalid" : ""}`}
/>
<div className="invalid-feedback">{errors.firstName?.message}</div>

                         */}
						 <label className={styles.formLabel}>First Name</label><sup className="star">*</sup>
<input 
maxLength={30}
  {...register("firstName", {
    required: "First name is required",
    pattern: {
      value: /^[A-Za-z]+$/, // only letters
      message: "Only alphabets are allowed",
    },
  })}
  name="firstName"
  type="text"
  placeholder="Enter your first name"
  className={`${styles.inputField} form-control ${errors.firstName ? "is-invalid" : ""}`}
  onInput={(e) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z]/g, '');
  }}
/>
<div className="invalid-feedback">{errors.firstName?.message}</div>

                        
                        
<label className={styles.formLabel}>Middle Name</label>
<input 
maxLength={30}
  {...register("middleName", {
    pattern: {
      value: /^[A-Za-z\s]*$/,
      message: "Only alphabets are allowed",
    },
    maxLength: {
      value: 24,
      message: "Middle name must not exceed 24 characters",
    },
  })}
  name="middleName"
  type="text"
  placeholder="Enter your middle name"
  className={`form-control ${errors.middleName ? "is-invalid" : ""}`}
  onBlur={(e) => {
    e.target.style.borderColor = ""; 
    e.target.style.boxShadow = ""; 
  }}
  onFocus={(e) => {
    e.target.style.borderColor = "#ff8c00"; 
    e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
  }}
  onInput={(e) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z\s]/g, '');
  }}
/>
<div className="invalid-feedback">{errors.middleName?.message}</div>

<label className={styles.formLabel}>Last Name</label><sup className="star">*</sup>
<input 
maxLength={30}
  {...register("lastName", {
    required: "Last name is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only alphabets are allowed",
    },
  })}
  name="lastName"
  type="text"
  placeholder="Enter your last name"
  className={`${styles.inputField} form-control ${errors.lastName ? "is-invalid" : ""}`}
  onInput={(e) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z\s]/g, '');
  }}
/>
<div className="invalid-feedback">{errors.lastName?.message}</div>

                        
                        
                    </div>

                    <div className="col-md-6">
					<label className={styles.formLabel}>Email</label><sup className="star">*</sup>
<input 
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/,
      message: "Only lowercase email allowed, without special characters except '@'",
    },
  })}
  name="email"
  type="email"
  placeholder="Enter your email"
  className={`${styles.inputField} form-control w-100 ${errors.email ? "is-invalid" : ""}`}
  onInput={(e) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value.toLowerCase().replace(/[^a-z0-9@.]/g, ''); // force lowercase and restrict unwanted chars
  }}
/>
<div className="invalid-feedback">{errors.email?.message}</div>



                        
<label className={styles.formLabel}>Phone Number</label><sup className="star">*</sup>
<div className="input-group">
  <div className="w-30">
    <Select
      options={types}
      placeholder="Country"
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? "#ff8c00" : base.borderColor,
          boxShadow: state.isFocused ? "0 0 5px rgba(255, 140, 0, 0.5)" : "none",
          "&:hover": {
            borderColor: "#ff8c00",
          },
        }),
      }}
      onChange={(value, { action }) => handleChange(value, action)}
      className="srcgap"
      style={{ width: "300px" }}
    />
  </div>

  <input
  {...register("phoneNumber")}
  name="phoneNumber"
  type="tel"
  inputMode="numeric"
  maxLength={10}
  value={mobile} 
  placeholder="Enter your phone number"
  className={`${styles.inputField} form-control w-50 ${errors.phoneNumber ? "is-invalid" : ""} no-spinner`}
  onChange={(e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); 
    setmobile(newValue); 
  }}
/>
</div>
<div className="invalid-feedback">{errors.phoneNumber?.message}</div>

                        <a className="verify" onClick={() => { sentOtp(); }} style={{fontSize:"18px"}} href="#">Send Verification Code</a>
                        
                        {licensetypeHidden && (
                            <div className="pt-2">
                                <label className={styles.formLabel}>License Type</label>
                                <Select options={license} value={licensetype} placeholder="License Type" className="srcgap" onChange={handleChangeLicense}  styles={{
									control: (base, state) => ({
									  ...base,
									  borderColor: state.isFocused ? "#ff8c00" : base.borderColor,
									  boxShadow: state.isFocused ? "0 0 5px rgba(255, 140, 0, 0.5)" : "none",
									  "&:hover": {
										borderColor: "#ff8c00",
									  },
									}),
								  }} />
                            </div>
                        )}

					
                    </div>
                </div>
				
<div className="text-center mt-1">
  {(disableRegister == true) ? (
    <button type="submit" disabled={disableRegister}className={`${styles["reg-btn-disable"]}`} >Register</button>
  ) : (
    <button type="submit" disabled={disableRegister} className={`${styles["reg-btn"]} `}
	>Register</button>
  )}
</div> 
            </div>
        </div>
    </div>
</div>

{/* <div className="text-center mt-1">
  {(disableRegister == true) ? (
    <button type="submit" disabled={disableRegister}className={`${styles["reg-btn-disable"]}`} >Register</button>
  ) : (
    <button type="submit" disabled={disableRegister} className={`${styles["reg-btn"]} `}
	>Register</button>
  )}
</div>  */}
				</form>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title className={`${styles["otp-verify-clr"]}`}>OTP Verification</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={(e) => handleOtpSubmit(e)}>
							<label>OTP</label><br />
							<input
  name="otp"
  type="text"
  maxLength={6}
  inputMode="numeric"
  pattern="[0-9]*"
  className="form-control"
  placeholder="Enter your OTP"
  onChange={(e) => setverify(e.target.value.replace(/\D/g, ""))}
  onKeyDown={(e) => {
    // Allow only numbers and control keys
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
    ) {
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
/>

							<div className="text-center">
								<button type="submit" className="reg-btn">Verify</button>
							</div>
						</form>
					</Modal.Body>
				</Modal>
			</div >
		</>
	);
};

export default Candidateregister;