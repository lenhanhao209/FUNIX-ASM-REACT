import * as ActionTypes from "./ActionType";
import { baseUrl } from "./BaseUrl";

// -----------------STAFFS---------------------//
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => {
  return {
    type: ActionTypes.STAFFS_LOADING,
  };
};

export const staffsFailed = (errmess) => {
  return {
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess,
  };
};

export const addStaffs = (staffs) => {
  return {
    type: ActionTypes.ADD_STAFFS,
    payload: staffs,
  };
};

// ----------------------DEPARTMENTS-----------------//
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => {
  return {
    type: ActionTypes.DEPARTMENTS_LOADING,
  };
};

export const departmentsFailed = (errmess) => {
  return {
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess,
  };
};

export const addDepartments = (departments) => {
  return {
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments,
  };
};

//-----------------------SALARYS-----------------------//
export const fetchSalarys = () => (dispatch) => {
  dispatch(salarysLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salarys) => dispatch(addSalarys(salarys)))
    .catch((error) => dispatch(salarysFailed(error.message)));
};

export const salarysLoading = () => {
  return {
    type: ActionTypes.SALARYS_LOADING,
  };
};

export const salarysFailed = (errmess) => {
  return {
    type: ActionTypes.SALARYS_FAILED,
    payload: errmess,
  };
};

export const addSalarys = (salarys) => {
  return {
    type: ActionTypes.ADD_SALARYS,
    payload: salarys,
  };
};

// ---------- Push data to baseUrl ----------//
export const postData = (newStaff) => (dispatch) => {
  fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: { "Content-Type": "application/json" },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        }

        if (!Response.ok) {
          let err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          throw err;
        }
      },
      (err) => {
        let errmess = new Error(err.message);
        throw errmess;
      }
    )
    .then((res) => res.json())

    // Hanlde when get response successful
    .then((list) => {
      dispatch(addStaffs(list));
    });
};

// ---------- Edit data to baseUrl ----------
export const editData = (editData) => (dispatch) => {
  fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(editData),
    headers: { "Content-Type": "application/json" },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        }

        if (!response.ok) {
          let err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          throw err;
        }
      },
      (err) => {
        let errmess = new Error(err.message);
        throw errmess;
      }
    )
    .then((response) => response.json())

    // Hanlde when get response successful
    .then((list) => {
      dispatch(addStaffs(list));
    });
};

// ---------- Delete data to baseUrl ----------
export const deleteData = (id) => (dispatch) => {
  fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
    header: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((list) => {
      dispatch(addStaffs(list));
    });
};
