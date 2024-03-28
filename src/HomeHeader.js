import React from 'react';
import "./HomeHeader.css";
import {Navbar,Container ,Nav} from 'react-bootstrap'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

function HomeHeader() {
  return (
    <>

   
        <Navbar className='navbar'fixed="top">
        <Container>
          <Navbar.Brand href="https://qa.relevantz.com/">
           
            <h4><span className='nav-text'>Relevantz</span></h4>
          </Navbar.Brand>
          <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link href="/adminlogin"><span className='nav-text'><AdminPanelSettingsOutlinedIcon/>Admin</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login"><span className='nav-text'><PeopleOutlinedIcon/>Employee</span></Nav.Link>
        </Nav.Item>
        
      </Nav>
        </Container>
        
     
        </Navbar>
        
    
    </>
  )
}

export default HomeHeader