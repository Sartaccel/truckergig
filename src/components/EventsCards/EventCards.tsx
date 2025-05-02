import React from "react";
import styles from './EventCards.module.scss';
import { useRouter } from 'next/router';

export const EventsCards = (props: any) => {
  const router = useRouter();

  // Function to format time into 12-hour format (AM/PM)
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  
  
  
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const showEventDetail = (e) => {
    router.push({
      pathname: "/eventdetail",
      query: { eventid: props.items.id, title: props.items.title },
    });
  };

  return (
    <div className="col-lg-4 col-sm-6 col-12 mb-3 d-flex justify-content-center">
      <div
        className="card"
        style={{
          backgroundColor:
            new Date().toDateString().split(" ").slice(1).join("-") ===
            props.items.date
              ? " "
              : "",
          cursor: "pointer", width: "100%"
        }}
        onClick={(e) => {
          showEventDetail(e);
        }}
      >
        <div className={`${styles["card-event"]}`}>
          <div className={`${styles["card-event-img"]}`}>
            <img
              className={`${styles["card-event-image"]}`}
              src={props.items.imagePath}
              alt={props.items.title}
            />
          </div>
          <div className={`${styles["card-body"]}`}>
            <div className={`${styles["card-event-text"]}`}>
              <h4 className={`${styles["card-event-text"]} pt-2`}>
                {props.items.title}
              </h4>
              <div
                className={`${styles["card-event-desc-text"]}`}
                dangerouslySetInnerHTML={{ __html: truncateText(props.items.description, 70) }}
              ></div>
            </div>
            <div className="row">
              <div className={`${styles["card-location-event"]} col-12 `}>
                <i className="bi bi-geo-alt-fill" style={{ color: "#f7941d" }}></i>{" "}
                {props.items.location}
              </div>
            </div>
            <div className="row">
              <div className={`${styles["card-calender-event"]} col-6 `}>
                <i className="bi bi-calendar-event" style={{ color: "#f7941d" }}></i>{" "}
                {/* {props.items.date} */}
                {formatDate(props.items.date)}

              </div>
              <div className={`${styles["card-clock-event"]} col-6 `}>
                <i className="bi bi-clock" style={{ color: "#f7941d" }}></i>{" "}
                {props.items.toTime
                  ? `${formatTime(props.items.fromTime)} - ${formatTime(props.items.toTime)}`
                  : formatTime(props.items.fromTime)}
              </div>
            </div>
            {/* View More Button */}
            <div className="text-center mt-3">
              <button
                className={`${styles["btn"]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showEventDetail(e);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
