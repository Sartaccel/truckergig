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



const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(2, "Title must have atleast 2 characters").max(50, "Title should not exceed 50 characters"),
  description: yup.string().required("Description is required").min(2, "Description must have atleast 2 characters").max(50, "Description should not exceed 50 characters"),
  sortOrder: yup.string().required("Sort Order is required"),
  price: yup.string().required("Price is required"),
  serviceName: yup.string().required("Service Name is required"),
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
  const [title, settitle] = useState('');
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
      toast.error('Please select isexternal', {
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
    const Vendor = localStorage.getItem("Clientid");
    data.vendorId = Vendor;
    console.log(localStorage.getItem("Clientid"))
    data.categoryId = 1;
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
    const Authtoken = localStorage.getItem("Authorization");
    axios.post(`${urls.clientsUrl}services/add`, formdata,
      {
        headers: { Authorization: Authtoken }
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Service Added Sucessfully', {
            theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
          });
          setTimeout(() => { router.push("/myservice") }, 3000);
          
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
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
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
            <Breadcrumb.Item href="/myservice">My Service</Breadcrumb.Item>
            <Breadcrumb.Item active>New Service</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="row">
            <div className="col-12">
              <h4 className="register">New Service</h4>
              <hr className="register-hr"></hr>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-2">
                  <div className="pt-2">
                    <label>Service Name</label><sup className="star">*</sup>
                    <input {...register("serviceName")} name="serviceName" type="text" placeholder="Service Name" className={`form-control ${errors.serviceName ? "is-invalid" : ""}`}
                      value={servicename} onChange={e => setservicename(e.target.value)} />
                    <div className="invalid-feedback">{errors.serviceName?.message}</div><br />
                  </div>
                  <label>Title</label><sup className="star">*</sup>
                  <input {...register("title")} name="title" type="text" placeholder="Title" className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    value={title} onChange={e => settitle(e.target.value)} />
                  <div className="invalid-feedback">{errors.title?.message}</div><br />
                  <label>Is External</label><sup className="star">*</sup>
                  <Select  {...register("isExternal")} name="isExternal" options={ExternalUrl} value={selectedExternal} placeholder="Is External" className={` ${errors.isExternal ? "is-invalid" : ""} pt-2 `}

                    onChange={(value, { action }) =>
                      handleChangeCategoy(value, action, "external")
                    }
                  />
                  <div className="pt-3">
                    <label>Meta Title</label>
                    <input {...register("metaTitle")}
                      name="metaTitle"
                      type="text"
                      placeholder="Meta Title"
                      className={`form-control ${errors.metaTitle ? "is-invalid" : ""}`} />
                    <div className="invalid-feedback">{errors.metaTitle?.message}</div><br />
                  </div>
                  <label>Short Description</label>
                  <input {...register("shortDescription")} name="shortDescription" type="text" placeholder="Enter your service description" className={`form-control ${errors.shortDescription ? "is-invalid" : ""} pt-2 `}
                    value={description} onChange={e => setdescription(e.target.value)} />
                  <div className="invalid-feedback">{errors.shortDescription?.message}</div><br />
                  <br />



                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-2">
                  <div className="pt-2">
                    <label>Service Category</label><sup className="star">*</sup>
                    <Select options={dropdown} value={selectedOption} placeholder="Choose your Service Category" className="srcgap"

                      onChange={(value, { action }) =>
                        handleChangeCategoy(value, action, "ServiceCategory")
                      }
                    />
                  </div>
                  <div className="pt-3">
                    <label>Price</label><sup className="star">*</sup>
                    <input {...register("price")}
                      name="price"
                      type="number"
                      placeholder="Price"
                      className={`form-control ${errors.price ? "is-invalid" : ""}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div><br />
                  </div>

                  <label>External Url</label>
                  <input {...register("externalUrl")}
                    name="externalUrl"
                    type="text"
                    placeholder="Enter external  Url with http/https"
                    className={`form-control ${errors.externalUrl ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.externalUrl?.message}</div>
                  <br />
                  <label>Meta Key</label>
                  <input {...register("metaKey")}
                    name="metaKey"
                    type="text"
                    placeholder="Meta Key"
                    className={`form-control ${errors.metaKey ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.metaKey?.message}</div><br />

                  <label>Discount Info</label>
                  <input {...register("discountInfo")}
                    name="discountInfo"
                    type="text"
                    placeholder="Discount Info"
                    className={`form-control ${errors.discountInfo ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.discountInfo?.message}</div><br />


                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-2">
                  <div className="pt-2">
                    <label>Service Sub Category</label>
                    <Select options={child} value={selectedOptionChild} placeholder="Choose your Service Sub Category" className="srcgap"
                      onChange={(value, { action }) =>
                        handleChangeCategoy(value, action, "ServiceSubCategory")
                      }
                    />
                  </div>
                  <div className="pt-3">
                    <label>Sort Order</label><sup className="star">*</sup>
                    <input {...register("sortOrder")}
                      name="sortOrder"
                      type="number"
                      min="0"
                      placeholder="Sort Order"
                      className={`form-control ${errors.sortOrder ? "is-invalid" : ""}`} />
                    <div className="invalid-feedback">{errors.sortOrder?.message}</div><br />
                  </div>

                  <label>Description</label><sup className="star">*</sup>
                  <textarea {...register("description")}
                    rows={2}
                    name="description"
                    placeholder="Description"
                    className={`form-control ${errors.description ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.description?.message}</div>

                  <label>Search Text</label>
                  <input {...register("searchText")}
                    name="searchText"
                    type="text"
                    placeholder="Search Text"
                    className={`form-control ${errors.searchText ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.searchText?.message}</div><br />

                  <label>Hubspot Id</label>
                  <input {...register("hubspotId")}
                    name="hubspotId"
                    type="text"
                    placeholder="Hubspot Id"
                    className={`form-control ${errors.hubspotId ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.hubspotId?.message}</div><br />
                </div>
              </div>
            </div>
          </div>
          <div col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pt-2>
            <label>Upload your Logo</label>
            <input id="logoFile" name="logoFile" type="file"

              onChange={(e) => setselectedFile(e.target.value)}
              className={`form-control ${errors.logoFile ? "is-invalid" : ""}`} />
            <div className="invalid-feedback">{errors.logoFile?.message}</div><br />
            <label className="file-type">Maximum allowed file size: 2 MB</label><br />
            <label className="file-type">Allowed formats: .jpeg, .jpg, .png, .bmp</label>
          </div>
          {/* {title && servicename && description && selectedExternal && selectedOption && selectedFile ? */}
          <button type="submit" className=" reg-btn">Save</button>
          {/* : */}
          {/* <button type="submit" className="reg-btn-disable" disabled>Register</button> */}
          {/* } */}
        </form>

      </div >
    </>
  );
};

export default Serviceregistration;