import { NavLink } from "react-router-dom";

export default function CustomNavLink({ type, url }) {
  const handleScroll = (e) => {
    // prevent routing for same-page links
    e.preventDefault();
    const sectionId = url.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSectionLink = url.startsWith("#");

  return isSectionLink ? (
    // same-page smooth scroll
    <a
      href={url}
      onClick={handleScroll}
      style={{
        color: "var(--text-color)",
        textDecoration: "none",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      {type}
    </a>
  ) : (
    // normal route link
    <NavLink
      to={url}
      style={({ isActive }) => ({
        color: "var(--text-color)",
        textDecoration: "none",
        fontWeight: isActive ? "700" : "500",
      })}
      end
    >
      {type}
    </NavLink>
  );
}
