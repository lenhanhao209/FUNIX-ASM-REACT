import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Col,
  Form,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";

const StaffList = (props) => {
  const [state, setState] = useState({
    name: "",
    nameF: "",
    doB: "",
    salaryScale: 1,
    startDate: "",
    department: "Sale",
    annualLeave: 0,
    overTime: 0,
    salary: 30000,
    image: "/assets/images/alberto.png",
    modalOpen: false,
    touched: {
      name: false,
      doB: false,
      salaryScale: false,
      startDate: false,
      department: false,
      annualLeave: false,
      overTime: false,
    },
  });

  const handleBlur = (field) => {
    setState({
      ...state,
      touched: { ...state.touched, [field]: true },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(
      state.name,
      state.salaryScale,
      state.doB,
      state.startDate,
      state.annualLeave,
      state.overTime
    );

    const newStaff = {
      name: state.name,
      doB: state.doB,
      startDate: state.startDate,
      department: { name: state.department },
      salaryScale: state.salaryScale,
      annualLeave: state.annualLeave,
      overTime: state.overTime,
      image: state.image,
    };
    setState({
      ...state,
      modalOpen: !state.modalOpen,
    });
    props.onAdd(newStaff);
  };

  const validate = (
    name,
    salaryScale,
    doB,
    startDate,
    annualLeave,
    overTime
  ) => {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };
    if (state.touched.name && name.length < 2)
      errors.name = "Yêu cầu nhiều hơn 2 ký tự";
    else if (state.touched.name && name.length > 20)
      errors.name = "Yêu cầu ít hơn 20 ký tự";
    if (state.touched.salaryScale && salaryScale < 1)
      errors.salaryScale = "Yêu cầu nhập";
    if (state.touched.annualLeave && annualLeave < 1)
      errors.annualLeave = "Yêu cầu nhập";
    if (state.touched.overTime && overTime < 1)
      errors.overTime = "Yêu cầu nhập";
    if (state.touched.doB && doB < 1) errors.doB = "Yêu cầu nhập";
    if (state.touched.startDate && startDate < 1)
      errors.startDate = "Yêu cầu nhập";
    return errors;
  };

  const errors = validate(
    state.name,
    state.salaryScale,
    state.doB,
    state.startDate,
    state.annualLeave,
    state.overTime
  );
  const toggleModal = () => {
    setState({
      ...state,
      modalOpen: !state.modalOpen,
    });
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const timNhanVien = (event) => {
    const target = event.target;
    event.preventDefault();
    const nameS = target.nameS.value;
    setState({ ...state, nameF: nameS });
  };

  const listNhanvien = props.staffs
    .filter((val) => {
      if (state.nameF === "") return val;
      else if (val.name.toLowerCase().includes(state.nameF.toLowerCase()))
        return val;
      return 0;
    })
    .map((val) => {
      return (
        <div
          key={val.id}
          className="col-lg-2 col-md-4 col-sm-12"
          style={{ justifyContent: "center" }}
        >
          <Link to={"/nhanvien/" + val.id}>
            <div onClick={() => props.onStaffSelect(val.id)}></div>
            <img src={val.image} alt={val.name} />
            <p>{val.name}</p>
          </Link>
        </div>
      );
    });
  return (
    <div className="container mb-1">
      <div className="row">
        <div className="col-12 col-md-6 mt-3">
          <div className="row">
            <div className="col-2 col-md-10">
              <h3>Nhân viên</h3>
            </div>
            <div className="col-2 col-auto">
              <Button outline onClick={toggleModal}>
                <span className="fa fa-plus fa-lg"></span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <form onSubmit={timNhanVien} className="form-group row">
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
      </div>
      <hr />
      <div className="row">{listNhanvien}</div>
      <Modal isOpen={state.modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Thêm nhân viên</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row className="control-group mb-4">
              <Label htmlFor="name" md={4}>
                Tên
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={state.name}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onBlur={() => handleBlur("name")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group  mb-4">
              <Label htmlFor="doB" md={4}>
                Ngày sinh
              </Label>
              <Col md={8}>
                <Input
                  type="date"
                  className="form-control"
                  id="doB"
                  name="doB"
                  value={state.doB}
                  valid={errors.doB === ""}
                  invalid={errors.doB !== ""}
                  onBlur={() => handleBlur("doB")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.doB}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group  mb-4">
              <Label htmlFor="startDate" md={4}>
                Ngày vào công ty
              </Label>
              <Col md={8}>
                <Input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={state.startDate}
                  valid={errors.startDate === ""}
                  invalid={errors.startDate !== ""}
                  onBlur={() => handleBlur("startDate")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group  mb-4">
              <Label htmlFor="department" md={4}>
                Phòng ban
              </Label>
              <Col md={8}>
                <Input
                  type="select"
                  id="department"
                  name="department"
                  value={state.department.name}
                  onChange={handleInputChange}
                >
                  <option>Sale</option>
                  <option>HR</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                </Input>
                <FormFeedback>{errors.department}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group  mb-4">
              <Label htmlFor="salaryScale" md={4}>
                Hệ số lương
              </Label>
              <Col md={8}>
                <Input
                  type="number"
                  className="form-control"
                  id="salaryScale"
                  name="salaryScale"
                  placeholder="1->3"
                  value={state.salaryScale}
                  valid={errors.salaryScale === ""}
                  invalid={errors.salaryScale !== ""}
                  onBlur={() => handleBlur("salaryScale")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.salaryScale}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group">
              <Label htmlFor="annualLeave" md={4}>
                Số ngày nghỉ còn lại
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  className="form-control"
                  id="anualLeave"
                  name="annualLeave"
                  value={state.annualLeave}
                  valid={errors.annualLeave === ""}
                  invalid={errors.annualLeave !== ""}
                  onBlur={() => handleBlur("annualLeave")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.annualLeave}</FormFeedback>
              </Col>
            </Row>
            <Row className="control-group  mb-3">
              <Label htmlFor="overTime" md={4}>
                Số ngày đã làm thêm
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  className="form-control"
                  id="overTime"
                  name="overTime"
                  value={state.overTime}
                  valid={errors.overTime === ""}
                  invalid={errors.overTime !== ""}
                  onBlur={() => handleBlur("overTime")}
                  onChange={handleInputChange}
                />
                <FormFeedback>{errors.overTime}</FormFeedback>
              </Col>
            </Row>
            <div className="form-group row">
              <div className="col-12  text-center">
                <Button type="submit" color="primary">
                  Thêm nhân viên
                </Button>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StaffList;
