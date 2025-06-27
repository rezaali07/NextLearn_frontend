// src/component/Admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <Sidebar />
      <div className="dashboardContent">
        <h1>Admin Dashboard</h1>

        <div className="dashboardCards">
          <Link to="/admin/courses" className="card">
            <h2>Courses</h2>
            <p>Manage all courses</p>
          </Link>

          <Link to="/admin/users" className="card">
            <h2>Users</h2>
            <p>View and manage users</p>
          </Link>

          <Link to="/admin/addCourse" className="card">
            <h2>Add Course</h2>
            <p>Create a new course</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;