import { Project } from "../store/useProjectStore";

const PROJECTS_STORAGE_KEY = "projects";

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    
    if (!storedProjects) return [];

    const parsedProjects = JSON.parse(storedProjects);

    if (
      !Array.isArray(parsedProjects) ||
      !parsedProjects.every((p) => 
        typeof p === "object" &&
        typeof p.id === "string" &&
        typeof p.name === "string" &&
        typeof p.description === "string" &&
        typeof p.icon === "string"
      )
    ) {
      console.error("Неверный формат данных в localStorage");
      return [];
    }

    return parsedProjects as Project[];
  } catch (error) {
    console.error("Ошибка при загрузке проектов из localStorage:", error);
    return [];
  }
};

export const saveProjectsToStorage = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Ошибка при сохранении проектов в localStorage:", error);
  }
};

