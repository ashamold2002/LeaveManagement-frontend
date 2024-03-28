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
import { useNavigate} from "react-router-dom";
import { Form, Row, Col, Card, Button ,Table,Container} from "react-bootstrap";
import Cookies from "js-cookie";

import "./AdminProfile.css";
import axios from "axios";
import EmployeeHeader from "../EmployeePage/EmployeeHeader";
import { useContext } from "react";
import { adminContext } from "../App";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function AdminProfile() {
  const { id } = useParams();
  const { adminDetails, setAdminDetails } = useContext(adminContext);
  const [displayedInfo, setDisplayedInfo] = useState('');
  const[pending,setPending]=useState([]);
  const[approve,setApprove]=useState([]);
  const[reject,setReject]=useState([]);
  const reversedpending = [...pending].reverse();
  const reversedapprove = [...approve].reverse();
  const reversedreject = [...reject].reverse();
 
  const navigate=useNavigate();
  const admin =  Cookies.get("adminid");
  
 
  const handleButtonClick =async (buttonNumber) => {
    
    if (buttonNumber === 1) {
      const handleApprove= async (empid,leaveid)=>{
        try {
          
           
          const initialValues = {
              empid:empid,
              leaveid:leaveid,
            };
          const approveleave= await axios.post(`http://localhost:5052/api/Admin/ApproveRequest`,initialValues);
          console.log(approveleave.data);
          
          if (approveleave.status === 200) {
              // Successfully deleted
              // This will update the parent component's state
              window.alert("Request Approved successfully")

          }
      } catch (error) {
          if (error.response && error.response.status === 404) {
              window.alert('request not found.');
          } else {
             window. alert('An error occurred while deleting request.');
          }
      }

      }

      const handleDelete= async (empid,leaveid)=>{
        try {
          
           
          const initialValues = {
              empid:empid,
              leaveid:leaveid,
            };
          const approveleave= await axios.post(`http://localhost:5052/api/Admin/RejectRequest`,initialValues);
          console.log(approveleave.data);
          
          if (approveleave.status === 200) {
              // Successfully deleted
              // This will update the parent component's state
              window.alert("Request Rejected successfully")
              
          }
      } catch (error) {
          if (error.response && error.response.status === 404) {
              window.alert('request not found.');
          } else {
             window. alert('An error occurred while deleting request.');
          }
      }

      }
        try {
            
            
              
            const response = await axios.get(`http://localhost:5052/api/Admin/GetPendingRequests/${admin}`);
            
            setPending(response.data);
            Cookies.set("empid",response.data.empid);
            Cookies.set("leaveid",response.data.leaveId);
            // console.log(response.data)
            
            console.log(response.data);

            setDisplayedInfo(
            <>
            <Table striped hover>
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
                  {reversedpending.map((pending) => (
                    <tr key={pending.leaveId}>
                      <td>{pending.employeeName}</td>
                      <td>{pending.fromDate}</td>
                      <td>{pending.toDate}</td>
                      <td>{pending.leaveType}</td>
                      <td>{pending.noOfDays}</td>
                      <td>{pending.reason}</td>
                      <td>{pending.status}</td>
                      <td>
                        <Button variant="success" onClick={()=>handleApprove(pending.empid,pending.leaveId)}>{<DoneOutlineOutlinedIcon/>}</Button>
                        <Button className="btn-reject" variant="danger" onClick={()=>handleDelete(pending.empid,pending.leaveId)}>{<ClearOutlinedIcon/>}</Button>
                      </td>
                    </tr>
                  ))}
                    
                  </tbody>

            </Table>
              </>
               );
            
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                window.alert('request not found.');
            } else {
               window. alert('An error occurred ');
            }
        }
      
    } else if (buttonNumber === 2) {
        try {
             
            const response = await axios.get(`http://localhost:5052/api/Admin/GetApproveRequests/${admin}`);
            setApprove(response.data);
            
            console.log(response.data);
            setDisplayedInfo(<>
            <Table striped hover>
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
                  {reversedapprove.map((approve) => (
                    <tr>
                      <td key={approve.leaveId}>{approve.employeeName}</td>
                      <td>{approve.fromDate}</td>
                      <td>{approve.toDate}</td>
                      <td>{approve.leaveType}</td>
                      <td>{approve.noOfDays}</td>
                      <td>{approve.reason}</td>
                      <td>{approve.status}</td>
                      
                    </tr>
                  ))}
                    
                  </tbody>

            </Table>
               </>
               );
            
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                window.alert('request not found.');
            } else {
               window. alert('An error occurred ');
            }
        }
      
    } else if (buttonNumber === 3) {
        try {
            const response = await axios.get(`http://localhost:5052/api/Admin/GetRejectRequests/${admin}`);
            setReject(response.data);
            
            console.log(response.data);
            setDisplayedInfo(<>
            <Table striped hover>
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
                  {reversedreject.map((reject) => (
                    <tr>
                      <td key={reject.leaveId}>{reject.employeeName}</td>
                      <td>{reject.fromDate}</td>
                      <td>{reject.toDate}</td>
                      <td>{reject.leaveType}</td>
                      <td>{reject.noOfDays}</td>
                      <td>{reject.reason}</td>
                      <td>{reject.status}</td>
                      
                    </tr>
                  ))}
                    
                  </tbody>

            </Table>
               </>
               );
            
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                window.alert('request not found.');
            } else {
               window. alert('An error occurred ');
            }
        }
      
    }else if (buttonNumber === 4) {
      navigate('/adminhistory');
     
    }
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5052/api/Admin/GetIndividual/api/GetAdmin/${id}`)
      .then((response) => {
        setAdminDetails(response.data);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
    <Container className="admincontainerprofile">
      <Row>
        <EmployeeHeader
          name={adminDetails.adminName}
          img={adminDetails.adminImageName}
        />
      </Row>
      {/* <Row className="search">
        <Col></Col>
        <Col><Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={handleSearchChange}
              value={searchTerm}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
        </Form></Col>
        <Col></Col>
      
      </Row> */}
      <Row className="adminbodypage">
        <Col>
        <Card className="shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4">
            <Card.Body>
            <Button variant="text" onClick={() => handleButtonClick(1)}>Pending Requests</Button>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card className="shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4">
            <Card.Body>
                <Button variant="text" onClick={() => handleButtonClick(2)}>Approved Requests</Button>
            </Card.Body>
        </Card></Col>
        <Col>
        <Card className="shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4">
            <Card.Body>
            <Button variant="text" onClick={() => handleButtonClick(3)}>Rejected Requests</Button>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card className="shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4">
            <Card.Body>
            <Button variant="text" onClick={() => handleButtonClick(4)}>Request History</Button>
            </Card.Body>
        </Card>
        </Col>
      </Row>
      </Container>
      <Row>
        <Card >
            <Card.Body>
            {displayedInfo}
            
            </Card.Body>
        </Card>
      </Row>
    </>
  );
}

export default AdminProfile;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";
// import Cookies from "js-cookie";
// import axios from "axios";
// import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
 
// function AdminProfile() {
//   const { id } = useParams();
//   const [adminDetails, setAdminDetails] = useState({});
//   const [pending, setPending] = useState([]);
//   const [approve, setApprove] = useState([]);
//   const [reject, setReject] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
 
//   useEffect(() => {
//     const adminId = Cookies.get("adminid");
 
//     // Fetch admin details
// axios.get(`http://localhost:5052/api/Admin/GetIndividual/api/GetAdmin/${id}`)
//       .then((response) => {
//         setAdminDetails(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching admin data:", error);
//       });
 
//     // Fetch pending requests
// axios.get(`http://localhost:5052/api/Admin/GetPendingRequests/${adminId}`)
//       .then((response) => {
//         setPending(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching pending requests:", error);
//       });
 
//     // Fetch approved requests
// axios.get(`http://localhost:5052/api/Admin/GetApproveRequests/${adminId}`)
//       .then((response) => {
//         setApprove(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching approved requests:", error);
//       });
 
//     // Fetch rejected requests
// axios.get(`http://localhost:5052/api/Admin/GetRejectRequests/${adminId}`)
//       .then((response) => {
//         setReject(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching rejected requests:", error);
//       });
 
//   }, [id]);
 
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };
 
//   const filterRequestsBySearchTerm = (requests) => {
//     return requests.filter((request) => {
//       const values = Object.values(request).join('').toLowerCase();
//       return values.includes(searchTerm.toLowerCase());
//     });
//   };
 
//   return (
//     <>
//       {/* Your header component goes here */}
//       <Row className="search">
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
//       </Row>
//       <Row className="adminbodypage">
//         {/* Your buttons for pending, approved, and rejected requests go here */}
//       </Row>
//       <Row>
//         <Card>
//           <Card.Body>
//             <Table striped hover>
//               <thead>
//                 <tr>
//                   <th>Employee Name</th>
//                   <th>From Date</th>
//                   <th>To Date</th>
//                   <th>Leave Type</th>
//                   <th>No Of Days</th>
//                   <th>Reason</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Render pending requests */}
//                 {filterRequestsBySearchTerm(pending).map((request, index) => (
//                   <tr key={index}>
//                     <td>{request.employeeName}</td>
//                     <td>{request.fromDate}</td>
//                     <td>{request.toDate}</td>
//                     <td>{request.leaveType}</td>
//                     <td>{request.noOfDays}</td>
//                     <td>{request.reason}</td>
//                     <td>{request.status}</td>
//                     <td>
//                       <Button variant="success">
//                         <DoneOutlineOutlinedIcon />
//                       </Button>
//                       <Button className="btn-reject" variant="danger">
//                         <ClearOutlinedIcon />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//                 {/* Render approved requests */}
//                 {/* Render rejected requests */}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </Row>
//     </>
//   );
// }
 
// export default AdminProfile;
