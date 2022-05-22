import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import StaffList from "../Container/Staffs/StaffList";
import StaffDetail from "../Container/Staffs/StaffDetail";
import Department from "../Container/Departments/Department";
import Salarys from "../Container/Salarys/Salary";
import ListDepartment from "../Container/Departments/StaffOfDepart";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Main = (props) => {
  const location = useLocation();
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={300} classNames="page">
          <Routes>
            <Route exact path="/staffs" element={<StaffList />} />
            <Route exact path="/staffs/:id" element={<StaffDetail />} />
            <Route path="/departments" element={<Department />} />
            <Route
              path="/departments/:departmentId"
              element={<ListDepartment />}
            />
            <Route path="/salarys" element={<Salarys />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};

export default Main;
