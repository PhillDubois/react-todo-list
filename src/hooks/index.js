import { useEffect, useState } from "react";
import { moment } from "moment";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "95034400-d26e-4056-b67e-f8bae445bd96");

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
    } else if (selectedProject === "TODAY") {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        moment().format("DD/MM/YYYY")
      );
    } else if (selectedProject === "INBOX" || selectedProject === 0) {
      unsubscribe = unsubscribe.where("date", "==", "");
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        newTasks.filter(
          (task) =>
            (selectedProject !== "NEXT_7" ||
              moment(task.date, "DD-MM-YYY").diff(moment(), "days") <= 7) &&
            task.archived !== true
        )
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "95034400-d26e-4056-b67e-f8bae445bd96")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        // Verify if projects have changed, to avoid infinite loop when setProjects
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
