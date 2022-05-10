import React from "react";
import { CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const StaffDetail = ({ staffs }) => {
  const { id } = useParams();

  const staff = staffs.find((item) => item.id === parseInt(id));

  const RenderStaff = (staff) => {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <CardImg src={staff.image} alt={staff.name} />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardBody>
                <CardText>
                  Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                </CardText>
                <CardText>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </CardText>
                <CardText>Phòng ban: {staff.department.name}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
              </CardBody>

              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return staff ? (
    <div className="container">
      <div className="row">{RenderStaff(staff)}</div>
    </div>
  ) : (
    <div></div>
  );
};

export default StaffDetail;
