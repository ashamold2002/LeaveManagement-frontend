import React, { useState, useContext, useEffect } from "react";
import "./EmployeeStatus.css";
import EmployeeHeader from "./EmployeeHeader";
import { empContext } from "../App";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";


import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Link } from "react-router-dom";

import { Container,Form, Card, Row, Col, Table,Button } from "react-bootstrap";
import axios from "axios";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function EmployeeStatus() {
  const { empDetails } = useContext(empContext);
  const { id } = useParams();
  const [leave, setLeave] = useState([]);
  const reversedLeave = [...leave].reverse();

  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const emp=Cookies.get("employeeid");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterRequestsBySearchTerm = (requests) => {
    return requests.filter((request) => {
      const values = Object.values(request).join("").toLowerCase();
      return values.includes(searchTerm.toLowerCase());
    });
  };
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5052/api/Leave/GetEmployeeLeaveRequests/EmployeeLeaveRequests/${emp}`
        );
        setLeave(response.data);
        
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();
  }, []);

  const handleDelete = async (leave) => {
    try {
        const response = await axios.get(`http://localhost:5052/api/Leave/GetIndividualLeave/${leave}`);
        
        console.log(response.data);
        Cookies.set('leaveid', response.data.leaveId);
        const initialValues = {
            
            leaveid: Cookies.get("leaveid"),
          };
        const deleteleave= await axios.post(`http://localhost:5052/api/Leave/CancelRequest`,initialValues);
        
        if (deleteleave.status === 200) {
            // Successfully deleted
            // This will update the parent component's state
            window.alert("Request deleted successfully")
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            window.alert('request not found.');
        } else {
           window. alert('An error occurred while deleting request.');
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
                    to="/ViewStatus"
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
          <Row className="search">
        <Col></Col>
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={handleSearchChange}
              value={searchTerm}
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
            <Card className="card-status">
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
                  {filterRequestsBySearchTerm(reversedLeave).map((request, index) => (
                      <tr key={index}>
                        <td>{request.fromDate}</td>
                        <td>{request.toDate}</td>
                        <td>{request.leaveType}</td>
                        <td>{request.noOfDays}</td>
                        <td>{request.reason}</td>
                        <td>{request.status}</td>
                        <td>
                          <Button variant="danger" onClick={()=>handleDelete(request.leaveId)}>{<DeleteForeverOutlinedIcon/>}</Button>
                        </td>
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

export default EmployeeStatus;
