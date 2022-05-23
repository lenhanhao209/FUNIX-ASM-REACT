import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffs } from "../../Redux/ActionCreator";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function ListDepartment() {
  const dispatch = useDispatch();
  const { departmentId } = useParams();
  const departments = useSelector((state) => state.departments);
  const staffs = useSelector((state) => state.staffs);
  const [role, setRole] = useState(null);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);
  useEffect(() => {
    if (departments && departments.departments.length > 0) {
      setRole(departments.departments.filter((el) => el.id === departmentId));
    }
  }, []);

  const StaffOfDepart = staffs.staffs
    .filter((staff) => staff.departmentId === departmentId)
    .map((staff) => {
      return (
        <div
          key={staff.id}
          className="col-lg-2 col-md-4 col-sm-12"
          style={{ background: "#e9ecef" }}
        >
          <Link to={"/staffs/" + staff.id}>
            <img width="100%" src={staff.image} alt={staff.name} />
            <p className="text-center">{staff.name}</p>
          </Link>
        </div>
      );
    });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{role && role[0].name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{StaffOfDepart}</div>
    </div>
  );
}

export default ListDepartment;
