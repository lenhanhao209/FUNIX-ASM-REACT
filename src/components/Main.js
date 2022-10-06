import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = (props) => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/nhanvien" element={<StaffList />} />
        <Route exact path="/nhanvien/:id" element={<StaffDetail />} />
        <Route path="/phongban" element={<Department />} />
        <Route path="/luong" element={<Salary />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
