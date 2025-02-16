import { create } from "zustand";
import { loadProjectsFromStorage, saveProjectsToStorage } from "../utils/localStorageService";
import { fetchRepos } from "../services/githubService"; 

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum StatusEnum {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  SUCCESS = "success",
}

interface ProjectState {
  projects: Project[];
  status: StatusEnum;
  error: string | null;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, updatedData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  fetchProjects: (username: string, token?: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: loadProjectsFromStorage(), // Загружаем проекты из localStorage при инициализации
  status: StatusEnum.IDLE,
  error: null,

  setProjects: (projects) => {
    saveProjectsToStorage(projects);
    set({ projects });
  },

  addProject: (project) =>
    set((state) => {
      const newProject = { id: crypto.randomUUID(), ...project };
      const updatedProjects = [...state.projects, newProject];
      saveProjectsToStorage(updatedProjects);
      return { projects: updatedProjects };
    }),

  updateProject: (id, updatedData) =>
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === id ? { ...project, ...updatedData } : project
      );
      saveProjectsToStorage(updatedProjects);
      return { projects: updatedProjects };
    }),

  deleteProject: (id) =>
    set((state) => {
      const updatedProjects = state.projects.filter((project) => project.id !== id);
      saveProjectsToStorage(updatedProjects);
      return { projects: updatedProjects };
    }),

  fetchProjects: async (username: string, token?: string) => {
    set({ status: StatusEnum.LOADING });

    try {
      const fetchedProjects = await fetchRepos(username, token); 

      set({ projects: fetchedProjects, status: StatusEnum.SUCCESS });
      saveProjectsToStorage(fetchedProjects); 
    } catch (error) {
      set({
        status: StatusEnum.FAILED,
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  },
}));




