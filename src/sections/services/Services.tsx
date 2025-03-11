import React, { useState, useEffect, createRef, useRef } from "react";
import { useRouter } from 'next/router'
import { CategoriesCards } from "../../components/CategoriesCards/CategoriesCards";
import axios from "axios";
import Filter from '../../components/Filter/Filter';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import styles from './services.module.scss';
import { lang } from "moment";

const Services: React.FC = (props) => {
  const router = useRouter()
  const [categories, setcategories] = useState([])
  const [service, setservice] = useState([])
  const [selectedOption, setSelectedOption] = useState();
  const [servicelist, setservicelist] = useState<any>();
  const [servicecat, setServicecat] = useState<any>();
  const [activefilter, setactivefilter] = useState("")
  const [childEle, setChildEle] = useState("");


  useEffect(() => {

    let serv = router.query.name;
    const params = { "serviceName": router.query.servicename ? router.query.servicename : "", "serviceCategoryId": router.query.id, "serviceSubCategoryId": router.query.ids, "serviceFilterId": 0 };
    axios.post(`${urls.baseUrl}services`, params)

      .then(function (response) {
        const data = response.data.data;
        console.log(response)
        if (response.status === 200 && data.length > 0) {
          setcategories(data)
          setservice(data[0])
          setServicecat(serv ? serv : router.query.servicename);
        } else {
          setcategories([])
          setservice([])
        }
      })

    axios.get(`${urls.baseUrl}services/categories/list`)
      .then(function (response) {
        const data = response.data.data;
        if (response.status === 200 && data.length) {
          var check_orders = data.filter(order => (order.id == router.query.id || router.query.ids));
          setservicelist(check_orders[0])
        }
      })
  }, [router.query.id, router.query.servicename, router.query.ids])
  console.log(servicelist);
  const [minValue, setminValue] = useState(0)
  const [maxValue, setmaxValue] = useState(12)
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
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/marketplace">Marketplace</Breadcrumb.Item>
              <Breadcrumb.Item active>{servicecat}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <Filter />
          </div>
          {
            (categories.length > 12) ?
              <div className="col-lg-9">
                <div className="row pt-4 pb-4">
                  {categories && categories.length > 0 && categories.slice(minValue, maxValue).map((z, k) => {
                    return <CategoriesCards
                      key={k}
                      items={z}
                      setservice={setservice}
                    />
                  })}
                  <div className="row">
                    <div className="col-5">
                      <p className={`${styles["pag-items"]} `}>Items {minValue + 1} to {maxValue > categories.length ? categories.length : maxValue} of {categories.length} total</p>
                    </div>
                    <div className="col-7 pt-4 pb-4">
                      <Pagination
                        defaultCurrent={1}
                        defaultPageSize={12}
                        onChange={handleChange}
                        total={categories.length}
                      />
                    </div>

                  </div>
                </div>
              </div>
              :
              <div className="col-lg-9">
                <div className="row pt-4 pb-4">
                  {categories.map((z, k) => {
                    return <CategoriesCards
                      key={k}
                      items={z}
                      setservice={setservice}
                    />
                  })}
                </div>
                <div className="col-5">
                  <p className={`${styles["pag-items"]} `}>{categories.length} Items</p>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  );
}


export default Services;
