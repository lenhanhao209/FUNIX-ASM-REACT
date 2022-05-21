/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffs, fetchDepartments } from "../../Redux/ActionCreator";
import { Link } from "react-router-dom";
import { Loading } from "../../Components/Loading";
import { postData } from "../../Redux/ActionCreator";

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
  Input,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const StaffList = () => {
  const [state, setState] = useState({
    nameF: "",
    modalOpen: false,
  });
  const staffs = useSelector((state) => state.staffs);
  const departments = useSelector((state) => state.departments);
  const dispatch = useDispatch();

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
  function handleSubmit(value) {
    const newStaff = { ...value };
    newStaff.salaryScale = Number(newStaff.salaryScale);
    newStaff.annualLeave = Number(newStaff.annualLeave);
    newStaff.overTime = Number(newStaff.overTime);
    newStaff.image = "/assets/images/alberto.png";
    dispatch(postData(newStaff));
  }
  const handleInputChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const findStaff = (event) => {
    const target = event.target;
    event.preventDefault();
    const nameS = target.nameS.value;
    setState({ ...state, nameF: nameS });
  };

  const listStaffs = staffs.staffs
    .filter((val) => {
      if (state.nameF === "") return val;
      else if (val.name.toLowerCase().includes(state.nameF.toLowerCase()))
        return val;
      return 0;
    })
    .map((nv) => {
      return (
        <div
          key={nv.id}
          className="col-lg-2 col-md-4 col-sm-12"
          style={{ justifyContent: "center" }}
        >
          <Link to={"/staffs/" + nv.id}>
            <img src={nv.image} alt={nv.name} />
            <p>{nv.name}</p>
          </Link>
        </div>
      );
    });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <h3 style={{ display: "inline-block" }}>
              <i class="fa fa-user" aria-hidden="true"></i> Nhân viên
            </h3>
          </BreadcrumbItem>
          <div className="col-12 col-md-3" style={{ paddingLeft: 0 }}>
            <Button
              className="m-2"
              style={{ marginBottom: "8px" }}
              color="danger"
              id="add-btn"
              onClick={toggleModal}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} close={closeBtn}>
                  Thêm nhân viên
                </ModalHeader>
                <ModalBody>
                  <LocalForm onSubmit={handleSubmit}>
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
                              <option key={department.id} value={department.id}>
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
                          placeHolder="1-3"
                          className="form-control"
                          defaultValue="1"
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
                          defaultValue="0"
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
                          defaultValue="0"
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
                          Thêm
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
              </Modal>
            </Button>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <form onSubmit={findStaff} className="form-group row">
              <div className="col-8 col-md-8">
                <Input
                  type="text"
                  className="form-control"
                  name="nameS"
                  placeholder="Tìm kiếm nhân viên..."
                />
              </div>
              <div className="col-4 col-md-4">
                <button className="btn btn-success" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </Breadcrumb>
      </div>
      {staffs.isLoading ? <Loading /> : <div className="row">{listStaffs}</div>}
    </div>
  );
};

export default StaffList;
