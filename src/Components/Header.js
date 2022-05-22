/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <React.Fragment>
      <Navbar expand="md" className="bg-info" dark>
        <div className="container-fluid header">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand>
            <img src="/assets/images/logo.png" alt="logo" width="50" />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/staffs" style={{ color: "black" }}>
                  <h1 className="fa fa-users m-2"></h1>
                  Nhân viên
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/departments" style={{ color: "black" }}>
                  <p className="fa fa-address-card m-2"></p>Phòng ban
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/salarys" style={{ color: "black" }}>
                  <p className="fa fa-money m-2"></p>Bảng lương
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
