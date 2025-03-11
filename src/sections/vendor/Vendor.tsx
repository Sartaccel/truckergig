import React, { useState, useEffect, createRef, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Vendor.module.scss";
import { connect, useDispatch } from "react-redux";
import { setVendorInfo } from "../../redux/action/main";
import { Formik, Form, Field, useField } from "formik";
import { Label, Input } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import urls from "../../utilities/AppSettings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";


const onCaptchaChange = (value) => {
  console.log("Captcha value:", value);
};
const vendorSchema = yup.object().shape({
  legalName: yup.string().required("This is a required field").min(2).max(24),
  contactFirstName: yup.string().required("This is a required field"),
  emailAddress: yup.string().required("This is a required field").max(50),
  telephone: yup.string().required("This is required field").matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
  // message: yup.string().required("This is a required field"),
  // productList: yup.string().required("This is required field")
});

interface MyFormValues {
  legalName: string;
  fein: string;
  dbNumber: string;
  contactFirstName: string;
  contactLastName: string;
  telephone: string;
  emailAddress: string;
  referenceCategory: string;
  address: string;
  websiteUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  productList: string;
  otherProductList: string;
  message: string;
  submit: string;

}

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid Email Address";
  }
  return error;
}


// function validatePhone(value) {
//   let error;
//   if (value === undefined || value.toString().length != 10 ||
//     value.toString().length < 0 || value.substring(0, 1) == "0"
//     || value.substring(0, 1) == "-"
//     || value.indexOf('.') !== -1) {
//     error = "Invalid Phone Number";
//   }
//   return error;
// }


const Vendor: React.FC = () => {
  const [selectedCountry, setselectedCountry] = useState(undefined);
  const [selectedProduct, setselectedProduct] = useState(undefined);
  const [types, settypes] = useState([]);
  const [country, setcountry] = useState();
  const [showText, setShowText] = useState(false);
  const [selectedProductValidation, setselectedProductValidation] = useState(false);

  const dispatch = useDispatch();
  const initialValues: MyFormValues = {
    legalName: "",
    fein: "",
    dbNumber: "",
    contactFirstName: "",
    contactLastName: "",
    telephone: "",
    emailAddress: "",
    referenceCategory: "",
    address: "",
    websiteUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    facebookUrl: "",
    productList: "",
    otherProductList: "",
    message: "",
    submit: "",

  };
  let isother = false;

  useEffect(() => {
    axios.get(`${urls.baseUrl}summary`)
      .then(function (response) {
        const data = response.data.data.countries.map((x: any) => {
          return {
            label: x.dialingCode + " " + x.countryCode,
            value: x.dialingCode,
          };
        });
        settypes(data);
      });
  }, []);

  const newService = (e) => {
    e.preventDefault();
    router.push('/serviceregistration');
  }


  const handleDropDownChange = (value, action, name) => {
    switch (name) {
      case "phonecode":
        if (action == "clear") {
          setselectedCountry(null);
        } else {
          setselectedCountry(value);

        }
        break;
      case "product":
        if (action == "clear") {
          setselectedProduct(null);
          setShowText(false)
        }
        else {
          isother = false;
          // if (value.value == null) {
          //   toast.error("Please select a country");
          // }
          if (value.value === "Others") {
            isother = true;
            setShowText(true)
          }
          else if (value.value === "TruckTax" || "Accessories" || "APIIntegrations" || "FleetManagement" || "Lodging" || "TelematicsELD" || "TMS" || "TrailerLeasing" || "WMS") {
            if (isother == false) {
              setShowText(false)
            }
          }
          setselectedProduct(value);
          setselectedProductValidation(false)
        }
        break;
      default:
        break;
    }
  };

  const productListDrop: Array<any> = [
    { value: "Carrier", label: "Carrier" },
    { value: "TruckTax", label: "Truck Tax" },
    { value: "Accessories", label: "Accessories" },
    { value: "APIIntegrations", label: "API & Integrations" },
    { value: "FleetManagement", label: "Fleet Management" },
    { value: "Lodging", label: "Lodging" },
    { value: "TelematicsELD", label: "Telematics & ELD" },
    { value: "TMS", label: "TMS" },
    { value: "TrailerLeasing", label: "Trailer Leasing" },
    { value: "WMS", label: "WMS" },
    { value: "Others", label: "Others" },
  ];

  return (
    <>
      <div className="row p-2">
        <div className="col">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Vendor Registration</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container pt-3 pb-3">
        <Formik
          initialValues={initialValues}
          validationSchema={vendorSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (!selectedCountry) {
              console.error("please select country")
              values.telephone = "+1" + " " + values.telephone;
            }
            else {
              values.telephone = selectedCountry.value + " " + values.telephone;
            }
            if (!selectedProduct) {
              setselectedProductValidation(true)
              const arr = (values.telephone).split(" ");
              console.log(arr);
              values.telephone = arr[1];
              console.log(values.telephone);
            } else {
              setselectedProductValidation(false)
            }
            values.productList = (selectedProduct.value);
            console.log(values.productList);
            // if (values.productList == null) {
            //   toast.error("Please Select a product");
            // }
            resetForm({ values: null });
            setTimeout(() => {
              dispatch(setVendorInfo(values));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          dirty,
          }) => (
            <div className="heading">
              <h3>Vendor Registration</h3>
              <h6><b>Already registered? Register your service <a href="/#" className="verify" onClick={(e) => { newService(e) }}>here</a></b></h6>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="validationServer01"
                    className={`${styles["form-label"]} `}
                  >
                    Company Name
                  </label>
                  <span className={`${styles["required-color"]} `}> * </span>

                  <Field


                    name="legalName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.legalName}
                    placeholder="Legal Name"
                    id="name"
                    title="Name"
                    className="form-control "
                    type="text"
                  />
                  {errors.legalName && touched.legalName ? (
                    <div className={`${styles["errorMsgColour"]} `}>
                      {errors.legalName}
                    </div>
                  ) : null}
                </div>
                <div
                  className={`${styles["product-dropdown"]} col-12 col-sm-6 mb-3`}
                >
                  <label
                    htmlFor="drop-down"
                    className={`${styles["form-label"]} `}
                  >
                    Product categories that you want to list
                  </label>
                  <span className={`${styles["required-color"]} `}> * </span>

                  <br />
                  <Select
                    className={`${styles["drop-down-style"]} `}
                    // placeholder="All Categories"
                    value={selectedProduct}
                    onChange={(value, { action }) =>
                      handleDropDownChange(value, action, "product")
                    }
                    options={productListDrop}
                    isClearable={true}
                  />
                  {selectedProductValidation && <div className={`${styles["errorMsgColour"]} `}>
                    {"Please select a product"}
                  </div>}

                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>FEIN</label>

                    <Field
                      name="fein"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fein}
                      placeholder="FEIN"
                      id="name"
                      titl
                      e="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.fein && touched.fein ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.fein}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>
                      DB Number
                      {/* {"DB Number"} */}
                    </label>

                    <Field
                      name="dbNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dbNumber}
                      placeholder="DB Number"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.dbNumber && touched.dbNumber ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.dbNumber}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>
                      Primary Contact - First Name
                    </label>
                    <span className={`${styles["required-color"]} `}> * </span>

                    <Field
                      name="contactFirstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contactFirstName}
                      placeholder="First Name"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.contactFirstName && touched.contactFirstName ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.contactFirstName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>
                      Primary Contact - Last Name
                    </label>

                    <Field
                      name="contactLastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contactLastName}
                      placeholder="Last Name"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.contactLastName && touched.contactLastName ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.contactLastName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>
                      Phone Number
                    </label>
                    <span className={`${styles["required-color"]} `}> * </span>
                    <div className="input-group">
                      <Select
                        className={`${styles["phone-drop-down-style"]} `}
                        options={types}
                        isClearable={true}
                        placeholder="Country"
                        value={country}
                        onChange={(value, { action }) =>
                          handleDropDownChange(value, action, "phonecode")
                        }

                      />
                      <Field name="telephone" onChange={handleChange} onBlur={handleBlur} value={values.telephone} placeholder="Phone"
                        id="name" title="Name" className={`${styles["phone-style"]} form-control`} type="text" maxlength={10} />
                      {errors.telephone && touched.telephone ? (
                        <div className={`${styles["errorMsgColour"]} `}>
                          {errors.telephone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className={`${styles["form-label"]} `}>Email</label>
                    <span className={`${styles["required-color"]} `}> * </span>

                    <Field
                      name="emailAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailAddress}
                      placeholder="Email Address"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                      validate={validateEmail}
                    />
                    {errors.emailAddress && touched.emailAddress ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.emailAddress}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <label className={`${styles["form-label"]} `}>
                    Billing Address
                  </label>

                  <Field
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Billing Address"
                    id="name"
                    title="Name"
                    className="form-control "
                    type="text"
                  />
                  {errors.address && touched.address ? (
                    <div className={`${styles["errorMsgColour"]} `}>
                      {errors.address}
                    </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className={`${styles["form-label"]} `}>
                    Website URL
                  </label>
                  <Field
                    name="websiteUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.websiteUrl}
                    placeholder="Website URL"
                    id="name"
                    title="Name"
                    className="form-control "
                    type="text"
                  />
                  {errors.websiteUrl && touched.websiteUrl ? (
                    <div className={`${styles["errorMsgColour"]} `}>
                      {errors.websiteUrl}
                    </div>
                  ) : null}
                </div>
                <div className="row mb-3">
                  <div className="col-6 col-sm-6">
                    <label className={`${styles["form-label"]} `}>
                      Instagram URL
                    </label>

                    <Field
                      name="instagramUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.instagramUrl}
                      placeholder="Instagram URL"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.instagramUrl && touched.instagramUrl ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.twitterUrl}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label className={`${styles["form-label"]} `}>
                      Twitter URL
                    </label>
                    <Field
                      name="twitterUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.twitterUrl}
                      placeholder="Twitter URL"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.twitterUrl && touched.twitterUrl ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.twitterUrl}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className={`${styles["form-label"]} `}>
                      Facebook URL
                    </label>

                    <Field
                      name="facebookUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facebookUrl}
                      placeholder="Facebook URL"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.facebookUrl && touched.facebookUrl ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.facebookUrl}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label className={`${styles["form-label"]} `}>
                      LinkedIn URL
                    </label>
                    <Field
                      name="linkedinUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.linkedinUrl}
                      placeholder="LinkedIn URL"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                    {errors.linkedinUrl && touched.linkedinUrl ? (
                      <div className={`${styles["errorMsgColour"]} `}>
                        {errors.linkedinUrl}
                      </div>
                    ) : null}
                  </div>
                </div>
                {showText ? (
                  // {True ? (
                  <div className="mb-3">
                    <label className={`${styles["form-label"]} `}>
                      Other product(s) that you want to list
                    </label>
                    <span className={`${styles["required-color"]} `}> * </span>

                    <Field
                      name="otherProductList"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.otherProductList}
                      placeholder="Other product that you want to list"
                      id="name"
                      title="Name"
                      className="form-control "
                      type="text"
                    />
                  </div>
                  // )
                  // : False ? ("") : ("")}
                ) : null}

                <div className="mb-3">
                  <label className={`${styles["form-label"]} `}>Message</label>
                  {/* <span className={`${styles["required-color"]} `}> * </span> */}

                  <Field
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    placeholder="Message if any"
                    id="name"
                    title="Name"
                    className="form-control "
                    type="text"
                  />
                  {/* {errors.message && touched.message ? (
                    <div className={`${styles["errorMsgColour"]} `}>
                      {errors.message}
                    </div>
                  ) : null} */}
                </div>
                <div className="mb-3">
                  <label className={`${styles["form-label"]} `}>
                    How did you hear about us?
                  </label>

                  <Field
                    name="referenceCategory"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.referenceCategory}
                    placeholder="How did you hear about us?"
                    id="name"
                    title="Name"
                    className="form-control "
                    type="text"
                  />
                  {errors.referenceCategory && touched.referenceCategory ? (
                    <div className={`${styles["errorMsgColour"]} `}>
                      {errors.referenceCategory}
                    </div>
                  ) : null}
                </div>
                <br />
                <ReCAPTCHA
                  sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV"
                  onChange={onCaptchaChange}
                />
                <br />

                <p>{errors.submit && "Please complete all required field."}</p>
                <div className="col-12 pl-0">
                  <button type="submit"
                   className={!(dirty && isValid) ? "reg-btn-disable" : "reg-btn"}
                   disabled={!(dirty && isValid)}>
                    Submit Form
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Vendor;