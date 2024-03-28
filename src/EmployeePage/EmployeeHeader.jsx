import React from "react";
import "./EmployeeHeader.css";
import { Navbar, Container, Nav } from "react-bootstrap";

function EmployeeHeader(props) {
  const { name, img } = props;
  return (
    <>
      <Navbar className="navbar" fixed="top">
        <Container fluid>
          <Navbar.Brand href="https://qa.relevantz.com/">
            <h4>
              <span className="nav-text">Relevantz</span>
            </h4>
          </Navbar.Brand>
          <Nav className="justify-content-end align-item-center">
            {/* <Nav.Item>
              <span className="nav-text">{name}</span>
            </Nav.Item> */}
            <Nav.Item>
              <span className="nav-img">
                <img src={img} />
              </span>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default EmployeeHeader;
