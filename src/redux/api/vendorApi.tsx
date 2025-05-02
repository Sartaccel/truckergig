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
        // NotificationManager.success(data.message);
        toast.success(data.message, {
                    theme: "dark", position: "top-right", autoClose: 5000
                  });
        Router.push("/serviceregistration");
      } else {
        // NotificationManager.error(data.message || "Something went wrong!");
        toast.error(data.message || "Something went wrong!", {
                    theme: "dark", position: "top-right", autoClose: 5000
                  });
      }

      resolve(res);
    }).catch((err) => {
      const message = err.response?.data?.headers?.message || "Not Saved";
      // NotificationManager.error(message);
      toast.error(message, {
        theme: "dark", position: "top-right", autoClose: 5000
      });
      reject(err);
    });
      });
    };