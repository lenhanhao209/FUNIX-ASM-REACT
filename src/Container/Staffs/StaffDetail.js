/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffs, fetchDepartments } from "../../Redux/ActionCreator";
import { Loading } from "../../Components/Loading";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { editData } from "../../Redux/ActionCreator";
import { deleteData } from "../../Redux/ActionCreator";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";

const StaffDetail = () => {
  const staffs = useSelector((state) => state.staffs);
  const departments = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStaffs());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );

  //---------Edit data-------------//
  const handleSubmit = (value) => {
    const updateStaff = { ...value };
    updateStaff.id = Number(updateStaff.id);
    updateStaff.salaryScale = Number(updateStaff.salaryScale);
    updateStaff.annualLeave = Number(updateStaff.annualLeave);
    updateStaff.overTime = Number(updateStaff.overTime);
    updateStaff.image = "/assets/images/alberto.png";
    dispatch(editData(updateStaff));
  };

  //----------Delete data---------------//
  const delData = (value) => {
    if (window.confirm("Are you sure to delete this staff?")) {
      dispatch(deleteData(id));
      navigate(-1);
    }
  };

  const { id } = useParams();
  const staff = staffs.staffs.find((item) => item.id === parseInt(id));
  const staffEdit = {
    ...staff,
    doB: dateFormat(staff?.doB, "yyyy-mm-dd"),
    startDate: dateFormat(staff?.startDate, "yyyy-mm-dd"),
  };
  const department = departments.departments.find(
    (x) => x.id === staff?.departmentId
  );

  const RenderStaff = (staff) => {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
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
                <CardText>Phòng ban: {department?.name}</CardText>
                <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                <button
                  className="btn btn-primary"
                  color="danger"
                  id="add-btn"
                  onClick={toggleModal}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  color="danger"
                  id="add-btn"
                  onClick={delData}
                >
                  Delete
                </button>
                <Modal isOpen={isOpen} toggle={toggleModal}>
                  <ModalHeader toggle={toggleModal} close={closeBtn}>
                    Chỉnh sửa thông tin
                  </ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={handleSubmit} initialState={staffEdit}>
                      {/* Full name */}
                      <Row className="form-group">
                        <Label htmlFor="name" md={5}>
                          Họ tên
                        </Label>
                        <Col md={7}>
                          <Control
                            model=".name"
                            id="name"
                            name="name"
                            className="form-control"
                            validators={{
                              lenRange: (val) => val && val.length > 3,
                            }}
                          />
                          <Errors
                            model=".name"
                            className="text-danger"
                            messages={{
                              lenRange: "Yêu cầu nhiều hơn 3 ký tự",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Date of birth*/}
                      <Row className="form-group">
                        <Label htmlFor="doB" md={5}>
                          Ngày sinh
                        </Label>
                        <Col md={7}>
                          <Control.input
                            type="date"
                            model=".doB"
                            id="doB"
                            name="doB"
                            className="form-control"
                            validators={{
                              required: (val) => val,
                            }}
                          />
                          <Errors
                            model=".doB"
                            className="text-danger"
                            messages={{
                              required: "Yêu cầu bắt buộc ",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Started Date*/}
                      <Row className="form-group">
                        <Label htmlFor="startDate" md={5}>
                          Ngày vào công ty
                        </Label>
                        <Col md={7}>
                          <Control.input
                            type="date"
                            model=".startDate"
                            id="startDate"
                            name="startDate"
                            className="form-control"
                            validators={{
                              required: (val) => val,
                            }}
                          />
                          <Errors
                            model=".startDate"
                            className="text-danger"
                            messages={{
                              required: "Yêu cầu bắt buộc ",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Department */}
                      <Row className="form-group">
                        <Label htmlFor="department" md={5}>
                          Phòng ban
                        </Label>
                        <Col md={7}>
                          <Control.select
                            model=".departmentId"
                            id="department"
                            name="department"
                            className="form-control"
                            defaultValue="Dept01"
                          >
                            {departments.departments.map((department) => {
                              return (
                                <option
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </option>
                              );
                            })}
                          </Control.select>
                          <Errors model=".department" />
                        </Col>
                      </Row>

                      {/* Salary Scale */}
                      <Row className="form-group">
                        <Label htmlFor="salaryScale" md={5}>
                          Hệ số lương
                        </Label>
                        <Col md={7}>
                          <Control
                            model=".salaryScale"
                            id="salaryScale"
                            name="salaryScale"
                            className="form-control"
                            validators={{
                              typeCheck: (val) => !Number.isNaN(Number(val)),
                              numRange: (val) => val > 0 && val < 4,
                            }}
                          />
                          <Errors
                            model=".salaryScale"
                            className="text-danger"
                            messages={{
                              typeCheck: "Yêu cầu nhập số",
                              numRange: "Yêu cầu nhập số từ 1-3",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Annual Leave */}
                      <Row className="form-group">
                        <Label htmlFor="annualLeave" md={5}>
                          Số ngày nghỉ còn lại
                        </Label>
                        <Col md={7}>
                          <Control
                            model=".annualLeave"
                            id="annualLeave"
                            name="annualLeave"
                            className="form-control"
                            validators={{
                              typeCheck: (val) => !Number.isNaN(Number(val)),
                            }}
                          />
                          <Errors
                            model=".annualLeave"
                            className="text-danger"
                            messages={{
                              typeCheck: "Yêu cầu nhập số ",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Overtime */}
                      <Row className="form-group">
                        <Label htmlFor="overTime" md={5}>
                          Số ngày đã làm thêm
                        </Label>
                        <Col md={7}>
                          <Control
                            model=".overTime"
                            id="overTime"
                            name="overTime"
                            className="form-control"
                            validators={{
                              typeCheck: (val) => !Number.isNaN(Number(val)),
                            }}
                          />
                          <Errors
                            model=".overTime"
                            className="text-danger"
                            messages={{
                              typeCheck: "Yêu cầu nhập số",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Submit button */}
                      <Row className="form-group">
                        <Col className="col-7 offset-5">
                          <Button
                            type="submit"
                            color="primary"
                            onClick={toggleModal}
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </LocalForm>
                  </ModalBody>
                </Modal>
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
    <div>
      <Loading />
    </div>
  );
};

export default StaffDetail;
