import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StaffList from "../containers/staff/StaffList";
import StaffDetail from "../containers/staff/StaffDetail";
import Department from "../containers/deparments/Department";
import Salary from "../containers/salary/Salary";
import { Route, Routes } from "react-router-dom";
import { STAFFS, DEPARTMENTS } from "../shared/constants";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = (props) => {
  const [state, setState] = useState({
    staffs: STAFFS,
    departments: DEPARTMENTS,
  });

  const addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    setState({
      staffs: [...state.staffs, newStaff],
    });
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route
          exact
          path="/nhanvien"
          element={
            <StaffList
              staffs={state.staffs}
              onAdd={addStaff}
              onStaffSelect={<StaffDetail staffs={state.staffs} />}
            />
          }
        />
        <Route
          exact
          path="/nhanvien/:id"
          element={<StaffDetail staffs={state.staffs} />}
        />

        <Route
          path="/phongban"
          element={<Department departments={state.departments} />}
        />
        <Route path="/luong" element={<Salary salarys={state.staffs} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
