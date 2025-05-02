import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Getaquote.module.scss';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router';
import GetPopup from "../../components/GetPopup/GetPopup";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";


const onChange = (value) => {
};

const schema = yup.object().shape({
    businessName: yup.string().required("Please enter Business/Individual Name").min(2).max(24),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    zipcode: yup.string().required("Zipcode is required").matches(/^\d{4,}$/, "Zipcode is not valid"),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.string().required("ContactNo is required").matches(/^\d{10}$/, "Phone number is not valid"),
    address: yup.string().required("Address is required"),

})

const Getaquote: React.FC = (props: any) => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [selectedData, setselectedData] = useState<any>();
    const [selectedCategoryData, setselectedCategoryData] = useState<any>();
    const params = { "serviceName": "", "serviceCategoryId": router.query.id, "serviceFilterId": 0 };
    useEffect(() => {

        axios.post(`${urls.baseUrl}services`, params)

            .then(function (response) {
                const data = response.data.data;
                if (response.status === 200 && data.length) {
                    var check_orders = data.filter(order => (order.id == router.query.serviceid));
                    setselectedData(check_orders[0])
                }
            })


        axios.get(`${urls.baseUrl}services/categories/list`)

            .then(function (response) {
                const data = response.data.data;
                if (response.status === 200 && data.length) {
                    var check_orders = data.filter(order => (order.id == router.query.id));
                    setselectedCategoryData(check_orders[0])
                }
            })
    }, [])

    const onSubmitHandler = (data) => {
        data.serviceId = '1';
        var params = (data);
        axios.post(`${urls.baseUrl}getaquote/add`, params)

            .then(function (response) {
                if (response.status === 200) {
                    alert("Added successfully");
                    router.push("/marketplace")
                    // setTimeout(() => { window.location.reload(); }, 3000);
                }
                else {
                    alert("error");
                }
            })
    }
    const [quote, setquote] = useState([])
    useEffect(() => {

        axios.get(`${urls.baseUrl}services/related?serviceCategoryId=${params.serviceCategoryId}`)


            .then(function (response) {
                const data = response.data.data;
                setquote(data)
            })
    }, [])

    return (

        <>
            <div className='row p-2'>
                <div className='col' style={{marginLeft:"70px"}}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/marketplace">
                            Marketplace
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{selectedCategoryData && selectedCategoryData.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container">
                <div>
                    <h1 className={`${styles["equipment-header-title"]}  `}>{selectedCategoryData && selectedCategoryData.name}</h1>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-3 pt-4">
                    <div className={`${styles["getaquote-text"]} p-1`}>
  <p>
    SELECTED <strong>SERVICE</strong>
  </p>
  <p>{selectedData?.serviceName}</p>
  {selectedData?.logoPath?.trim() && (
    <img
      className={styles["getaquote-image"]}
      src={selectedData.logoPath}
      alt={selectedData?.serviceName}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none'; // Hides broken image
      }}
    />
  )}
</div>

                        <div className={`${styles["getaquote-text"]} p-1`}>
                            <p>RELATED <strong>SERVICE</strong></p>
                            <GetPopup />
                        </div>
                    </div>

                    <div className="col-lg-7 col-9 pt-4">
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="p-1">
                                <p>BUSINESS <strong>CONTACT DETAILS</strong></p>
                            </div>
                            <div className="p-1">
                                <div>
                                    <div className={`${styles["equipment-form-text"]}`}>
                                        <label>Business/Individual Name</label><sup className={`${styles["star"]} `} >*</sup>
                                    </div>
                                    <div>
                                        <input {...register("businessName")} type="text" placeholder="Business/Individual Name"
                                            className={`form-control ${errors.businessName ? "is-invalid" : ""}`} />
                                        <div className="invalid-feedback">{errors.businessName?.message}</div>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>Country</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("country")} type="text" placeholder="Country"
                                                    className={`form-control ${errors.country ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.country?.message}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>State</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("state")} type="text" placeholder="State"
                                                    className={`form-control ${errors.state ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.state?.message}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="p-1">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>City</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("city")} type="text" placeholder="City"
                                                    className={`form-control ${errors.city ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.city?.message}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>Zipcode</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("zipcode")} type="text" placeholder="Zipcode"
                                                    className={`form-control ${errors.zipcode ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.zipcode?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>Email</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("email")} type="email" placeholder="Email"
                                                    className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.email?.message}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={`${styles["equipment-form-text"]}`}>
                                                <label>Contact No</label><sup className={`${styles["star"]} `} >*</sup>
                                            </div>
                                            <div>
                                                <input {...register("contactNo")} type="text" placeholder="Phone"
                                                    className={`form-control ${errors.contactNo ? "is-invalid" : ""}`} />
                                                <div className="invalid-feedback"> {errors.contactNo?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-1">
                                    <div className={`${styles["equipment-form-text"]} `}>
                                        <label>Address</label><sup className={`${styles["star"]} `} >*</sup>
                                    </div>
                                    <div>
                                        <textarea {...register("address")} name="address" placeholder="Address"
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`} />
                                        <div className="invalid-feedback"> {errors.address?.message}</div>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <div className={`${styles["equipment-form-text"]}`}>
                                        <label>Verify Captcha</label><sup className={`${styles["star"]} `} >*</sup>
                                    </div>
                                    <div  className={`${styles["recaptha"]}`}>
                                        <ReCAPTCHA sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV" onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="pb-5">
                                <div>
                                    <button type="submit" className={`${styles["signin-btn"]} `}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Getaquote;