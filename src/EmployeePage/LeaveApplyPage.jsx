import React, { useContext, useState, useEffect } from "react";
import "./LeaveApplyPage.css";
import EmployeeHeader from "./EmployeeHeader";
import { empContext } from "../App";
import {Calendar} from "react-calendar";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Link } from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Table,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
const initialValues = {
  noOfDays: "",
  fromDate: "",
  toDate: "",
  reason: "",

  leaveTypes_id: "",
  empid: Cookies.get("employeeid"),
};
function LeaveApplyPage() {
  const { empDetails } = useContext(empContext);
  const { id } = useParams();
  const [leave, setLeave] = useState([]);
  const [values, setValues] = useState(initialValues);
  const reversedLeave = [...leave].reverse();
  const [dateError, setDateError] = useState("");
  const[allotleave,setAllotleave]=useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empid = Cookies.get("employeeid");
        const allot= await axios.get(
          `http://localhost:5052/api/Leave/GetAllotedLeave/${empid}`
        );
        setAllotleave(allot.data);
        console.log(allot.data);
        
        const response = await axios.get(
          `http://localhost:5052/api/Leave/GetLeaveApplyHistory/${empid}`
        );
        setLeave(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const isBlinkingRed = allotleave.cl === 0;
  const isBlinkingBlue = allotleave.ml === 0;
  const isBlinkingGreen = allotleave.pl === 0;
  const isBlinkingWhite = allotleave.sickLeave === 0;
  const validateForm = () => {
    // Validate start date and end date
    const startDate = new Date(values.fromDate);
    const endDate = new Date(values.toDate);

    if (startDate > endDate||startDate==endDate) {
      console.log("End date must be after start date.");
      setDateError("Invalid Date");
      return false;
    }

    const numberOfDays = parseInt(values.noOfDays, 10);
    const calculatedEndDate = new Date(startDate);
    calculatedEndDate.setDate((startDate.getDate() + numberOfDays)-1);

    if (calculatedEndDate.toDateString() !== endDate.toDateString()) {
      setDateError("Number of days does not match the selected date.");
      return false;
    }

    // Additional custom validations (if needed)

    setDateError(""); // Clear any previous error
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(values);
        const response = await axios.post(
          "http://localhost:5052/api/Leave/ApplyLeave",
          values
        );
        if (response.status === 200) {
          console.log("Apply successful");
          window.alert("Leave Request Applied");
         window.location.reload();

          // Handle success case
        } else {
          console.error("Apply failed");
          window.alert("Request Apply failed");

          // Handle error case
        }
      } catch (error) {
        console.error("Error submitting form", error);
        window.alert("InSufficient Leave");
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              height: "100vh",
              overflow: "scroll initial",
            }}
            className="side-nav"
          >
            <CDBSidebar textColor="#000000" backgroundColor="#b3c7f7">
              <CDBSidebarHeader
                prefix={<i className="fa fa-bars fa-large"></i>}
                className="text"
              >
                <Link
                  to={`/employeeprofile/${id}`}
                  className="text-decoration-none"
                >
                  <span>Home</span>
                </Link>
                <a
                  href="/"
                  className="text-decoration-none"
                  style={{ color: "inherit" }}
                ></a>
              </CDBSidebarHeader>
              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                  <NavLink
                    exact
                    to={`/ApplyLeave/${id}`}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="columns">
                      Apply for Leave
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to="/ApplyPermission"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="table">
                      Apply for Permission
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to="/ApplyOnDuty"
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="user">
                      Apply for OnDuty
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to={`/ViewStatus/${id}`}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="chart-line">
                      View Status
                    </CDBSidebarMenuItem>
                  </NavLink>
                </CDBSidebarMenu>
              </CDBSidebarContent>
            </CDBSidebar>
          </div>
        </Col>
        <Col md={9} xs={9}>
          <EmployeeHeader
            name={empDetails.employeeName}
            img={empDetails.employeeImageName}
          />
          <Container className="leave-container">
            <Card>
              <Card.Header>
                <h1>Apply for Leave</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Form.Group className="mb-3">
                  <Form.Select
                    name="leaveTypes_id"
                    value={values.leaveTypes_id}
                    onChange={handleInput}
                  >
                    <option>Choose Your Leave</option>
                    <option value="1">CL</option>
                    <option value="2">LOP</option>
                    <option value="3">ML</option>
                    <option value="4">PL</option>
                    <option value="5">Sick Leave</option>
                  </Form.Select>
                  </Form.Group> */}
                  <Row>
                    <Col>Leave Types :</Col>
                    <Col><Form.Check
                      inline
                      // label="CL"
                      name="leaveTypes_id"
                      type="radio"
                      id="cl-radio"
                      value="1"
                      onChange={handleInput}
                      className={isBlinkingRed ? 'blink-border' : ''}
                    /><label htmlFor="cl-radio">CL({allotleave.cl}days)</label></Col>
                    <Col><Form.Check
                      inline
                      label="LOP"
                      name="leaveTypes_id"
                      type="radio"
                      id="lop-radio"
                      value="2"
                      onChange={handleInput}
                    /></Col>
                    <Col><Form.Check
                      inline
                      // label="ML"
                      name="leaveTypes_id"
                      type="radio"
                      id="ml-radio"
                      value="3"
                      onChange={handleInput}
                    /><label htmlFor="ml-radio">ML({allotleave.ml}days)</label></Col>
                    <Col><Form.Check
                      inline
                      // label="PL"
                      name="leaveTypes_id"
                      type="radio"
                      id="pl-radio"
                      value="4"
                      onChange={handleInput}
                    /><label htmlFor="pl-radio">PL({allotleave.pl}days)</label></Col>
                    <Col><Form.Check
                      inline
                      label="Sick Leave"
                      name="leaveTypes_id"
                      type="radio"
                      id="sick-radio"
                      value="5"
                      onChange={handleInput}
                    /></Col>
                    
                    
                    
                    
                    
                  </Row>
                  <Row className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label>No of Days :</Form.Label>
                    <Form.Control
                      type="text"
                      name="noOfDays"
                      value={values.noOfDays}
                      onChange={handleInput}
                    />
                  </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                    
                      <Form.Group className="mb-3">
                        <Form.Label>From Date :</Form.Label>
                        <Form.Control
                          type="date"
                          name="fromDate"
                          value={values.fromDate}
                          onChange={handleInput}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>To Date :</Form.Label>
                        <Form.Control
                          type="date"
                          name="toDate"
                          value={values.toDate}
                          onChange={handleInput}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {dateError && <p style={{ color: "red" }}>{dateError}</p>}
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Reason :</Form.Label>
                    <Form.Control
                      type="text"
                      name="reason"
                      value={values.reason}
                      onChange={handleInput}
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3">
                    <Form.Label>leaveTypes :</Form.Label>
                    <Form.Control
                      type="number"
                      name="leaveTypes_id"
                      value={values.leaveTypes_id}
                      onChange={handleInput}
                    />
                  </Form.Group> */}

                  <Button type="submit">Apply</Button>
                </Form>
              </Card.Body>
            </Card>
            <Row className="mt-4">
              <Card>
                <Card.Header>
                  <h1>Leave Status</h1>
                </Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Leave Type</th>
                        <th>No Of Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reversedLeave.map((leave) => (
                        <tr key={leave.leaveId}>
                          <td>{leave.fromDate}</td>
                          <td>{leave.toDate}</td>
                          <td>{leave.leaveType}</td>
                          <td>{leave.noOfDays}</td>
                          <td>{leave.reason}</td>
                          <td>{leave.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default LeaveApplyPage;
