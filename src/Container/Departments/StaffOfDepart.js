import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffs } from "../../Redux/ActionCreator";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";

function ListDepartment() {
  const dispatch = useDispatch();
  const { departmentId } = useParams();
  const staffs = useSelector((state) => state.staffs);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

  const StaffOfDepart = staffs.staffs
    .filter((staff) => staff.departmentId === departmentId)
    .map((staff) => {
      return (
        <Jumbotron
          key={staff.id}
          className="col-lg-2 col-md-4 col-sm-12"
          style={{ background: "#e9ecef" }}
        >
          <Link to={"/staffs/" + staff.id}>
            <img width="100%" src={staff.image} alt={staff.name} />
            <p className="text-center">{staff.name}</p>
          </Link>
        </Jumbotron>
      );
    });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng ban</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{StaffOfDepart}</div>
    </div>
  );
}

export default ListDepartment;
