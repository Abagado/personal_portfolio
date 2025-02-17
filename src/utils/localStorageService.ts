import { z } from "zod";
import { Project } from "../store/useProjectStore";

const PROJECTS_STORAGE_KEY = "projects";

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string().url().or(z.literal("")),
});

const ProjectsArraySchema = z.array(ProjectSchema);

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    
    if (!storedProjects) return [];

    const parsedProjects = JSON.parse(storedProjects);

    const result = ProjectsArraySchema.safeParse(parsedProjects);

    if (!result.success) {
      console.error("Неверный формат данных в localStorage", result.error);
      return [];
    }

    return result.data;
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


