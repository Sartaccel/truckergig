import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import styles from "./Filter.module.scss";
import { FaSearch } from 'react-icons/fa';
import Router from "next/router";
import urls from "../../utilities/AppSettings";
import { useRouter } from 'next/router';
import Image from "next/image";

let val = 0;

const Filter: React.FC = (props: any) => {
  
  const router = useRouter()
  const [List, setList] = useState<any[]>([]);
  const [SearchList, setSearchList] = useState('');
  const [FilteredList, setFilteredList] = useState<any[]>([]);
  const [activefilter, setactivefilter] = useState("")
  const [childEle, setChildEle] = useState("");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  
//  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value;
//   setSearchList(value);
//   if (value.trim().length > 0) {
//     setSearchTriggered(true);
//   } else {
//     setSearchTriggered(false);
//   }

//   if (typingTimeoutRef.current) {
//     clearTimeout(typingTimeoutRef.current);
//   }

//   // Set new debounce timeout
//   typingTimeoutRef.current = setTimeout(() => {
//     const filtered = List.filter((item) =>
//       item?.serviceName?.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredList(filtered);

//     Router.push(
//       {
//         pathname: "/marketplace",
//         query: { servicename: value },
//       },
//       undefined,
//       { shallow: true }
//     );
//   }, 100); // 1 second debounce
// };


  // const handleSearch = () => {
  //   Router.push({
  //     pathname: "/marketplaces",
  //     query: { servicename: SearchList, },
  //   });
  // }
  // const handleClear = () => {
  //   setSearchList('');
  //   Router.push({
  //     // pathname: "/marketplaces",
  //     pathname: "/marketplace",
  //   })

  // };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value;
  const value = rawValue.trimStart(); // allow typing but prevent leading spaces
  setSearchList(rawValue); // keep raw input so spaces show in box

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(() => {
    const trimmed = rawValue.trim(); // fully trimmed (leading + trailing)
    
    if (trimmed.length > 0) {
      const filtered = List.filter((item) =>
        item?.serviceName?.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredList(filtered);

      Router.push(
        {
          pathname: "/marketplace",
          query: { servicename: trimmed },
        },
        undefined,
        { shallow: true }
      );
    } else {
      setFilteredList(List); // reset full list
      Router.push("/marketplace", undefined, { shallow: true });
    }
  }, 300);
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
        pathname: "/marketplace",
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
        pathname: "/marketplace",
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
           onChange={(e) => {
    const value = e.target.value;
    if (value === "" || value[0] !== " ") {
      handleInputChange(e);
    }
  }}
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
                  <Image src={element.imagePath} alt={element.name} width={100} height={100}/>
                  <span className="category-label">{element.name}</span>
                </div>
              ) : (
                <div
                className={`${styles["menu-item"]} ${openMenus[element.id] ? styles["menu-open"] : ""}`} 
                onClick={() => handleToggleMenu(element.id)}>
                  <Image src={element.imagePath} alt={element.name}  width={100} height={100}/>
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