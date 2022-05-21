import * as ActionTypes from "./ActionType";

export const DepartStaffs = (
  state = {
    isLoading: true,
    errmess: null,
    departmentstaffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPART_STAFFS:
      return {
        ...state,
        errmess: null,
        isLoading: false,
        departmentstaffs: action.payload,
      };
    case ActionTypes.DEPART_STAFFS_LOADING:
      return {
        ...state,
        errmess: null,
        isLoading: true,
        departmentstaffs: [],
      };
    case ActionTypes.DEPART_STAFFS_FAILED:
      return {
        ...state,
        errmess: action.payload,
        isLoading: false,
        departmentstaffs: [],
      };

    default:
      return state;
  }
};

export default DepartStaffs;
