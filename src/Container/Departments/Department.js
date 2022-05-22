import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartments } from "../../Redux/ActionCreator";
import { Loading } from "../../Components/Loading";
import { Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";

const Department = () => {
  const departments = useSelector((state) => state.departments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  const department = departments.departments.map((depart) => {
    return (
      <div
        key={depart.id}
        className="col-lg-3 col-md-5 col-sm-12 mb-3 m-1 text-center"
      >
        <Jumbotron style={{ background: "#e9ecef" }} className="text-center">
          <Link to={`/departments/${depart.id}`}>
            <h2>{depart.name}</h2>
          </Link>
          <p style={{ color: "black" }}>
            Số lượng nhân viên: {depart.numberOfStaff}
          </p>
        </Jumbotron>
      </div>
    );
  });
  return departments.isLoading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="row" style={{ justifyContent: "center" }}>
        {department}
      </div>
    </div>
  );
};

export default Department;
