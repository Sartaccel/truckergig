// import React from 'react';
// import styles from '../sections/events/events.module.scss'
// import Image from "next/image";

// const BlogPage = () => {
//   return (
//     <div className={styles.container}>
//       {/* Big Card Structure */}
//       <div className={styles.bigCard}>
//         {/* Truck Image with Overlay Content */}
//         <div className={styles.imageContainer}>
//           <Image 
//             src="/images/blog8.jpg"
//             alt="Truck in Logistics"
//             width={1300}
//             height={550}
//             className={styles.truckImage}
//           />
//           <div className={styles.overlay}>
//             <h2 className={styles.title}>BLOG NEWS</h2><br/><br/>
//             <p className={styles.description}>
//               Stay updated with the latest trends in the trucking and logistics industry. 
//               From fuel efficiency to automation, explore how logistics is evolving.
//             </p>
            
//           </div>
//         </div>
//       </div>
//       <h3 className={styles.noBlogs}>Oops!There is No Blog at the Moment</h3>

     
//     </div>
    
//   );
// };

// export default BlogPage;
import React from 'react';
import styles from '../sections/events/events.module.scss'
import Image from "next/image";

const BlogPage = () => {
  return (
    <div className={styles.container}>
      {/* Big Card Structure */}
      <div className={styles.bigCard}>
        {/* Truck Image with Overlay Content */}
        <div className={styles.imageContainer}>
          <Image 
            src="/images/blog8.jpg"
            alt="Truck in Logistics"
            layout="fill" 
            priority
            className={styles.truckImage}
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>BLOG NEWS</h2>
            <p className={styles.description}>
              Stay updated with the latest trends in the trucking and logistics industry. 
              From fuel efficiency to automation, explore how logistics is evolving.
            </p>
          </div>
        </div>
      </div>
      <h3 className={styles.noBlogs}>Oops! There is No Blog at the Moment</h3>
    </div>
  );
};

export default BlogPage;
