import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue;
  const [active, setActive] = useState("inbox");
  const [showProjects, setProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      {/* Generics */}

      <ul className="sidebar__generic">
        <li className="inbox" data-testid="inbox">
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li className="today" data-testid="today">
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li className="next_7" data-testid="next_7">
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>

      {/* Projects */}

      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
