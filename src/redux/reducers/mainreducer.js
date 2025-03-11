import * as t from "./type";

const mainreducers = (state = {
    name: "guest",
}, action) => {
  switch(action.type){
    case t.SET_NAME:
      return { 
        ...state,
        name: action.payload
      };
    default:
      return {...state};
    }
}

export default mainreducers;