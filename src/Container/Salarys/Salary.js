import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalarys } from "../../Redux/ActionCreator";
import { Card, CardText, CardBody, CardTitle, CardImg } from "reactstrap";

const formatDecimal = require("format-decimal");

const Salarys = () => {
  const salarys = useSelector((state) => state.salarys);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalarys());
  }, [dispatch]);

  const salary = salarys.salarys.map((nv) => {
    console.log(nv);
    return (
      <div
        key={nv.id}
        className="col-lg-2 col-md-4 col-sm-12"
        style={{ justifyContent: "center" }}
      >
        <Card>
          <CardTitle className="p-3 bg-white rounded m-2">{nv.name}</CardTitle>
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
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{salary}</div>
    </div>
  );
};

export default Salarys;
