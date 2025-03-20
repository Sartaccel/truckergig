import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import styles from './blognewsDetail.module.scss';
// import BlognewsShare from "../../components/ShareBlognews/BlognewsShare";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};


const Events: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("recentPosts")) || [];
    }
    return [];
  });
  const router = useRouter();
   
  const [eventDetail, seteventDetail] = useState({});
  const [eventid, seteventid] = useState('');
  const [eventimg, seteventimg] = useState('');
  const [eventtitle, seteventtitle] = useState('');
  const [eventdescription, seteventdescription] = useState("");
  const [eventdate, seteventdate] = useState("");

  useEffect(() => {
    const params = router.query.eventid;
    if (params) {
      axios.get(`${urls.baseUrl}/blogs/list/${router.query.eventid}`).then((response) => {
        const eventData = response.data.data;
        seteventDetail(eventData);
        seteventid(eventData.id);
        seteventimg(eventData.imageUrl);
        seteventtitle(eventData.title);
        seteventdescription(eventData.description);
        seteventdate(eventData.date);

        setRecentPosts((prevPosts) => {
          const updatedPosts = [eventData, ...prevPosts.filter(post => post.id !== eventData.id)];
          const finalPosts = updatedPosts.slice(0, 3);
          localStorage.setItem("recentPosts", JSON.stringify(finalPosts));
          return finalPosts;
        });
      });
    }
  }, [router.query.eventid]);

   const handleRecentPostClick = (post) => {
    router.push(`/blognewsdetail?eventid=${post.id}&title=${encodeURIComponent(post.title)}`);
  };
  
  console.log(recentPosts,"recentPosts")

  return (
    <>
      <div className="p-3 ml-5">
        <div className="row ml-4 pl-2">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/blognews">BlogNews</Breadcrumb.Item>
              <Breadcrumb.Item active>{eventtitle}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className={styles.blogleftsidebar}>
              <article className={styles.blogitem}>
                <div className={styles.blogitemimg}>
                  <img
                    className={styles.container}
                    src={eventimg}
                    alt="Blog Image"
                    width={950}
                    height={300}
                  />
                </div>
                <div className={styles.blogdetails}>
                  <h2>{eventtitle}</h2>
                  <p dangerouslySetInnerHTML={{ __html: eventdescription }}></p>
                </div>
              </article>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.rightSidebar}>
              <h3 className={styles.sidebarTitle}>Recent Posts</h3>
              <ul className={styles.recentPosts}>
                {recentPosts.map((post) => (
                  <li key={post.id} className={styles.recentPostItem} style={{ cursor: "pointer" }}
                  onClick={() => handleRecentPostClick(post)}
                  >
                    <img src={post.imageUrl} alt="Recent Post" width={100} height={100} />
                    <div className={styles.postContent}>
                      <h4>{post.title}</h4>
                      <p>{formatDate(post.createdOn)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    

    </>
  );

}


export default Events;
