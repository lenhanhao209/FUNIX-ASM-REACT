import { STAFFS } from "../shared/constants";
import { DEPARTMENTS } from "../shared/constants";
export const initialState = {
  staffs: STAFFS,
  department: DEPARTMENTS,
};

export const Reducer = (state = initialState, action) => {
  return state;
};
