import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MyCards } from "../../components/MyCards/MyCards";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import styles from "./myservices.module.scss";
import Router from "next/router";
import Image from "next/image";

const Myservices: React.FC = () => {
  const router = useRouter();
  const [mycategories, setmycategories] = useState<any[]>([]);
  const [myservice, setmyservice] = useState<any>(null);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(12);
  const [role, setrole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setrole(localStorage.getItem("role"));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { serviceFilterId: 0, pageSize: 10 };
    const Authtoken = localStorage.getItem("Authorization");

    axios
      .post(`${urls.clientsUrl}services/tgiglist`, params, {
        headers: { Authorization: Authtoken || "" },
      })
      .then((response) => {
        const data =
          response?.data?.data?.content ||
          response?.data?.content ||
          [];

        if (response.status === 200 && data.length > 0) {
          setmycategories(data);
          setmyservice(data[0]);
        } else {
          setmycategories([]);
          setmyservice(null);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setmycategories([]);
        setmyservice(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query.id, router.query.ids]);

  const handleChange = (Value: number) => {
    if (Value <= 1) {
      setminValue(0);
      setmaxValue(12);
    } else {
      setminValue(Value * 12 - 12);
      setmaxValue(Value * 12);
    }
  };

  return (
    <div className="p-2" style={{ marginLeft: "65px" }}>
      <div className="row">
        <div className="col-6">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/myservice">My Service</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="col-6">
          {role !== "user" && (
            <button
              className={`${styles["card-slider-btn"]} float-right`}
              onClick={(e) => {
                e.preventDefault();
                Router.push({ pathname: "/addservice" });
              }}
            >
              Add New
            </button>
          )}
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className={styles["loader-round"]}>
          <div className={styles["spinner-round"]}></div>
        </div>
      ) : (
        <div
          className="row"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {mycategories.length > 0 ? (
            // Services Available
            <div className="col-lg-10">
              <div className="row pt-4 pb-4">
                {mycategories.slice(minValue, maxValue).map((z, k) => (
                  <MyCards key={k} items={z} setmyservice={setmyservice} />
                ))}

                <div className="row">
                  <div className="col-7 pt-4 pb-4">
                    {mycategories.length > 12 && (
                      <Pagination
                        defaultCurrent={1}
                        defaultPageSize={12}
                        onChange={handleChange}
                        total={mycategories.length}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // No Data Found
            <div className="col-lg-9">
              <div className="text-center">
                {/* <h2>No Services Found</h2> */}
                <Image
                  src="/images/services.jpg"
                  className={styles.imgFluid}
                  alt="No Services Available"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Myservices;
