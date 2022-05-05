import React from "react";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";

const Department = (props) => {
  const department = props.departments.map((depart) => {
    return (
      <Card key={depart.id} className="col-lg-3 col-md-5 col-sm-12 mb-3 m-2">
        <CardTitle>{depart.name}</CardTitle>
        <CardBody>
          <CardText> Số lượng nhân viên: {depart.numberOfStaff}</CardText>
        </CardBody>
      </Card>
    );
  });
  return (
    <div className="container">
      <div className="row">{department}</div>
    </div>
  );
};

export default Department;
