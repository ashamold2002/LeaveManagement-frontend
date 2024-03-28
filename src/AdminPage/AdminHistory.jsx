// import React, { useState, useEffect } from "react";

// import {
//   Form,
//   Row,
//   Col,
//   Card,
//   Button,
//   Table,
//   Container,
// } from "react-bootstrap";
// import Cookies from "js-cookie";

// import "./AdminProfile.css";
// import axios from "axios";

// function AdminHistory() {
//   const [history, setHistory] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const admin = Cookies.get("adminid");
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filterRequestsBySearchTerm = (requests) => {
//     return requests.filter((request) => {
//       const values = Object.values(request).join("").toLowerCase();
//       return values.includes(searchTerm.toLowerCase());
//     });
//   };

//   const response = axios.get(
//     `http://localhost:5052/api/Admin/GetAllRequests/${admin}`
//   );
//   setHistory(response.data);

//   console.log(response.data);

//   return (
//     <>
//       <Row className="search">
//         <Col></Col>
//         <Col>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               onChange={handleSearchChange}
//               value={searchTerm}
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-primary">Search</Button>
//           </Form>
//         </Col>
//         <Col></Col>
//       </Row>
//       <Table striped hover className="cardprofile">
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>From Date</th>
//             <th>To Date</th>
//             <th>Leave Type</th>
//             <th>No Of Days</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filterRequestsBySearchTerm(history).map((request, index) => (
//             <tr>
//               <td key={index}>{request.employeeName}</td>
//               <td>{request.fromDate}</td>
//               <td>{request.toDate}</td>
//               <td>{request.leaveType}</td>
//               <td>{request.noOfDays}</td>
//               <td>{request.reason}</td>
//               <td>{request.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </>
//   );
// }

// export default AdminHistory;

import React, { useState, useEffect } from "react";
import { Form, Row, Col, Table, Card, CardBody } from "react-bootstrap";
import axios from "axios";
import "./AdminProfile.css";
import Cookies from "js-cookie";

function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const admin = Cookies.get("adminid");
  const reversedLeave = [...history].reverse();

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5052/api/Admin/GetAllRequests/${admin}` // Replace with the actual admin ID
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterRequestsBySearchTerm = (requests) => {
    return requests.filter((request) => {
      const values = Object.values(request).join("").toLowerCase();
      return values.includes(searchTerm.toLowerCase());
    });
  };

  return (
    <>
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
      <Row className="cardprofile">
        <Card>
            <CardBody>
      <Table striped hover >
        <thead>
          <tr>
            <th>Employee Name</th>
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
              <td>{request.employeeName}</td>
              <td>{request.fromDate}</td>
              <td>{request.toDate}</td>
              <td>{request.leaveType}</td>
              <td>{request.noOfDays}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </CardBody>
      </Card>
      </Row>
    </>
  );
}

export default AdminHistory;

