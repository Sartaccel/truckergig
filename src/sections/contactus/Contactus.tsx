import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setInfo } from "../../redux/action/main";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Contactus.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contactusSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(24, "Name must be at most 24 characters")
    .matches(/^[A-Za-z]+$/, "Name can only contain letters"),
    emailAddress: yup
    .string()
    .required("Email is required")
    .matches(
     /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/,
      "Only lowercase letters, numbers, and one @ are allowed"
    ), 
    phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits"),
    message: yup
    .string()
    .required("Message is required")
    .test(
      "no-only-spaces",
      "Message cannot be empty spaces",
      (value) => value && value.trim().length > 0
    ),});

const Contactus: React.FC = () => {
  const dispatch = useDispatch();
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  interface MyFormValues {
    name: string;
    phone: string;
    emailAddress: string;
    message: string;
  }
  
 

  return (
    <div className={styles.contactContainer}>
      {/* Left Side - Contact Details */}
      <div className={styles.contactRight}>
        <h2>Send Us a Message</h2>
        <Formik
       j   initialValues={{
            name: "",
            phone: "",
            emailAddress: "",
            message: "",
          }}
          validationSchema={contactusSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const recaptchaValue = recaptchaRef.current?.getValue();
            if (!recaptchaValue) {
              // alert("Please complete the CAPTCHA.");
               toast.error("Please complete the CAPTCHA.", {
                      theme: "dark",
                      position: "top-right",
                      autoClose: 5000,
                    });
              setSubmitting(false);
              return;
            }

            dispatch(setInfo(values));
            recaptchaRef.current?.reset();
            resetForm();
            setSubmitting(false);
            // alert("Message sent successfully!");
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
             <Field name="name" placeholder="Your Name*" className={styles.inputField} />
{errors.name && touched.name && <div className={styles.error}>{errors.name}</div>}


              <Field name="emailAddress" placeholder="Your Email*" className={styles.inputField} />
              {errors.emailAddress && touched.emailAddress && <div className={styles.error}>{errors.emailAddress}</div>}

              <Field name="phone" placeholder="Your Phone*" className={styles.inputField} />
              {errors.phone && touched.phone && <div className={styles.error}>{errors.phone}</div>}

              <Field as="textarea" name="message" placeholder="Your Message*" className={styles.textareaField} />
              {errors.message && touched.message && <div className={styles.error}>{errors.message}</div>}

              <div className={styles.recaptchaContainer}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Le8AhgeAAAAAKBVRq6d4hPNor3IGI0rRwfzPAZV"
                />
              </div>

              <button type="submit" className={styles.submitBtn}>SEND</button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Right Side - Contact Form */}
      <div className={styles.contactLeft}>
        <h2>Contact Information</h2>
        <p><i className="bx bx-map"></i> 11555 Medlock Bridge Road, Suite 100, <br /> Johns Creek, GA-30097</p>
        <p><i className="bx bx-phone"></i> (833) 353-7773</p>
        <p><i className="bx bx-envelope"></i> contactus@truckergig.com</p>
        <iframe
          className={styles.mapFrame}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.2902989781996!2d-84.1728210853004!3d34.062071824660514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5992725955555%3A0x35ee53621f787334!2s11555%20Medlock%20Bridge%20Rd%20Suite%20100%2C%20Johns%20Creek%2C%20GA%2030097%2C%20USA!5e0!3m2!1sen!2sin!4v1658471178075!5m2!1sen!2sin"
          width="100%"
          height="200"
          loading="lazy"
        />
      </div>
    
    </div>
  );
};

export default Contactus;
