import React from "react";
import styles from '../cards/HomeCards.module.scss';
import DeleteService from "../DeleteService/DelService";

export const MyCards = (props: any) => {
  return (
    <div className="col-lg-3 col-sm-6 col-12 mb-3">
      <div className="card" >
        <div className={`${styles["card-slider"]} `} style={{width:"200px"}}>
          <div className={`${styles["card-slider-img"]} `}>
            <img
              className={`${styles["card-slider-image"]} `}
              src={props.items.logoPath}
              alt={props.items.serviceName}
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
              <DeleteService carddata={props.items ? props.items : new Array()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
