import React, { useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet
import styles from "./DashboardLayout.module.css";
const DashboardLayout = ({ adminName }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={styles.layout}>
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        adminName={adminName}
      />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
