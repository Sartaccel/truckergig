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
import styles from "../AddService/Addservice.module.scss";



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
const [selectedFile, setselectedFile] = useState<File | null>(null);

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
      <div className='row p-2' style={{ marginLeft: "65px" }}>
        <div className='col' >
          <Breadcrumb >
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/myservice">My Service</Breadcrumb.Item>
            <Breadcrumb.Item active>New Service</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={`${styles.card} container`}>
  <form onSubmit={handleSubmit(onSubmitHandler)}>
    <div className="row">
      <div className="col-12">
        <h4 className={`${styles["name"]}`}>New Service</h4>
      </div>
    </div>

    {/* Row 1 */}
    <div className="row">
      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Service Name</label><sup className="star">*</sup>
        <input {...register("serviceName")} name="serviceName" type="text" placeholder="Service Name"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.serviceName ? "is-invalid" : ""}`}
         />
        <div className="invalid-feedback">{errors.serviceName?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Service Category</label><sup className="star">*</sup>
        <Select options={dropdown} value={selectedOption} placeholder="Service Category"
          className={` ${errors.serviceCategory ? "is-invalid" : ""}`}  styles={{
                                      control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused
                                          ? "#ff8c00"
                                          : base.borderColor,
                                        boxShadow: state.isFocused
                                          ? "0 0 5px rgba(255, 140, 0, 0.5)"
                                          : "none",
                                        "&:hover": {
                                          borderColor: "#ff8c00",
                                        },
                                      }),
                                    }}
          onChange={(value, { action }) => handleChangeCategoy(value, action, "ServiceCategory")} />
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Service Sub Category</label>
        <Select options={child} value={selectedOptionChild} placeholder="Service Sub Category" className="srcgap"
         styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      borderColor: state.isFocused
                                        ? "#ff8c00"
                                        : base.borderColor,
                                      boxShadow: state.isFocused
                                        ? "0 0 5px rgba(255, 140, 0, 0.5)"
                                        : "none",
                                      "&:hover": {
                                        borderColor: "#ff8c00",
                                      },
                                    }),
                                  }}
                      onChange={(value, { action }) =>
                        handleChangeCategoy(value, action, "ServiceSubCategory")
                      }
                    />
      </div>
    </div>

    {/* Row 2 */}
    <div className="row">
      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Title</label><sup className="star">*</sup>
        <input
  {...register("title")}
  type="text"
  placeholder="Title"
  onFocus={(e) => {
    e.target.style.borderColor = "#ff8c00";
    e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
  }}
  onBlur={(e) => {
    e.target.style.borderColor = "";
    e.target.style.boxShadow = "none";
  }}
  className={`form-control ${errors.title ? "is-invalid" : ""}`}
/>
<div className="invalid-feedback">{errors.title?.message}</div>

      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Price</label><sup className="star">*</sup>
        <input {...register("price")} name="price" type="text" placeholder="Price"  maxLength={15}  
         onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value
        .replace(/[^0-9]/g, "")          
        .slice(0, 15);                    
    }}
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.price ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.price?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Sort Order</label><sup className="star">*</sup>
        <input {...register("sortOrder")} name="sortOrder" type="number" placeholder="Sort Order"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }} min="0"
          className={`form-control ${errors.sortOrder ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.sortOrder?.message}</div>
      </div>
    </div>

    {/* Row 3 */}
    <div className="row">
      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Is External</label><sup className="star">*</sup>
        <Select {...register("isExternal")} name="isExternal" options={ExternalUrl}
          value={selectedExternal} placeholder="Is External"
           styles={{
                                      control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused
                                          ? "#ff8c00"
                                          : base.borderColor,
                                        boxShadow: state.isFocused
                                          ? "0 0 5px rgba(255, 140, 0, 0.5)"
                                          : "none",
                                        "&:hover": {
                                          borderColor: "#ff8c00",
                                        },
                                      }),
                                    }}
          className={` ${errors.isExternal ? "is-invalid" : ""}`}
          onChange={(value, { action }) => handleChangeCategoy(value, action, "external")} />
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>External URL</label>
        <input {...register("externalUrl")} name="externalUrl" type="text"
          placeholder="Enter external Url with http/https"
          onFocus={(e) => {
            e.target.style.borderColor = "#ff8c00"; 
            e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
        }}
        onBlur={(e) => {
            e.target.style.borderColor = ""; 
            e.target.style.boxShadow = "none"; 
        }}
          className={`form-control ${errors.externalUrl ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.externalUrl?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Description</label><sup className="star">*</sup>
        <textarea {...register("description")} name="description" rows={2}
          placeholder="Description"  
          onFocus={(e) => {
            e.target.style.borderColor = "#ff8c00"; 
            e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
        }}
        onBlur={(e) => {
            e.target.style.borderColor = ""; 
            e.target.style.boxShadow = "none"; 
        }} style={{ height: '38px', resize: 'none' }}
          className={`form-control ${errors.description ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.description?.message}</div>
      </div>
    </div>

    {/* Row 4 */}
    <div className="row">
      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Meta Title</label>
        <input {...register("metaTitle")} name="metaTitle" type="text" placeholder="Meta Title"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.metaTitle ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.metaTitle?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Meta Key</label>
        <input {...register("metaKey")} name="metaKey" type="text" placeholder="Meta Key"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.metaKey ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.metaKey?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Search Text</label>
        <input {...register("searchText")} name="searchText" type="text" placeholder="Search Text"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.searchText ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.searchText?.message}</div>
      </div>
    </div>

    {/* Row 5 */}
    <div className="row">
      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Discount Info</label>
        <input {...register("discountInfo")} name="discountInfo" type="text" placeholder="Discount Info"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.discountInfo ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.discountInfo?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Hubspot Id</label>
        <input {...register("hubspotId")} name="hubspotId" type="text" placeholder="Hubspot Id"  
         onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value
        .replace(/[^0-9]/g, "")          
        .slice(0, 15);                    
    }}
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          className={`form-control ${errors.hubspotId ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.hubspotId?.message}</div>
      </div>

      <div className="col-md-4 pt-2 mb-3">
        <label className={styles.formLabel}>Short Description</label>
        <input {...register("shortDescription")} name="shortDescription" type="text" placeholder="Enter your service description"
         onFocus={(e) => {
          e.target.style.borderColor = "#ff8c00"; 
          e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
      }}
      onBlur={(e) => {
          e.target.style.borderColor = ""; 
          e.target.style.boxShadow = "none"; 
      }}
          value={description} onChange={e => setdescription(e.target.value)}
          className={`form-control ${errors.shortDescription ? "is-invalid" : ""}`} />
        <div className="invalid-feedback">{errors.shortDescription?.message}</div>
      </div>
    </div>

    {/* Upload Logo */}
{/* Upload Logo */}
<div className="row">
  <div className="col-md-12 pt-2 mb-3">
    <label className={styles.formLabel}>Upload your Logo</label>
    <input
      id="logoFile"
      name="logoFile"
      type="file"
      accept=".jpeg,.jpg,.png,.bmp"   // ✅ only allow these file types
      onBlur={(e) => {
        e.target.style.borderColor = "";
        e.target.style.boxShadow = "";
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#ff8c00";
        e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)";
      }}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

          // ✅ Check file type
          if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Allowed formats: .jpeg, .jpg, .png, .bmp", {
              theme: "dark",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            e.target.value = "";
            setselectedFile(null);
            return;
          }

          // ✅ Check file size (max 2MB)
          if (file.size > 2 * 1024 * 1024) {
            toast.error("File size exceeds 2 MB. Please select a smaller file.", {
              theme: "dark",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            e.target.value = "";
            setselectedFile(null);
          } else {
            setselectedFile(file);
          }
        }
      }}
      className={`form-control ${errors.logoFile ? "is-invalid" : ""}`}
    />
    <div className="invalid-feedback">{errors.logoFile?.message}</div>
    <label className="file-type">Maximum allowed file size: 2 MB</label><br />
    <label className="file-type">Allowed formats: .jpeg, .jpg, .png, .bmp</label>
  </div>
</div>

    <div className="pt-3 text-center">
      <button type="submit" className={styles.regBtn}>Save</button>
    </div>
  </form>
</div>

    </>
  );
};

export default Serviceregistration;