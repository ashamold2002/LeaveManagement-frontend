import React, { useState } from "react";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import Home from "./Home";
import EmployeeLoginPage from "./EmployeePage/EmployeeLoginPage";
import EmploeeProfilePage from "./EmployeePage/EmploeeProfilePage";
import LeaveApplyPage from "./EmployeePage/LeaveApplyPage";
import EmployeePermissionApply from "./EmployeePage/EmployeePermissionApply";
import ApplyOnDuty from "./EmployeePage/ApplyOnDuty";
import EmployeeStatus from "./EmployeePage/EmployeeStatus";
import AdminLogin from "./AdminPage/AdminLogin";
import AdminProfile from "./AdminPage/AdminProfile";
import AdminHistory from "./AdminPage/AdminHistory";

// Create context for employee details
export const empContext = createContext();

// Create context for admin details
export const adminContext = createContext();

function App() {
  const [empDetails, setEmpDetails] = useState([]);
  const [adminDetails, setAdminDetails] = useState([]);

  return (
    <BrowserRouter>
    
      <empContext.Provider value={{ empDetails, setEmpDetails }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EmployeeLoginPage />} />
          <Route path="/employeeprofile/:id" element={<EmploeeProfilePage />} />
          <Route path="/ApplyLeave/:id" element={<LeaveApplyPage emp={empDetails} />} />
          <Route path="/ApplyPermission" element={<EmployeePermissionApply />} />
          <Route path="/ApplyOnDuty" element={<ApplyOnDuty />} />
          <Route path="/ViewStatus/:id" element={<EmployeeStatus />} />
        </Routes>
      </empContext.Provider>

      <adminContext.Provider value={{ adminDetails, setAdminDetails }}>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminprofile/:id" element={<AdminProfile />} />
          <Route path="/adminhistory" element={<AdminHistory />} />
        </Routes>
      </adminContext.Provider>
    </BrowserRouter>
  );
}

export default App;
