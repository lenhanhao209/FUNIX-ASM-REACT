import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./components/StaffListComponent.js";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

//Declaring App
const App = () => {
  return (
    //Display Navbar and staffs when click
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
        </div>
      </Navbar>
      <StaffList />
    </div>
  );
};

export default App;
