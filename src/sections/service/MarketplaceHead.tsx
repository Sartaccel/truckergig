import React from "react";
import styles from "./marketplace.module.scss";
import Image from "next/image";

const MarketplaceHead: React.FC = () => {

return(
    <>
<div className={`${styles["market-page"]} container pt-0`}>
      <div className={styles.marketHead}>
        <Image
          src="/images/marketplace-head.jpg"
          alt="marketPlace image"
          layout="fill"
          priority={false} 
          className={styles.marketImage}
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>MarketPlace</h2>
          <p className={styles.description}>Find and connect with top trucking services on TruckerGIG.</p>
        </div>
      </div>
      </div>
      </>
)
}

export default MarketplaceHead;