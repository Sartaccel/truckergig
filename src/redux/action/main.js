import * as t from "../reducers/type";
import axios from "axios";
import {SaveContact} from'../api/contactApi'
import { SaveVendor } from "../api/vendorApi";
// import { request } from "../../util/request";

export const setContactInfo = (name) => dispatch => {
  dispatch({
    type: t.SET_NAME,
    payload: name
  });
}

export const setInfo = (payload) => async (dispatch) => {
    dispatch({ type:  t.SET_NAME });
    SaveContact(payload)
      .then((user) => {
        dispatch({
          type: t.SET_SUCCESS,
          payload: user.data.data || [],
        });
  
        history.push(callbackurl);
      })
    .catch((error) => {
        dispatch({ type: t.SET_FALIURE });
  
      });
  };

  export const setVendorInfo = (payload) => async (dispatch) => {
    dispatch({ type:  t.SET_NAME });
    SaveVendor(payload)
      .then((user) => {
        dispatch({
          type: t.SET_SUCCESS,
          payload: user.data.data || [],
        });
        const successmessages = "my code";
        NotificationManager.success(successmessages);
        console.log(successmessages);
        
        history.push(callbackurl);
        return user;
      })
    .catch((error) => {
        dispatch({ type: t.SET_FALIURE });
        return error;

      });
  };