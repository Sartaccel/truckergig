import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import styles from './events.module.scss';
import Popup from "reactjs-popup";
import EventShare from "../../components/ShareEvent/EventShare";
import { Spin } from "antd";

const Events: React.FC = (props) => {
  const router = useRouter()
  const [eventDetail, seteventDetail] = useState('')
  const [eventid, seteventid] = useState('')
  const [eventimg, seteventimg] = useState('')
  const [eventtitle, seteventtitle] = useState('')
  const [eventdescription, seteventdescription] = useState("")
  const [eventlocation, seteventlocation] = useState('')
  const [eventfromtime, seteventfromtime] = useState("")
  const [eventtotime, seteventtotime] = useState("")
  const [eventdate, seteventdate] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const shareUrl = linkText;
  var linkText, eventId, titleText;
  // linkText= `http://localhost:5000/eventdetail?eventid=${eventid}&title=${eventtitle}`
  linkText = `https://dev.truckergig.com/eventdetail?eventid=${eventid}&title=${eventtitle}`

  useEffect(() => {
    const search = window.location.search;
    const params = new URL(location.href).searchParams.get('eventid');
    console.log(params);
    axios.get(`${urls.baseUrl}event/details?eventId=${params}`).then(function (response) {
      seteventDetail(response.data.data)
      console.log(eventDetail)
      {
        response.data.data.forEach(element => {
          seteventid(element.id)
          seteventimg(element.imagePath);
          seteventtitle(element.title);
          seteventdescription(element.description);
          seteventlocation(element.location);
          seteventdate(element.date);
          seteventfromtime(element.fromTime);
          seteventtotime(element.toTime);
        })
      };
    })
  }, [])

  return (
    <>
      <div className="p-3" style={{marginLeft:"55px"}}>
        <div className="row">
          <div className="col" >
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/events">Event</Breadcrumb.Item>
              <Breadcrumb.Item active>{eventtitle}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className={`${styles["image-container"]}`}>
  {!imageLoaded && (
    <div className={`${styles["loader"]}`}>
      <Spin size="large" />
    </div>
  )}
  <img
    className={`${styles["event-detail-img"]}`}
    src={eventimg}
    alt={eventtitle}
    onLoad={() => setImageLoaded(true)}
    onError={() => setImageLoaded(true)}
    style={{ display: imageLoaded ? "block" : "none" }}
  />
</div>
        </div>
        <div className={`${styles["event-detail-text"]} row pt-3`}>
          <div className="col-6"><i className="bi bi-geo-alt-fill" style={{ color: "#f7941d" }} ></i> {eventlocation}</div>
          <div className={`${styles["event-clock-detail"]} col-6`}><i className="bi bi-calendar-event" style={{ color: "#f7941d" }}></i> {eventdate}</div>
          <div className="col-6">
            <Popup
              trigger={
                <i className="bi bi-share" style={{ color: "#f7941d", fontStyle: "normal", marginLeft :"-10px", cursor:"pointer" }}>
  <span style={{ color: "#555", marginLeft:"8px" }}> Share </span>
</i>

              }
              contentStyle={{
                padding: "20px 0",
                marginLeft: "122px",
                background: "#ffff",
                textAlign: "center",
                border: "1px solid rgba(0,0,0,.2)",
                borderRadius: "6px",
                boxShadow: "0 5px 15px rgb(0 0 0 / 50%)"
              }}
            >
              <div>
                <EventShare
                  text="Check out this website"
                  url={linkText}
                />
              </div>
            </Popup>
          </div>
          {(eventtotime === "") ?
            <div className={`${styles["event-clock-detail"]} col-6`}><i className="bi bi-clock" style={{ color: "#f7941d" }}></i> {eventfromtime}</div>
            : <div className={`${styles["event-clock-detail"]} col-6`}><i className="bi bi-clock" style={{ color: "#f7941d" }}></i> {eventfromtime} - {eventtotime}</div>
          }
          <div className={`${styles["event-desc-title"]} col-12`}><p>{eventtitle}</p></div>
          <div className="col-12" style={{}} dangerouslySetInnerHTML={{ __html: eventdescription }}></div>
        </div>
      </div>
    </>
  );
}


export default Events;
