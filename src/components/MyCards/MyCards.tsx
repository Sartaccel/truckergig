import React from "react";
import styles from '../cards/HomeCards.module.scss';
import DeleteService from "../DeleteService/DelService";

export const MyCards = (props: any) => {
  console.log(props,"props...")
  return (
    <div className="col-lg-3 col-sm-6 col-12 mb-4 d-flex align-items-stretch">
      <div className="card w-100 shadow-sm">
        <div className={`${styles["card-slider"]} d-flex flex-column h-100 p-3`}>
          <div className={`${styles["card-slider-img"]} text-center mb-3`}>
            <img
              className={`${styles["card-slider-image"]} `}
              src={props.items.logoPath}
              alt={props.items.serviceName}
              style={{ maxHeight: "120px", objectFit: "contain" }}
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
              {
                props?.role!=="user" && <DeleteService carddata={props.items ? props.items : new Array()} />
              }
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
