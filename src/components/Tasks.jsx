import React from "react";
import CheckBox from "./Checkbox";
import { useTasks } from "../hooks";

export const Tasks = () => {
  const { tasks } = useTasks("1");
  let projectName = "";
  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <CheckBox />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
