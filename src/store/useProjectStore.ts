import { create } from "zustand";

interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, updatedData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  loadProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  addProject: (project) => {
    set((state) => {
      const newProject = {
        id: crypto.randomUUID(),
        ...project,
      };
      const updatedProjects = [...state.projects, newProject];

      try {
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Ошибка сохранения в localStorage:", error);
      }

      return { projects: updatedProjects };
    });
  },

  updateProject: (id, updatedData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === id ? { ...project, ...updatedData } : project
      );

      try {
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Ошибка обновления localStorage:", error);
      }

      return { projects: updatedProjects };
    });
  },

  deleteProject: (id) => {
    set((state) => {
      const updatedProjects = state.projects.filter((project) => project.id !== id);

      try {
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Ошибка удаления из localStorage:", error);
      }

      return { projects: updatedProjects };
    });
  },

  loadProjects: (projects) => {
    set({ projects });
  },
}));
