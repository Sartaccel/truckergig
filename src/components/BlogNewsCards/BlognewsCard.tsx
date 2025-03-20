import React from "react";
import styles from './BlognewsCard.module.scss';
import { useRouter } from 'next/router';

export const BlognewsCard = (props: any) => {
  const router = useRouter();
  
  const showBlognewsDetail = (e) => {
    router.push({
      pathname: "/blognewsdetail",
      query: { eventid: props.items.id, title: props.items.title },
    });
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-2 mt-2  d-flex justify-content-center">
    <div className="card mx-auto" 
      style={{ 
        backgroundColor: props.items.date === new Date().toDateString().split(' ').slice(1).join('-') ? "rgb(247, 14, 14)" : "white", 
        cursor: "pointer", 
        width: "90%",
      }}
      onClick={showBlognewsDetail}
    >
        <div className={`${styles["card-event"]}`}>
          <div className={`${styles["card-event-img"]}`}>
            <img className={`${styles["card-event-image"]}`} src={props.items.imageUrl} alt={props.items.title} />
          </div>
          <div className={`${styles["card-body"]}`}>
            <div className={`${styles["card-event-text"]}`}>
              <h4 className={`${styles["card-event-text"]} pt-2`}>{props.items.title}</h4>
              <div className={`${styles["card-event-desc-text"]}`} dangerouslySetInnerHTML={{ __html: props.items.description }}></div>
              <a className={styles.readMoreBtn} onClick={showBlognewsDetail}>
    Read More
  </a>
            </div>
            {/* <div className="row">
              <div className="col-12"><i className="bi bi-geo-alt-fill" style={{ color: "#f7941d" }}></i> {props.items.location}</div>
            </div>
            <div className="row">
              <div className="col-6"><i className="bi bi-calendar-event" style={{ color: "#f7941d" }}></i> {props.items.date}</div>
              <div className={`${styles["card-clock-event"]} col-6`}>
                <i className="bi bi-clock" style={{ color: "#f7941d" }}></i> 
                {props.items.toTime ? `${props.items.fromTime} - ${props.items.toTime}` : props.items.fromTime}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
