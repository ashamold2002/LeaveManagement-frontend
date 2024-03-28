
import React, { useContext, useState,useEffect } from "react";
import "./ApplyOnDuty.css";
import EmployeeHeader from "./EmployeeHeader";
import { empContext } from "../App";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button,Table } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
const initialValues = {
  noOfDays: "",
  fromDate: "",
  toDate: "",
  reason: "",

  leaveTypes_id: '7',
  empid: Cookies.get("employeeid"),
};

function ApplyOnDuty() {
    const { empDetails } = useContext(empContext);
  const { id } = useParams();
  const[leave,setLeave]=useState([]);
  const [values, setValues] = useState(initialValues);
  const emp=Cookies.get("employeeid");
  const reversedLeave = [...leave].reverse();
  const [dateError, setDateError] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const empid=Cookies.get("employeeid");
        const response = await axios.get(
          `http://localhost:5052/api/Leave/GetOnDutyHistory/${empid}`
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
  const validateForm = () => {
    // Validate start date and end date
    const startDate = new Date(values.fromDate);
    const endDate = new Date(values.toDate);

    if (startDate > endDate) {
      console.log('End date must be after start date.');
      setDateError('Invalid Date');
      return false;
    }

    const numberOfDays = parseInt(values.noOfDays, 10);
    const calculatedEndDate = new Date(startDate);
    calculatedEndDate.setDate(startDate.getDate() + numberOfDays);

    if (calculatedEndDate.toDateString() !== endDate.toDateString()) {
      setDateError('Number of days does not match the selected date.');
      return false;
    }

    // Additional custom validations (if needed)

    setDateError(''); // Clear any previous error
    return true; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
    try {
      console.log(values);
      const response = await axios.post(
        "http://localhost:5052/api/Leave/ApplyLeave",
        values
      );
      if (response.status === 200) {
        window.alert("OnDuty Request Applied")
        window.location.reload();

        // Handle success case
      } else {
        window.alert(" Request Failed")
        // Handle error case
      }
    } catch (error) {
      console.error("Error submitting form", error);
      window.alert("Error in server")
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
                  to={`/employeeprofile/${emp}`}
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
                    to={`/ApplyLeave/${emp}`}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="columns">
                      Apply for Leave
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/ApplyPermission" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="table">
                      Apply for Permission
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/ApplyOnDuty" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user">
                      Apply for OnDuty
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to={`/ViewStatus/${emp}`} activeClassName="activeClicked">
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
                <h1>Apply for OnDuty</h1>
            </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Select
                    name="leaveTypes_id"
                    value={values.leaveTypes_id}
                    onChange={handleInput}
                    
                  >
                    
                    <option value="7">OnDuty</option>
                    
                  </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>No of Days:</Form.Label>
                    <Form.Control
                      type="text"
                      name="noOfDays"
                      value={values.noOfDays}
                      onChange={handleInput}
                    />
                  </Form.Group>
                  <Row>
                    <Col><Form.Group className="mb-3">
                    <Form.Label>From Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fromDate"
                      value={values.fromDate}
                      onChange={handleInput}
                    />
                  
                  </Form.Group>
                  </Col>
                    <Col><Form.Group className="mb-3">
                    <Form.Label>To Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="toDate"
                      value={values.toDate}
                      onChange={handleInput}
                    />
                  </Form.Group></Col>


                  </Row>
                  <Row>{dateError && <p style={{ color: 'red' }}>{dateError}</p>}</Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Reason:</Form.Label>
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
                <h1>OnDuty Status</h1>
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
  )
}

export default ApplyOnDuty