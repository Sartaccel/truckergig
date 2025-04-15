import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import urls from "../../utilities/AppSettings";
import "antd/dist/antd.css";
import styles from './blognewsDetail.module.scss';
import { FaExternalLinkAlt } from "react-icons/fa";

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
  const [eventlink,seteventlink] = useState("");

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
        seteventdate(eventData.createdOn);
        seteventlink(eventData.link);

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
  

  return (
    <>
      <div className="p-3 ml-4">
        <div className="row ml-4 pl-2">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/blognews">Blogs/News</Breadcrumb.Item>
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
  {/* <p className="text-muted mt-2 ml-3" style={{ fontSize: "15px" }}>{formatDate(eventdate)}</p> */}
                <div className={styles.blogdetails}>
                <div>
  {/* Row 1: Title */}
  <div>
    <h2 className="m-0">{eventtitle}</h2>
  </div>

  {/* Row 2: Date (left) and Icon (right) */}
  <div className="d-flex align-items-center mt-1">
    <p className="text-muted mr-2" style={{ fontSize: "15px" }}>{formatDate(eventdate)}</p>
    <div className="mt-3 ml-2" title="Click to Open Link">
      <a href={eventlink} target="_blank" rel="noopener noreferrer" style={{ color: "#ff8c00" }}>
        <FaExternalLinkAlt size={19} />
      </a>
    </div>
  </div>
</div>

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
                    {/* <img src="/images/blogStatic.jpg" alt="Recent Post" width={100} height={100} /> */}
                    <div className={styles.postContent}>
                      <h4>{post.title}</h4>
                      <p className="text-muted mt-2 ml-1">{formatDate(post.createdOn)}</p>
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
