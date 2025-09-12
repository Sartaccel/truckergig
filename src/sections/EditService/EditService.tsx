import React, { useRef, useState, useEffect, createRef } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import { Form } from "react-bootstrap";
import styles from "../EditService/Editservice.module.scss";



const EditService: React.FC = () => {
  const router = useRouter()
  const [selectedFile, setselectedFile] = useState('');
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [dropdown, setdropdown] = useState([]);
  const [child, setchild] = useState([]);
  const [List, setList] = useState([]);
  const [showText, setShowText] = useState(false);
  const [selectedOptionChild, setselectedOptionChild] = useState(undefined);
  const [selectedExternal, setselectedExternal] = useState(undefined);
  const [title, settitle] = useState('');
  const [mydata, setmydata] = useState<any>('');
  const [fields, setfields] = useState({
    id: '',
    title: "", serviceName: '', price: '', sortOrder: '', isExternal: '',
    externalUrl: '', description: '', searchText: '', metaTitle: '', metaKey: '', shortDescription: '', discountInfo: '',
    hubspotId: ''
  });
  const [errorList, seterrorList] = useState({
    title: false, serviceName: false, price: false, sortOrder: false, isExternal: false,
    description: false
  });
  useEffect(() => {
    const search = window.location.search;
    const params = new URL(location.href).searchParams.get('serviceid');
    const Authtoken = localStorage.getItem("Authorization");
    axios.get(`${urls.clientsUrl}services/get?serviceId=${params}`,
      {
        headers: { Authorization: Authtoken }
      }).then(function (response) {
        if (response.status === 200) {
          setmydata(response.data.data.service)
          console.log("responser", response.data.data.service)
          setfields({
            ...fields,
            ["id"]: response.data.data.service.id ? response.data.data.service.id : "",
            ["serviceName"]: response.data.data.service.serviceName ? response.data.data.service.serviceName : "",
            ["title"]: response.data.data.service.title ? response.data.data.service.title : "",
            ["price"]: response.data.data.service.price ? response.data.data.service.price.toString() : "",
            ["sortOrder"]: response.data.data.service.sortOrder ? response.data.data.service.sortOrder : "",
            ["isExternal"]: response.data.data.service.isExternal ? response.data.data.service.isExternal.toString() : "",
            ["externalUrl"]: response.data.data.service.externalUrl ? response.data.data.service.externalUrl : "",
            ["description"]: response.data.data.service.description ? response.data.data.service.description : "",
            ["searchText"]: response.data.data.service.searchText ? response.data.data.service.searchText : "",
            ["metaTitle"]: response.data.data.service.metaTitle ? response.data.data.service.metaTitle : "",
            ["metaKey"]: response.data.data.service.metaKey ? response.data.data.service.metaKey : "",
            ["shortDescription"]: response.data.data.service.shortDescription ? response.data.data.service.shortDescription : "",
            ["discountInfo"]: response.data.data.service.discountInfo ? response.data.data.service.discountInfo : "",
            ["hubspotId"]: response.data.data.service.hubspotId ? response.data.data.service.hubspotId : "",
          })
        }
      });

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

  const handleChange = (e) => {
    console.log(e);
    setfields({ ...fields, [e.target.name]: e.target.value })
  }

  const onUpdate = (e) => {
  e.preventDefault();

  // Validation
  if (!fields["serviceName"]) {
    seterrorList({ ...errorList, serviceName: true });
    return;
  }
  if (!fields["title"]) {
    seterrorList({ ...errorList, title: true });
    return;
  }
  if (!fields["description"]) {
    seterrorList({ ...errorList, description: true });
    return;
  }
  if (fields["price"] === "") {
    seterrorList({ ...errorList, price: true });
    return;
  }
  if (fields["sortOrder"] === "") {
    seterrorList({ ...errorList, sortOrder: true });
    return;
  }

  // 🔹 Convert numeric values safely (avoid empty string)
  const params = {
    ...fields,
    price: fields.price ? Number(fields.price) : 0,
    sortOrder: fields.sortOrder ? Number(fields.sortOrder) : 0,
    isExternal: fields.isExternal ? Number(fields.isExternal) : 0,
  };

  // File handling
  const logoFile = document.getElementById("logoFile") as HTMLInputElement;
  const imagefile = logoFile?.files?.[0];

  const formdata = new FormData();
  if (imagefile) {
    formdata.append("LOGO_FILE", imagefile);
  }
  formdata.append("serviceInfo", JSON.stringify(params));

  const Authtoken = localStorage.getItem("Authorization");

  axios
    .post(`${urls.clientsUrl}services/edit`, formdata, {
      headers: { Authorization: Authtoken },
    })
    .then((response) => {
      if (response.data.headers.statusCode === "200") {
        toast.success("Service Updated Successfully", {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => router.push("/myservice"), 3000);
      } else {
        toast.error(response.data.headers.message || "Update failed", {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
        });
      }
    })
    .catch((error) => {
      toast.error(
        error.response?.data?.headers?.message || "Something went wrong!",
        {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
        }
      );
    });
};

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className='row p-2' style={{ marginLeft: "65px" }}>
        <div className='col'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/myservice">My Service</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Service</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={`${styles.card} container`}>
       
            <h4 className={`${styles["name"]}`}>Edit Service</h4>
          
        
       
        <Form>
          <div className="row">
            <div className="form-group col-4">
              <label className={styles.formLabel}>Service Name</label><sup className="star">*</sup>
              <input type="text" className={`form-control`}
                value={fields["serviceName"]} name="serviceName" placeholder="Service Name "
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => handleChange(e)} />
              {errorList["serviceName"] && <div className="star">Service Name is required!</div>}
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Title</label><sup className="star">*</sup>
              <input type="text" className={`form-control`}
                value={fields["title"]} name="title" placeholder="Title "
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => handleChange(e)} />
              {errorList["title"] && <div className="star">Title is required!</div>}
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Price</label><sup className="star">*</sup>
              <input type="number" className={`form-control`}
                value={fields["price"].toString()} name="price" placeholder="Price "
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Sort Order</label><sup className="star">*</sup>
              <input type="number" className={`form-control`}
                value={fields["sortOrder"]} name="sortOrder" placeholder="Sort Order"
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => handleChange(e)}
              />
              {errorList["sortOrder"] && <div className="star">Sort Order is required!</div>}
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Is External</label>
              <Select name="isExternal" options={ExternalUrl}
                value={selectedExternal}
                placeholder="Is External"
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
                // onChange={(e) => handleChange(e)}
                onChange={(value, { action }) =>
                  handleChangeCategoy(value, action, "isExternal")
                }
              />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>External Url</label>
              <input
                name="externalUrl"
                type="text" className={`form-control`}
                value={fields["externalUrl"]}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Enter external Url with http/https" />
               
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Description</label><sup className="star">*</sup>
              <textarea
                rows={2}
                name="description" className={`form-control`}
                value={fields["description"]}
                style={{ height: '38px', resize: 'none' }}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Description" />
            
              {errorList["description"] && <div className="star">Description is required!</div>}
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Search Text</label>
              <input
                name="searchText" className={`form-control`}
                value={fields["searchText"]}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Search Text" />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Meta Title</label>
              <input
                name="metaTitle" className={`form-control`}
                value={fields["metaTitle"]}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Meta Title" />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Meta Key</label>
              <input
                name="metaKey" className={`form-control`}
                value={fields["metaKey"]}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Meta Key" />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Short Description</label>
              <input name="shortDescription" className={`form-control`}
                value={fields["shortDescription"]} type="text" placeholder="service description"
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Discount Info</label>
              <input
                name="discountInfo" className={`form-control`}
                value={fields["discountInfo"]}
                type="text"
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => handleChange(e)}
                placeholder="Discount Info" />
            </div>
            <div className="form-group col-4">
              <label className={styles.formLabel}>Hubspot Id</label>
              <input
                name="hubspotId" className={`form-control`}
                value={fields["hubspotId"]}
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                placeholder="Hubspot Id" />
            </div>
            <div className="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 pt-2">
              <label className={styles.formLabel}>Existing Image: {mydata.logo}</label><br></br>
              <input id="logoFile" name="logoFile" type="file" className={`form-control`}
                value={fields["logoFile"]}
                onBlur={(e) => {
                  e.target.style.borderColor = ""; 
                  e.target.style.boxShadow = "";
                  }}
                  onFocus={(e) => {
                  e.target.style.borderColor = "#ff8c00"; 
                  e.target.style.boxShadow = "0 0 5px rgba(255, 140, 0, 0.5)"; 
                  }}
                onChange={(e) => setselectedFile(e.target.value)} />
              <label className="file-type">Maximum allowed file size: 2 MB</label><br />
              <label className="file-type">Allowed formats: .jpeg, .jpg, .png, .bmp</label>
            </div>
            <div className="form-group">
              <button className={styles.regBtn} onClick={(e) => { onUpdate(e) }}>Update</button>
            </div>
          </div>
        </Form>
        </div>
      
     
    </>
  );
};

export default EditService;