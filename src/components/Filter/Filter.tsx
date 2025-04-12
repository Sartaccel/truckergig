import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Filter.module.scss";
import { FaSearch } from 'react-icons/fa';
import Router from "next/router";
import urls from "../../utilities/AppSettings";
import { useRouter } from 'next/router';
let val = 0;
const Filter: React.FC = (props: any) => {
  
  const router = useRouter()
  const [List, setList] = useState<any[]>([]);
  const [SearchList, setSearchList] = useState('');
  const [FilteredList, setFilteredList] = useState<any[]>([]);
  const [activefilter, setactivefilter] = useState("")
  const [childEle, setChildEle] = useState("");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    axios.get(`${urls.baseUrl}services/categories/grouped`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setList(data);
          setFilteredList(data);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchList(value);

  const filtered = List.filter((item) =>
    item?.serviceName?.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredList(filtered);

  Router.push({
    pathname: "/marketplaces",
    query: { servicename: value },
  });
};


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

  const handleToggleMenu = (id: string | number) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle open/close state
    }));
  };

  return (
    <>
      <p><b>Filters</b></p>
    <div className="card p-1">
      <p className="p-2 mb-0">Search</p>
      <div className="input-group">
        <input
          type="text"
          className="form-control pe-5"
          placeholder="Search your need here"
          value={SearchList}
          onChange={handleInputChange}
        />
         <FaSearch
    className="position-absolute"
    style={{
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#ff9239',
      pointerEvents: 'none',
    }}
  />
        {/* <button type="button" onClick={handleSearch} className={styles["filter-btn"]}>
          <i className="bi bi-check-lg"></i>
        </button>
        <button type="button" onClick={handleClear} className={styles["filter-btn"]}>
          <i className="bi bi-x-lg"></i>
        </button> */}
      </div>
    </div>

    <div className="card p-1">
      <div className={styles["filter-categories"]}>
        <p className="p-2 mb-0">Categories</p>
        <div className={styles["filter-list"]}>
          <ul>
            {List?.map((element) => (
              <li 
              key={element.id} 
              className={`${element.children.length > 0 ? "sub-menu" : ""} 
                          ${element.id === val || element.children.some(child => child.id === val) ? "active-category" : ""}`}
            >
              {element.children.length === 0 ? (
                <div
                  onClick={(e) => handleClicksearch(element.id, element.name, e)}
                  data-id={element.id}
                  className={element.id === val ? styles["filter-cursor"] : ""}
                >
                  <img src={element.imagePath} alt={element.name} />
                  <span className="category-label">{element.name}</span>
                </div>
              ) : (
                <div
                className={`${styles["menu-item"]} ${openMenus[element.id] ? styles["menu-open"] : ""}`} 
                onClick={() => handleToggleMenu(element.id)}>
                  <img src={element.imagePath} alt={element.name} />
                  <span className="category-label">{element.name}</span>
                  <i className={`bi bi-chevron-${openMenus[element.id] ? "down" : "right"} float-right`}></i>
                </div>
              )}
            
              {element.children.length > 0 && openMenus[element.id] && (
                <ul>
                  {element.children.map((child) => (
                    <li 
                      key={child.id} 
                      className={child.id === val ? styles["active-category"] : ""}
                    >
                      <div
                        data-id={child.id}
                        onClick={(e) => handleClicksearchChild(child.id, child.parentId, child.name, e)}
                        className={child.id === val ? styles["filter-cursor"] : ""}
                      >
                        {child.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default Filter;