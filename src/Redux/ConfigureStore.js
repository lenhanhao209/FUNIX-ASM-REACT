import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./Staffs";
import { Departments } from "./Departments";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Salarys } from "./Salarys";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salarys: Salarys,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
