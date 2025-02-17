import { create } from "zustand";
import { persist } from "zustand/middleware";
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

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      status: StatusEnum.IDLE,
      error: null,

      setProjects: (projects) => set({ projects }),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { id: crypto.randomUUID(), ...project }],
        })),

      updateProject: (id, updatedData) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedData } : project
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),

      fetchProjects: async (username, token) => {
        set({ status: StatusEnum.LOADING });

        try {
          const fetchedProjects = await fetchRepos(username, token);
          set({ projects: fetchedProjects, status: StatusEnum.SUCCESS });
        } catch (error) {
          set({
            status: StatusEnum.FAILED,
            error: error instanceof Error ? error.message : "Неизвестная ошибка",
          });
        }
      },
    }),
    {
      name: "projects-storage",
    }
  )
);






