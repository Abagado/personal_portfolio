import { Project } from "../store/useProjectStore"; 

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) as Project[] : [];
  } catch (error) {
    console.error("Ошибка при загрузке проектов из localStorage:", error);
    return [];
  }
};

export const saveProjectsToStorage = (projects: Project[]): void => {
  try {
    localStorage.setItem("projects", JSON.stringify(projects));
  } catch (error) {
    console.error("Ошибка при сохранении проектов в localStorage:", error);
  }
};
