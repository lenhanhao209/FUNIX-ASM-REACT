import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalarys } from "../../Redux/ActionCreator";
import { FadeTransform } from "react-animation-components";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Button,
} from "reactstrap";

const formatDecimal = require("format-decimal");

const Salarys = () => {
  const salarys = useSelector((state) => state.salarys);
  const [sortSalary, setSortSalary] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalarys());
  }, [dispatch]);

  const salary = salarys.salarys
    .sort((a, b) => (sortSalary ? a.salary - b.salary : b.salary - a.salary))
    .map((nv) => {
      return (
        <div
          key={nv.id}
          className="col-lg-2 col-md-4 col-sm-12"
          style={{ justifyContent: "center" }}
        >
          <FadeTransform
            in
            fadeProps={{ exitFade: "0", enterFade: "1" }}
            transformProps={{ exitTransform: "scale(.7) translateY(50%)" }}
          >
            <Card>
              <CardTitle className="p-3 bg-white rounded m-2">
                {nv.name}
              </CardTitle>
              <CardImg src={nv.image} alt={nv.image} />
              <CardBody>
                <CardText>Mã nhân viên:{nv.id}</CardText>
                <CardText>Hệ số lương:{nv.salaryScale}</CardText>
                <CardText>Số giờ làm thêm:{nv.overTime}</CardText>
                <CardText className="bg-light p-2 shadow">
                  Lương:{" "}
                  {formatDecimal(nv.salary || 0, {
                    decimal: ".",
                    thousands: ",",
                    precision: 0,
                  })}
                </CardText>
              </CardBody>
            </Card>
          </FadeTransform>
        </div>
      );
    });
  return (
    <div className="container">
      <div className="row">
        <Button
          className="btn btn-warning col-3"
          onClick={() => setSortSalary(!sortSalary)}
        >
          Sắp xếp lương
        </Button>
      </div>
      <div className="row">{salary}</div>
    </div>
  );
};

export default Salarys;
