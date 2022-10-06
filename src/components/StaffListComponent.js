import React, { useState } from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";
import { STAFFS } from "../shared/constants";

//Declaring StaffList
const StaffList = () => {
  const staffs = STAFFS;
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [columDefault, setColumDefault] = useState(
    "col-12 col-md-6 col-lg-4 mt-3"
  );
  //Declaring columnSelect
  const columnSelect = (col) => {
    setColumDefault(col);
  };
  //Declaring Staff
  const Staff = () => {
    if (selectedStaff !== null) {
      return (
        <div className="col-4">
          <Card>
            <CardImg
              width="100%"
              src={selectedStaff.image}
              alt={selectedStaff.name}
            />
            <CardBody>
              <CardTitle>{`Họ và tên: ${selectedStaff.name}`}</CardTitle>
              <CardText>{`Ngày sinh: ${dateFormat(
                selectedStaff.doB,
                "dd/mm/yyyy"
              )}`}</CardText>
              <CardText>{`Ngày vào công ty: ${dateFormat(
                selectedStaff.startDate,
                "dd/mm/yyyy"
              )}`}</CardText>
              <CardText>{`Phòng ban: ${selectedStaff.department.name}`}</CardText>
              <CardText>{`Số ngày nghỉ còn lại: ${selectedStaff.annualLeave}`}</CardText>
              <CardText>{`Số ngày đã làm thêm: ${selectedStaff.overTime}`}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  // Set up button to change quantity of columms
  return (
    <div className="container">
      <div
        className="row m-3"
        style={{ padding: 10, display: "flex", justifyContent: "center" }}
      >
        <button
          style={{ marginRight: 10 }}
          onClick={() => columnSelect("col-md-2 mt-1")}
          className="btn btn-primary col-2"
        >
          6 cột
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => columnSelect("col-md-3 mt-1")}
          className="btn btn-secondary col-2"
        >
          4 cột
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => columnSelect("col-md-4 mt-1")}
          className="btn btn-success col-2"
        >
          3 cột
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => columnSelect("col-md-6 mt-1")}
          className="btn btn-info col-2"
        >
          2 cột
        </button>
        <button
          onClick={() => columnSelect("col-md-12 mt-1")}
          className="btn btn-warning col-2"
        >
          1 cột
        </button>
      </div>
      <div className="row mt-5"></div>
      <div
        className="row"
        style={{
          padding: "0 20px",
          margin: "0 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {staffs.map((staff) => (
          <Card
            className={columDefault}
            onClick={() => setSelectedStaff(staff)}
          >
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        ))}
      </div>
      <Staff />
    </div>
  );
};

export default StaffList;
