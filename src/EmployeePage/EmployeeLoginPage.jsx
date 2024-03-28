import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Button,
  Alert,
  AlertHeading
} from "react-bootstrap";
import { useState } from "react";
import "./EmpLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



function EmployeeLoginPage() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState([]); 
    const [show, setShow] = useState(true);
    const navigate=useNavigate();
    

  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5052/api/Leave/CheckEmployee', { Email: email, Password: password });
      setEmployeeDetails(response.data);
      console.log(response.data);
      Cookies.set('employeeid', response.data.employee_id);
      const employeeId = response.data.employee_id;  // Assuming the response contains employeeId
      
       console.log(employeeId);
        navigate(`/employeeprofile/${employeeId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
       
        setLoginStatus('Login failed. User not found.');
      } else {
        
        setLoginStatus('An error occurred.');
      }
    }
  };
  return (
    <>
     <Row>
            {loginStatus &&<Col><Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Login Failed!</Alert.Heading>
        
      </Alert></Col> 
      }
            {employeeDetails.employee_id}
          </Row>
      <Container className="login-container">
        <Card
          style={{ width: "30rem" }}
          className="container shadow p-3 mb-5  rounded align-items-center justify-content-center mt-4"
        >
          <Row>
            <h2 className="text-center align-items-center justify-content-center">
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3 mt-1"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            >
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
        
         
            <Button
              type="submit"
              variant="primary"
              className="btn-login align-items-center justify-content-center"
              
            >
              Login
            </Button>
            
            </Form>
          </Row>
         
          
        </Card>
      </Container>
    </>
  );
}

export default EmployeeLoginPage;
