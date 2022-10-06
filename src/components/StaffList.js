import React from "react";
import { Link } from "react-router-dom";
import { STAFFS } from "../shared/constants";

const StaffList = () => {
  const staffs = STAFFS;
  const listNhanvien = staffs.map((nv) => {
    return (
      <div
        key={nv.id}
        className="col-lg-2 col-md-4 col-sm-12"
        style={{ justifyContent: "center" }}
      >
        <Link to={"/nhanvien/" + nv.id}>
          <img src={nv.image} alt={nv.name} />
          <p>{nv.name}</p>
        </Link>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{listNhanvien}</div>
    </div>
  );
};

export default StaffList;
