import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "/portLogo.png";

const tabs = [
  { label: "Blogs", path: "blogs" },
  { label: "Skills", path: "skills" },
  { label: "Projects", path: "projects" },
  { label: "Certificates", path: "certificates" },
  { label: "Testimonials", path: "testimonials" },
  { label: "Achievements", path: "achievements" },
];

const tabIcons = {
  Blogs: "/assets/blogger.svg", // import your icons here for the collapsed view
  Skills: "/assets/skills2.svg",
  Projects: "/assets/project.svg",
  Certificates: "/assets/certificate.svg",
  Testimonials: "/assets/testimonial.svg",
  Achievements: "/assets/achievement.svg",
};

const Sidebar = ({ collapsed, toggleCollapse, adminName }) => (
  <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
    <div className={styles.header}>
      {/* Logo click toggles collapse */}
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      />
      {/* Removed collapse button */}
    </div>
    {!collapsed && (
      <div className={styles.adminName}>{adminName || "Admin"}</div>
    )}
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={`/admin/${tab.path}`}
          className={({ isActive }) =>
            [
              styles.tab,
              isActive ? styles.active : "",
              collapsed ? styles.collapsedIcon : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
          end
        >
          {collapsed ? (
            <img
              src={tabIcons[tab.label]}
              alt={tab.label}
              style={{ height: 24, width: 24 }}
              title={tab.label}
              onClick={toggleCollapse} // you can remove it
            />
          ) : (
            tab.label
          )}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
