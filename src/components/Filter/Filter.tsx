import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Filter.module.scss";
import Router from "next/router";
import urls from "../../utilities/AppSettings";
import { useRouter } from 'next/router';
let val = 0;
const Filter: React.FC = (props: any) => {
  const router = useRouter()
  const [List, setList] = useState([])
  const [SearchList, setSearchList] = useState('')
  const [activefilter, setactivefilter] = useState("")
  const [childEle, setChildEle] = useState("");

  useEffect(() => {

    axios.get(`${urls.baseUrl}services/categories/grouped`)

      .then(function (response) {
        if (response.status === 200) {
          const data = (response.data.data)
          setList(data)
        }
      })
  }, []);

  const handleSearch = () => {
    Router.push({
      pathname: "/marketplaces",
      query: { servicename: SearchList, },
    });
  }
  const handleClear = () => {
    setSearchList('');
    Router.push({
      // pathname: "/marketplaces",
      pathname: "/marketplace",
    })

  };
  const pulldata = (data) => {
    console.log(data);

  }

  const handleClicksearch = (id: any, name: any, e) => {

    val = e.target.getAttribute('data-id')
    setactivefilter(id)

    setChildEle("")
    if (id) {
      Router.push({
        pathname: "/marketplaces",
        query: { id: id, ids: 0, name: name },
      });

    }
    console.log("activefilter", activefilter)

  }
  const handleClicksearchChild = (id: any, ids: any, names: any, e) => {
    val = e.target.getAttribute('data-id')
    setChildEle(id)
    setactivefilter("")
    if (id) {
      Router.push({
        pathname: "/marketplaces",
        query: { id: ids, ids: id, name: names },
      });
    }
    console.log("activefilter", activefilter)

  }

  return (
    <>
      <p><b>Filters</b></p>
      <div className="card p-1">
        <p className="p-2 mb-0">Search</p>
        <div className="input-group">
          <input
            type="text"
            className="form-control col-xs-5"
            placeholder="Search your need here"
            value={SearchList}
            onChange={event => setSearchList(event.target.value)}
          />
          <button type="button" onClick={handleSearch} className={`${styles["filter-btn"]} `}>
            <i className="bi bi-check-lg"></i>
          </button>
          <button type="button" onClick={handleClear} className={`${styles["filter-btn"]} `}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <div className="card p-1">
        <div className={`${styles["filter-categories"]} `} >
          <p className="p-2 mb-0">Categories</p>
          <div className={`${styles["filter-list"]} `}>
            <ul>
              {List && List.map((element) => {
                console.log(element.children);
                console.log(element.id);



                return (

                  <li key={element.id} className={element.children.length > 0 ? 'sub-menu' : '' ? "active" : " "} >
                    {
                      (element.children.length === 0) ?

                        <div onClick={(e) => handleClicksearch(element.id, element.name, e)} data-id={element.id} className={element.id == val ? `${styles["filter-cursor"]} ` : ""} ><img
                          src={element.imagePath} alt={element.name} />&nbsp;&nbsp;{element.name}
                        </div>

                        :

                        <div><img src={element.imagePath} alt={element.name} />
                          &nbsp;&nbsp;{element.name}<i className="bi bi-chevron-down float-right"></i>
                        </div>

                    }
                    {element.children && element.children.length > 0 &&
                      <ul>
                        {element.children && element.children.map((element1: any, element: any) => {
                          return (<li key={element1.id}> <div key={element1.id} data-id={element1.id} onClick={(e) => handleClicksearchChild(element1.id, element1.parentId, element1.name, e)} className={element1.id == val ? `${styles["filter-cursor"]} ` : ""}>{element1.name}</div></li>)
                        })}
                      </ul>
                    }
                  </li>

                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;