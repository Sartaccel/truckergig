import urls from "../../utilities/AppSettings";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { NotificationManager } from "react-notifications";
import Vendor from "../../sections/vendor/Vendor"
import Router from "next/router";



export const SaveVendor = (payload) => {

    console.log(payload,"apipayload")
     
  
      return new Promise((resolve, reject) => {
  
        
        axios.post(`${urls.baseUrl}vendors/register`, payload)
         
          .then((res) => {
            const data = res.data.headers;
            console.log(data.statusCode);
            if (data.statusCode == 200) {
              Router.push("/serviceregistration");
            }
            resolve(res);
             NotificationManager.success(res.data.headers.message);                                                                                 
            // {notify}
            // <ToastContainer />
          })
          
        .catch((err) => {
            reject(err);
            NotificationManager.error("Not Saved");   
            if (err.response?.status == 403) {
              // RedirectTo403(history);
            }
          
  
          });
      });
    };