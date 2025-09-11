import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { EventsCards } from "../../components/EventsCards/EventCards";
import axios from "axios";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import styles from './events.module.scss';
import urls from "../../utilities/AppSettings";
import Image from "next/image";
const Events: React.FC = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [loading, setLoading] = useState(true);  // Add this state
const pageSize = 6;

  useEffect(() => {
    setLoading(true); 
    const params = { "pageNo": 0, "searchBy": "", "pageSize": 20, "sortBy": "", "sortOrder": "" };
    axios.post(`${urls.baseUrl}event/list`, params).then((response) => {
      const data = response.data.data.content;
      if (response.status === 200 && data.length > 0) {
        setEvents(data);
        setEventData(data[0]);
      } else {
        setEvents([]);
        setEventData(null);
      }
    }).catch(error => {
      console.error("Error fetching events:", error);
    })
    .finally(() => {
      setLoading(false); // Stop loading after fetching data
    });
  }, []);

  const handleChange = (value: number) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(12);
    } else {
      setMinValue(value * 12 - 12);
      setMaxValue(value * 12);
    }
  };
    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById("card-section").offsetTop, behavior: "smooth" });
  };

    const paginatedevents = events.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  return (

    <>
   <div className={styles.container}>  {/* Added a container for spacing */}
      <div className={styles.eventHead}>
        <Image
          src="/images/e.jpg"
          alt="Truck in Logistics"
          layout="fill"
          priority={false} 
          className={styles.eventImage}
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>EVENTS</h2>
          <p className={styles.description}>
            Stay updated with the latest logistics and transportation events. <br />
            Connect, learn and grow with industry leaders!
          </p>
        </div>
      </div>

      <div id="card-section" className={`row pt-4 pb-4 ${styles.cardSection}`}>
      {loading ? (
            <div className="text-center">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : paginatedevents.length > 0 ? (
            paginatedevents.map((event: any, index: number) => (
              <EventsCards
               key={index} items={event} seteventData={setEventData}
              />
            ))
          ) : (
            <div className="text-center">
              <h2>Oops! There are No Events at the Moment</h2>
              <Image
                src="/images/no enents.jpg"
                className={styles.imgFluid}
                alt="No Events Available"
                width={500}     
                height={300}     
              />
            </div>
          )}
        </div>
             {/* Pagination Section */}
       {events.length > pageSize &&
          paginatedevents.length > 0 &&
          !loading && (
            <div className="row">
              <div className="col-5">
                <p className={styles.pagItems}>
                Event{" "}
                  {Math.min((currentPage - 1) * pageSize + 1, events.length)}{" "}
                  to {Math.min(currentPage * pageSize, events.length)} of{" "}
                  {events.length} total
                </p>
              </div>
              <div className="col-7 pt-4 pb-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  total={events.length}
                />
              </div>
            </div>
          )}
    </div>
    
    </>
  );
};

export default Events;