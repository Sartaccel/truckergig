import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import { Pagination, Spin } from "antd";
import styles from './blognews.module.scss';
import { BlognewsCard } from "../../components/BlogNewsCards/BlognewsCard";
import Image from "next/image";

const Blognews: React.FC = () => {
  const router = useRouter();
  const [blognews, setblognews] = useState([]);
  const [blognewsData, setblognewsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loader state
  const pageSize = 6; // Fixed page size

  useEffect(() => {
    const fetchblognews = async () => {
      setLoading(true); // Start loading
      try {
        const params = { pageNo: 0, searchBy: "", pageSize: 20, sortBy: "", sortOrder: "" };
        const response = await axios.post(`${urls.baseUrl}blogs/list`, params);
        const data = response.data?.data?.content || [];

        if (response.status === 200 && data.length > 0) {
          setblognews(data);
          setblognewsData(data[0]);
        } else {
          setblognews([]);
          setblognewsData(null);
        }
      } catch (error) {
        console.error("Error fetching blognews:", error);
        setblognews([]);
        setblognewsData(null);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchblognews();
  }, []);

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById("card-section").offsetTop, behavior: "smooth" });
  };

  // Slice data for pagination
  const paginatedblognews = blognews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className={styles.container}>
        {/* Big Card Section */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/12.jpg"
            alt="Truck in Logistics"
            layout="fill"
            priority
            className={styles.truckImage}
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>BLOG / NEWS</h2>
            <p className={styles.description}>
              Get the latest insights, trends, and updates in logistics <br />
              and technology. Stay informed with expert articles and news!
            </p>
          </div>
        </div>

        {/* Show message if no blogs/news are available */}
        {blognews.length === 0 && (
          <h3 className={styles.noBlogs}>
            Oops! There is No Blog / News at the Moment
          </h3>
        )}

        {/* Blog Cards Section */}
        <div id="card-section" className="row pt-4 pb-4">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : paginatedblognews.length > 0 ? (
            paginatedblognews.map((event: any, index: number) => (
              <BlognewsCard
                key={index}
                items={event}
                setblognewsData={setblognewsData}
              />
            ))
          ) : (
            <div className="text-center">
              <h2>Oops! There are No Blogs/News at the Moment</h2>
              <img
                src="/images/no_enents.jpg"
                className={styles.imgFluid}
                alt="No Events Available"
              />
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {blognews.length > pageSize &&
          paginatedblognews.length > 0 &&
          !loading && (
            <div className="row">
              <div className="col-5">
                <p className={styles.pagItems}>
                  Items{" "}
                  {Math.min((currentPage - 1) * pageSize + 1, blognews.length)}{" "}
                  to {Math.min(currentPage * pageSize, blognews.length)} of{" "}
                  {blognews.length} total
                </p>
              </div>
              <div className="col-7 pt-4 pb-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  total={blognews.length}
                />
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Blognews;
