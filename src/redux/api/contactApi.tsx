import urls from "../../utilities/AppSettings";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { NotificationManager } from "react-notifications";
import Contactus from "../../sections/contactus/Contactus"

export const SaveContact = (payload) => {

  console.log(payload,"apipayload")
   

    return new Promise((resolve, reject) => {

      
      axios.post(`${urls.baseUrl}contactus/add`, payload)
       
        .then((res) => {
          resolve(res);
           NotificationManager.success(res.data.headers.message);                                                                         
        
        })
        
      .catch((err) => {
          reject(err);
          NotificationManager.error('Not Saved');
          if (err.response?.status == 403) {
            // RedirectTo403(history);
          }
        

        });
    });
  };