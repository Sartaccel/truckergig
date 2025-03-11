import React, { useState, useEffect } from "react";
import styles from "./Saved.module.scss";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Joblist } from "./partials/Joblist";
import { JobDescription } from "./partials/JobDescription";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import urls from "../../utilities/AppSettings";

const Saved: React.FC = (props) => {
  const initialState = {
    job: "",
  };
  const [state, setstate] = useState(initialState);
  const [jobs, setJobs] = useState([]);
  const [type, settype] = useState([]);
  const [types, settypes] = useState([]);
  const [currentJob, setcurrentJob] = useState({});
  const [searchText, setsearchText] = useState("");
  const [searchData, setsearchData] = useState([]);
  const [trailerOption, settrailerOption] = useState();
  const [driverOption, setdriverOption] = useState();
  const [trailid, settrailid] = useState();
  const [driverid, setdriverid] = useState();

  useEffect(() => {
    axios

      .get(`${urls.baseUrl}types/get?source=trailer_types`)

      .then(function (response) {
        const data = response.data.data.map((x: any) => {
          return {
            label: x.name,
            value: x.id,
          };
        });
        settype(data);
      });
  }, []);
  // Trailer Type ends

  const handleChange = (value, action, name, selectOptionSetter) => {
    const data = [];
    switch (name) {
      case "Trailer Types":
        if (action == "clear") {
          settrailid(null);
          selectOptionSetter(null);
          joblist(data, 0, driverid);
        } else {
          settrailid(value.value);
          selectOptionSetter(value);
          joblist(data, value.value, driverid);
        }
        break;
      case "Driver Types":
        if (action == "clear") {
          setdriverid(null);
          selectOptionSetter(null);
          joblist(data, trailid, 0);
        } else {
          setdriverid(value.value);
          selectOptionSetter(value);
          joblist(data, trailid, value.value);
        }
        break;
      default:
        break;
    }
  };
  // Driver Type Starts
  useEffect(() => {
    axios
 .get(`${urls.baseUrl}types/get?source=driver_types`)

      .then(function (response) {
        const data = response.data.data.map((y: any) => {
          return {
            label: y.name,
            value: y.id,
          };
        });
        settypes(data);
      });
  }, []);
  // Driver Type ends
  // Search bar starts

  const handleClicksearch = () => {
    if (!searchText) {
      toast.error("No Data Found", {
        theme: "colored", position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true,
        pauseOnHover: true, draggable: true, progress: undefined,
      });
    }
    else {
      const params = { searchSource: "jobs", searchFor: "location", searchValue: searchText };
      console.log(params);
      axios
  .post(`${urls.baseUrl}search/text`, params)

        .then(function (response) {
          const data = response.data.data;
          if (response.status === 200 && data.length) {
            setsearchData(data);
            joblist(data, 0, 0);
          } else {
            toast.error("No Data Found", {
              theme: "colored",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(function (error) {
        });
    }
  };
  // Search bar ends

  //  Job List Starts
  useEffect(() => {
    const data = [];
    joblist(data, 0, 0);
  }, []);

  const joblist = (data, trailerTypeId, driverTypeId) => {
    console.log(data)
    const params = {
      location: searchText,
      trailerTypeId: trailerTypeId,
      driverTypeId: driverTypeId,
    };
    axios

      .post(`${urls.baseUrl}jobs`, params)

      .then(function (response) {
        const data = response.data.data;
        if (response.status === 200 && Array.isArray(data) && data.length) {
          setJobs(data);
          setcurrentJob(data[0]);
        }
      });
  };
  //  Job List ends

  const handleclear = () => {
    const params = {
      searchSource: "jobs",
      searchFor: "location",
      searchValue: "",
    };

    axios
      .post(`${urls.baseUrl}jobs`, params)

      .then(function (response) {
        const data = response.data.data;
        if (response.status === 200 && Array.isArray(data) && data.length) {
          setJobs(data);
          setcurrentJob(data[0]);
        }
      });
    setsearchText("");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Search bar sections starts */}
      <div className={`${styles["searchsection"]}`}>
        <div className="row">
          <div className="col-sm-10 col-md-10 col-xl-3 col-10 srcgap ">
            <div className="form-group">
              <Select
                options={type}
                isClearable={true}
                placeholder="Trailer Types"
                value={trailerOption}
                onChange={(value, { action }) =>
                  handleChange(value, action, "Trailer Types", settrailerOption)
                }
              />
            </div>
          </div>
          <div className="col-sm-10 col-md-10 col-xl-3 col-10 srcgap">
            <div className="form-group filter-search new-filter">
              <Select
                options={types}
                isClearable={true}
                placeholder="Driver Types"
                value={driverOption}
                onChange={(value, { action }) =>
                  handleChange(value, action, "Driver Types", setdriverOption)
                }
              />
            </div>
          </div>

          <div className="col-sm-10 col-md-10 col-xl-3 col-10 srcgap">
            <div className="form-group filter-search new-filter job-search">
              <input
                type="text"
                className="form-control serchbr "
                id="search-box"
                name="q"
                color="red"
                placeholder="Search Job Location"
                value={searchText}
                onChange={(e) => setsearchText(e.target.value)}
              />
              <div onClick={handleclear}>
                <GrClose className="clearicon" />
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-10 col-xl-3 col-12 srcgap ">
            <button
              onClick={handleClicksearch}
              className={`${styles["sercbtn"]}`}
            >
              Search for Location
              <FaSearch className={`${styles["sericn"]}`} />
            </button>
          </div>
        </div>
      </div>
      {/* Search bar sections Ends */}

      {/* Job Search bar sections starts */}
      {/* Job Search bar left section starts */}
      <div>
        <div className="row scrll">
          <div className="col-sm-12 col-xl-6 col-md-12 col-12 jbtop">
            <Joblist joblistdata={jobs} setcurrentJob={setcurrentJob} />
          </div>
          {/* Job Search bar left section Ends */}
          {/* Job Search bar Right section starts */}
          <div className="col-sm-12 col-md-12 col-12 col-xl-6 rightsection">
            <JobDescription {...currentJob} />
          </div>
        </div>
        {/* Job Search bar Right section Ends */}
      </div>
      {/* Job Search bar sections Ends */}
    </>
  );
};

export default Saved;
