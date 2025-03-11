import { combineReducers } from "redux"
import main from "./mainreducer"

const rootReducer = combineReducers({
  main: main
})

export default rootReducer;