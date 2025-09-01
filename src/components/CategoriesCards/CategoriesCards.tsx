import React from "react";
import styles from '../cards/HomeCards.module.scss';
import Popup from "../Popup/Popup";
import Image from "next/image";

export const CategoriesCards = (props: any) => {
  return (
    <div className="col-lg-4 col-sm-6 col-12 mb-3">
      <div className="card">
        <div className={`${styles["card-slider"]} `}>
          <div className={`${styles["card-slider-img"]} `}>
            <Image
              className={`${styles["card-slider-image"]} `}
              src={props.items.logoPath}
              alt={props.items.serviceName}
              width={100}
              height={100}
            />
          </div>
          <div className={`${styles["card-body"]} `}>
            <div className={`${styles["card-slider-text"]} `}>
              <h4 className={`${styles["card-slider-text"]} `}>
                {props.items.serviceName}
              </h4>
              {/* <h4 className={`${styles["card-slider-text"]} `}>{props.items.price}</h4> */}
              <div
                className={`${styles["card-slider-desc-text"]} `}
                dangerouslySetInnerHTML={{ __html: props.items.description }}
              ></div>
              <Popup carddata={props.items ? props.items : new Array()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
