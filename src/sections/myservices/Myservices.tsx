import React, { useState, useEffect, createRef, useRef } from "react";
import { useRouter } from 'next/router'
import { MyCards } from "../../components/MyCards/MyCards";
import axios from "axios";
import Filter from '../../components/Filter/Filter';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import styles from './myservices.module.scss';
import Router from "next/router";

const Myservices: React.FC = (props) => {
  const router = useRouter()
  const [mycategories, setmycategories] = useState([])
  const [myservice, setmyservice] = useState([])
  const [selectedOption, setSelectedOption] = useState();
  const [servicelist, setservicelist] = useState<any>();
  const [servicecat, setServicecat] = useState<any>();
  const [activefilter, setactivefilter] = useState("")
  const [childEle, setChildEle] = useState("");
  const [minValue, setminValue] = useState(0)
  const [maxValue, setmaxValue] = useState(12)
  const [role, setrole] = useState(null)

 

    useEffect(() => {
      if (typeof window !== "undefined") {
        setrole(localStorage.getItem("role"));
      }
    }, []);

  useEffect(() => {

    let serv = router.query.name;
    const params = { "serviceFilterId": 0, "pageSize": 10, };

    const Authtoken = localStorage.getItem("Authorization");
    axios.post(`${urls.clientsUrl}services/tgiglist`, params,

      {
        headers: { Authorization: Authtoken }
      }).then(function (response) {
        const data = response.data.data.content;
        console.log(response)
        if (response.status === 200 && data.length > 0) {
          setmycategories(data)
          setmyservice(data[0])
          //   setmyServicecat(serv ? serv : router.query.servicename);
          // } else {
          //   setmycategories([])
          //   setmyservice([])
        }
      })


  }, [router.query.id, router.query.ids])

  const handleChange = (Value) => {
    console.log(Value)
    if (Value <= 1) {
      setminValue(0);
      setmaxValue(12)
    } else {
      setminValue(Value * 12 - 12),
        console.log(minValue)
      setmaxValue(Value * 12)
      console.log(maxValue)
    }
  };


  var lang = { "serviceCategoryId": router.query.id, "serviceSubCategoryId": router.query.ids, }
  return (

    <>
      <div className="p-3">
        <div className="row">
          <div className="col-6">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/myservice">My Service</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-6 ">
          {
        role !== 'user' &&
        <button className={`${styles["card-slider-btn"]} float-right`} onClick={(e) => {
          e.preventDefault();
          Router.push({
            pathname: "/addservice",
          });
        }}>
          Add New
        </button> 
      }
          </div>
        </div>
        <div className="row">
        <div className="col-lg-1"></div>
          {
            (mycategories.length > 12) ?
              <div className="col-lg-10">
                <div className="row pt-4 pb-4">
                  {mycategories && mycategories.length > 0 && mycategories.slice(minValue, maxValue).map((z, k) => {
                    return <MyCards
                      key={k}
                      items={z}
                      setmyservice={setmyservice}
                    />
                  })}
                  <div className="row">
                    <div className="col-5">
                      <p className={`${styles["pag-items"]} `}>Items {minValue + 1} to {maxValue > mycategories.length ? mycategories.length : maxValue} of {mycategories.length} total</p>
                    </div>
                    <div className="col-7 pt-4 pb-4">
                      <Pagination
                        defaultCurrent={1}
                        defaultPageSize={12}
                        onChange={handleChange}
                        total={mycategories.length}
                      />
                    </div>

                  </div>
                </div>
              </div>
              
              :
              <div className="col-lg-9">
                <div className="row pt-4 pb-4">
                  {mycategories.map((z, k) => {
                    return <MyCards
                      role={role}
                      key={k}
                      items={z}
                      setservice={setmyservice}
                    />
                  })}
                </div>
                <div className="col-5">
                  <p className={`${styles["pag-items"]} `}>{mycategories.length} Items</p>
                </div>
              </div>
          }
          <div className="col-lg-1"></div>
        </div>
      </div>
    </>
  );
}


export default Myservices;
