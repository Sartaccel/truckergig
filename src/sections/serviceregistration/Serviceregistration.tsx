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
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import styles from "./Serviceregistration.module.scss";


const schema = yup.object().shape({
	// logoFile: yup.string().required(),
	// redirect: yup.string().required("Please select option"),
	// externalUrl: yup.string().min(2).max(24).required(),
	title: yup.string().required("Title is required").min(2, "Title must have atleast 2 characters").max(50, "Title should not exceed 50 characters"),
	shortDescription: yup.string().required("Description is required").min(2, "Description must have atleast 2 characters").max(250, "Title should not exceed 250 characters"),
	emailAddress: yup.string().required("Email is required").matches(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/, "Email is not valid"),
	externalUrl: yup.string().matches(/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/, "Url is not valid"),
});


const Serviceregistration: React.FC = () => {
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
	const [selectedFile, setselectedFile] = useState('');
	const [selectedOption, setSelectedOption] = useState(undefined);
	const [dropdown, setdropdown] = useState([]);
	const [child, setchild] = useState([]);
	const [List, setList] = useState([]);
	const [showText, setShowText] = useState(false);
	const [selectedOptionChild, setselectedOptionChild] = useState(undefined);
	const [selectedExternal, setselectedExternal] = useState(undefined);

	const [email, setemail] = useState('');
	const [servicename, setservicename] = useState('');
	const [description, setdescription] = useState('');

	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

	const onSubmitHandler = (data) => {
		if (!selectedOption) {
			toast.error('Please select service category', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			})
			return;
		}
		else if (child.length > 0 && selectedOptionChild.length == 0) {
			toast.error('Please select service sub category', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			})
			return;
		}
		else if (!selectedExternal) {
			toast.error('Please select redirect option', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			})
			return;
		}

		else if (!selectedFile) {
			toast.error('Please upload your logo', {
				theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
				closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
			})
			return;
		}
		else {


		}
		console.log(selectedExternal);


		console.log(data)
		data.serviceCategoryId = selectedOption.value;
		data.serviceSubCategoryId = selectedOptionChild.value ? selectedOptionChild.value : "0";
		data.isExternal = selectedExternal.value;

		let logoFile = document.getElementById("logoFile") as HTMLInputElement;

		var params = (data);
		var imagefile = logoFile.files[0];
		console.log("ImageFile", imagefile);
		const formdata = new FormData()
		const serviceInfo = JSON.stringify(params);
		console.log(serviceInfo);
		formdata.append("LOGO_FILE", imagefile);
		formdata.append("serviceInfo", serviceInfo);
		// params.logoFile = selectedFile;
		console.log(params)

		axios.post(`${urls.baseUrl}services/add`, formdata)
			.then(function (response) {
				if (response.status === 200) {
					toast.success('Service Registered Sucessfully', {
						theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
						closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
					});
					setTimeout(() => { window.location.reload(); }, 3000);

				}

				else {
					toast.error(response.data.headers.message, {
						theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
						closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
					});
				}
			})
			.catch(function (error) {

				toast.error(error.response.data.headers.message, {
					theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
					closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
				});

			});
	}

	console.log(selectedOptionChild)

	let isother = false;
	useEffect(() => {
		axios
			.get(`${urls.baseUrl}services/categories/grouped`)
			.then(function (response) {
				const dataList = (response.data.data);
				setList(dataList);
				console.log(dataList)

				const data = response.data.data.map((x: any) => {
					return {
						label: x.name,
						value: x.id,
					};
				});
				setdropdown(data);
				console.log(data)
				// settotaldata(response.data.data.children);
			});
	}, []);

	const handleChangeCategoy = (value, action, name) => {
		switch (name) {
			case "ServiceCategory":
				if (action == "clear") {
				}
				else {
					setSelectedOption(value);
					setselectedOptionChild([]);
					let childdata = []
					List.map((element: any) => {
						if (element.id == value.value) {
							childdata = element.children.map((el: any) => {
								return {
									label: el.name,
									value: el.id,
								};
							})
						}
					})
					setchild(childdata)
				}
				break;
			case "ServiceSubCategory":
				if (action == "clear") {
					setselectedOptionChild([]);
				}
				else {
					setselectedOptionChild(value);
				}
				break;
			case "external":
				if (action == "clear") {
					setselectedExternal(null);
					setShowText(false)
				}
				else {

					setselectedExternal(value);

					if (value.value === 1) {

						setShowText(true);
					}
					else {
						setShowText(false);
					}

					// else {

					// }
				}
				break;
			default:
				break;
		}
	}

	const ExternalUrl: Array<any> = [
		{ value: 1, label: "Webiste URL" },
		{ value: 0, label: "Get a Quote" },
	];
	const style = {
		color: 'red',
		fontSize: 20
	};
	return (
		<>
			<ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false}
				closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<div className='row p-2'>
				<div className='col'>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
						<Breadcrumb.Item active>New Service Registration</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</div>
			<div className="container">
				<form onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="row">
					
						<div className="col-12">
							
							
						</div>
					</div>
					<div className="row">
						<div className="col-xl-11">
							 <div className={styles.card}>
							 <h4  className={`${styles["name"]}`}>Service Registration</h4>
							<div className="row">
								<div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-2">
									<label className={styles.formLabel}>Email</label><sup className="star">*</sup>
									<input {...register("emailAddress")} name="emailAddress" type="email"
									//  onBlur={(e) => {
									// 	e.target.style.borderColor = "";
									// 	e.target.style.boxShadow = ""; 
									//   }}
									//   onFocus={(e) => {
									// 	e.target.style.borderColor = "#ff8c00"; 
									// 	e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
									//   }} 
									placeholder="Enter your email" className={`${styles.inputField} form-control ${errors.emailAddress ? "is-invalid" : ""}`} 
									value={email} onChange={ e => setemail(e.target.value)}/>
									<div className="invalid-feedback">{errors.emailAddress?.message}</div>
									<label className={styles.formLabel}>Service Name</label><sup className="star">*</sup>
									<input {...register("title")} name="title" type="text"
									//  onBlur={(e) => {
									// 	e.target.style.borderColor = ""; 
									// 	e.target.style.boxShadow = ""; 
									//   }}
									//   onFocus={(e) => {
									// 	e.target.style.borderColor = "#ff8c00"; 
									// 	e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
									//   }} 
									  placeholder="Enter the name of your service" className={`${styles.inputField} form-control ${errors.title ? "is-invalid" : ""}`} 
									value={servicename} onChange={ e => setservicename(e.target.value)}/>
									<div className="invalid-feedback">{errors.title?.message}</div>
									<label className={styles.formLabel}>Service Description</label>
            <sup className="star">*</sup>

            <input 
                {...register("shortDescription", { required: "This field is required" })} 
                name="shortDescription" 
                type="text"
                placeholder="Enter your service description"
                className={`${styles.inputField} form-control ${errors.shortDescription ? "is-invalid" : ""}`}  
                value={description} 
                onChange={(e) => setdescription(e.target.value)}
            />

            <div className="invalid-feedback">{errors.shortDescription?.message}</div>
									{/* <div className="pb-3"></div> */}
									<label className={styles.formLabel}>Company Website URL</label><sup className="star">*</sup>
									<Select {...register("redirect")} name="redirect" options={ExternalUrl} placeholder="Company Website URL" className={` ${errors.redirect ? "is-invalid" : ""} pt-2 `}
										value={selectedExternal}
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
										onChange={(value, { action }) =>
											handleChangeCategoy(value, action, "external")
										}
									/>
									


									{showText ? (
										<div style={{marginBottom:"3px"}}>

											<label className={styles.formLabel}>Website URL</label><sup className="star" >*</sup>
											<input {...register("externalUrl")}
												name="externalUrl"
												type="text"
												// onBlur={(e) => {
												// 	e.target.style.borderColor = ""; 
												// 	e.target.style.boxShadow = ""; 
												//   }}
												//   onFocus={(e) => {
												// 	e.target.style.borderColor = "#ff8c00"; 
												// 	e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
												//   }}
												placeholder="Enter external  Url with http/https"
												
												className={`${styles.inputField} form-control ${errors.externalUrl ? "is-invalid" : ""} `} />
											<div className="invalid-feedback">{errors.externalUrl?.message}</div><br />
										</div>
									) : null}
								</div>

								{/* <div className="pt-2">
                                    <label>License Type</label>
                                    <Select options={license} value={licensetype} placeholder="License Type" className="srcgap"
                                        onChange={handleChangeLicense}
                                    />
                                </div> */}
								<div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-2">
									
										<label className={styles.formLabel}>Service Category</label><sup className="star">*</sup>
										<Select options={dropdown} value={selectedOption} placeholder="Choose your Service Category" className="srcgap"
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

											onChange={(value, { action }) =>
												handleChangeCategoy(value, action, "ServiceCategory")
											}
										/>
									
									
										<label className={styles.formLabel} style={{marginTop:"1px"}}>Service Sub Category</label>
										<Select options={child} value={selectedOptionChild} placeholder="Choose your Service Sub Category" className="srcgap"
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
											onChange={(value, { action }) =>
												handleChangeCategoy(value, action, "ServiceSubCategory")
											}
										/>
									
									
									<label className={styles.formLabel} style={{marginTop:"1px"}}>Upload your Logo</label><sup className="star">*</sup>
									<input id="logoFile" name="logoFile" type="file"
									 onBlur={(e) => {
										e.target.style.borderColor = ""; 
										e.target.style.boxShadow = "";
									  }}
									  onFocus={(e) => {
										e.target.style.borderColor = "#ff8c00"; 
										e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
									  }}

										onChange={(e) => setselectedFile(e.target.value)}
										className={`form-control ${errors.logoFile ? "is-invalid" : ""}`} />
									<div className="invalid-feedback ">{errors.logoFile?.message}</div>
									<label className="file-type " style={{marginTop:"6px"}}>Maximum allowed file size: 2 MB</label><br />
									<label className="file-type">Allowed formats: .jpeg, .jpg, .png, .bmp</label>

								</div>
							
							</div>
							<div className="text-center mt-1">
							{email && servicename && description && selectedExternal && selectedOption && selectedFile?
						<button type="submit" className={`${styles["reg-btn"]} `}>Register</button>
						:
						<button type="submit" className={`${styles["reg-btn-disable"]}`} disabled>Register</button>}
						</div>
						</div>
					</div>
					{/* <button type="submit" className="reg-btn">Register</button> */}
					{/* {email && servicename && description && selectedExternal && selectedOption && selectedFile?
						<button type="submit" className={`${styles["reg-btn"]} `}>Register</button>
						:
						<button type="submit" className={`${styles["reg-btn-disable"]}`} disabled>Register</button>} */}
						</div>
				</form>

			</div >
		</>
	);
};

export default Serviceregistration;


