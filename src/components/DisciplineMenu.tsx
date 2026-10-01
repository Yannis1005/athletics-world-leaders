import { NavLink } from "react-router-dom";

export default function DisciplineMenu() {
  return (
    <nav className="discipline-menu">
      <div className="discipline-menu-inner">
        <span className="discipline-label">DISCIPLINE</span>

        <NavLink
          to="/men/high-jump"
          className={({ isActive }) =>
            `discipline-link ${isActive ? "active" : ""}`
          }
        >
          High Jump
        </NavLink>

        <NavLink
          to="/men/100m"
          className={({ isActive }) =>
            `discipline-link ${isActive ? "active" : ""}`
          }
        >
          100m
        </NavLink>
      </div>
    </nav>
  );
}