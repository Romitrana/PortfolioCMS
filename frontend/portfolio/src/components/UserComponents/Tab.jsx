import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

export default function Tab({ type, url, d }) {
  return (
    <motion.li
      key={url}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: d, // manual delay per item
          duration: 0.5,
          ease: "easeOut",
        },
        cursor: "pointer",
      }}
      whileHover={{ color: "var(--text-warningtext)" }} // Use CSS variable for theme-aware hover color
    >
      <NavLink
        to={url}
        style={({ isActive }) => ({
          color: "var(--text-color)", // base color from CSS variable
          textDecoration: "none",
          fontWeight: isActive ? "700" : "500", // Bold active link for clarity
        })}
        end // exact matching for root paths
      >
        {type}
      </NavLink>
    </motion.li>
  );
}
