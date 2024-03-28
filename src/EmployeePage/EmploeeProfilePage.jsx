import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink ,Link} from "react-router-dom";
import { Container, Row, Col,Card,Button } from "react-bootstrap";

import "./EmployeeProfile.css";
import axios from "axios";
import EmployeeHeader from "./EmployeeHeader";
import { useContext } from "react";
import { empContext } from '../App';


function EmployeeProfilePage() {
  const { id } = useParams();
  const {empDetails, setEmpDetails}= useContext(empContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5052/api/Leave/GetIndividual/${id}`)
      .then((response) => {
        setEmpDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
     
        <Row>
            <Col xs={4} md={2}>
            <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
        className="side-nav"
      >
        <CDBSidebar textColor="#000000" backgroundColor="#b3c7f7">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}className="text">
          <Link to={`/employeeprofile/${id}`} className="text-decoration-none">
                <span>Home</span>
            </Link>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to={`/ApplyLeave/${id}`} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Apply for Leave
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to='/ApplyPermission' activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">
                  Apply for Permission
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/ApplyOnDuty" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Apply for OnDuty
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to={`/ViewStatus/${id}`} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  View Status
                </CDBSidebarMenuItem>
              </NavLink>

              
            </CDBSidebarMenu>
          </CDBSidebarContent>

          {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter> */}
        </CDBSidebar>
      </div>
            </Col>
            <Col xs={8} md={10}>
            <EmployeeHeader
        name={empDetails.employeeName}
        img={empDetails.employeeImageName}
      />
      <Container>
      <Row className="container-body">
        
      <Col >
      </Col>
      <Col >
      
      
      <Card style={{ width: '18rem' }} className="card shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4">
      <Card.Img variant="top" src={empDetails.employeeImageName} className="cardImg rounded-circle"/>
      <Card.Body>
        <Card.Title>
            <h2>{empDetails.employeeName}</h2>
            <h5>{empDetails.employeeDesignation}</h5>
        </Card.Title>

        
      </Card.Body>
    </Card>
           
        
      
      </Col>
      <Col >
      </Col>
      
      </Row>
      </Container>
    </Col>
      
      
      </Row>
      
      
      
    </>
  );
}

export default EmployeeProfilePage;
