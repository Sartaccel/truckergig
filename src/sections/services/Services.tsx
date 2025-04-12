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
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   setLoading(true);
  //   let serv = router.query.name;
  //   const params = { "serviceName": router.query.servicename ? router.query.servicename : "", "serviceCategoryId": router.query.id, "serviceSubCategoryId": router.query.ids, "serviceFilterId": 0 };
  //   axios.post(`${urls.baseUrl}services`, params)

  //     .then(function (response) {
  //       const data = response.data.data;
  //       console.log(response)
  //       if (response.status === 200 && data.length > 0) {
  //         setcategories(data)
  //         setservice(data[0])
  //         setServicecat(serv ? serv : router.query.servicename);
  //       } else {
  //         setcategories([])
  //         setservice([])
  //       }
  //     })
  //     .catch((err) => {
  //       setcategories([]);
  //       setservice([]);
  //       console.error("Service fetch failed", err);
  //     })
  //     .finally(() => {
  //       setLoading(false); // hide spinner
  //     });

  //   axios.get(`${urls.baseUrl}services/categories/list`)
  //     .then(function (response) {
  //       const data = response.data.data;
  //       if (response.status === 200 && data.length) {
  //         var check_orders = data.filter(order => (order.id == router.query.id || router.query.ids));
  //         setservicelist(check_orders[0])
  //       }
  //     })
  // }, [router.query.id, router.query.servicename, router.query.ids])

  useEffect(() => {
    if (!router.isReady) return;

    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      const serv = router.query.name;
      const params = {
        serviceName: router.query.servicename || '',
        serviceCategoryId: router.query.id,
        serviceSubCategoryId: router.query.ids,
        serviceFilterId: 0,
      };

      // POST request
      axios.post(`${urls.baseUrl}services`, params, {
        signal: controller.signal,
      })
        .then((response) => {
          const data = response.data.data;
          if (response.status === 200 && data.length > 0) {
            setcategories(data);
            setservice(data[0]);
            setServicecat(serv ? String(serv) : String(router.query.servicename));
          } else {
            setcategories([]);
            setservice(null);
          }
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.error('Service fetch failed', err);
            setcategories([]);
            setservice(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });

      // GET request for categories list
      axios.get(`${urls.baseUrl}services/categories/list`, {
        signal: controller.signal,
      })
        .then((response) => {
          const data = response.data.data;
          if (response.status === 200 && data.length) {
            const check_orders = data.filter(order => (
              order.id == router.query.id || order.id == router.query.ids
            ));
            setservicelist(check_orders[0]);
          }
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.error('Category list fetch failed', err);
          }
        });

    }, 150); // Debounce delay

    // Cleanup
    return () => {
      clearTimeout(delayDebounce);
      controller.abort(); // cancel previous requests
    };
  }, [router.query.id, router.query.servicename, router.query.ids, router.query.name]);
  
  console.log(servicelist);
  const [minValue, setminValue] = useState(0)
  const [maxValue, setmaxValue] = useState(9)
  const handleChange = (Value) => {
    console.log(Value)
    if (Value <= 1) {
      setminValue(0);
      setmaxValue(9)
    } else {
      setminValue(Value * 9 - 9),
        console.log(minValue)
      setmaxValue(Value * 9)
      console.log(maxValue)
    }
  };


  var lang = { "serviceCategoryId": router.query.id, "serviceSubCategoryId": router.query.ids, }
  return (

    <>
  <div className="p-3 d-flex justify-content-center">
    <div className={`container ${styles.customContainer}`}>
      <div className="row">
        <div className="col-12">
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

        <div className="col-lg-9">
          {loading ? (
            <div className="text-center w-100 py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {categories.length > 9 ? (
                <>
                  <div className="row pt-4 pb-4">
                    {categories.slice(minValue, maxValue).map((z, k) => (
                      <CategoriesCards key={k} items={z} setservice={setservice} />
                    ))}
                    <div className="row">
                      <div className="col-5">
                        <p className={`${styles["pag-items"]}`}>
                          Items {minValue + 1} to {Math.min(maxValue, categories.length)} of {categories.length} total
                        </p>
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
                </>
              ) : (
                <>
                  <div className="row pt-4 pb-4">
                    {categories.map((z, k) => (
                      <CategoriesCards key={k} items={z} setservice={setservice} />
                    ))}
                  </div>
                  <div className="col-5">
                    <p className={`${styles["pag-items"]}`}>{categories.length} Items</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</>

  );
}


export default Services;
