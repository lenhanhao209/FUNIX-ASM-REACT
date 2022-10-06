import React from "react";
import {
  Card,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { STAFFS } from "../shared/constants";
const formatDecimal = require("format-decimal");

const Salary = () => {
  const staffs = STAFFS;
  const luongCB = 3000000;
  const luongGio = 200000 / 8;
  const RenderSalary = staffs.map((item) => {
    const salaryEmployee = (
      item.salaryScale * luongCB +
      item.overTime * luongGio
    ).toFixed(0);
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={item.id}>
        <Card>
          <CardTitle className="p-3 bg-white rounded m-2">
            {item.name}
          </CardTitle>
          <CardBody>
            <CardText>Mã nhân viên:{item.id}</CardText>
            <CardText>Hệ số lương:{item.salaryScale}</CardText>
            <CardText>Số giờ làm thêm:{item.overTime}</CardText>
            <CardText className="bg-light p-2 shadow">
              Lương:{" "}
              {formatDecimal(+salaryEmployee, {
                decimal: ".",
                thousands: ",",
                precision: 0,
              })}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row shadow mb-3">{RenderSalary}</div>
    </div>
  );
};

export default Salary;
