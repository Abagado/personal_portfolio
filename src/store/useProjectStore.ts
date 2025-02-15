
import {create} from 'zustand';
import axios from 'axios';


export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
}


interface ProjectState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updatedData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  fetchProjects: (username: string, token?: string) => Promise<void>;
}

const GITHUB_API_URL = 'https://api.github.com';

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  status: 'idle',
  error: null,
  setProjects: (projects) => set({ projects }),

  addProject: (project) => set((state) => {
    const newProject = { id: crypto.randomUUID(), ...project }; 
    const updatedProjects = [...state.projects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    return { projects: updatedProjects };
  }),

  updateProject: (id, updatedData) => set((state) => {
    const updatedProjects = state.projects.map((project) =>
      project.id === id ? { ...project, ...updatedData } : project
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    return { projects: updatedProjects };
  }),

  deleteProject: (id) => set((state) => {
    const updatedProjects = state.projects.filter((project) => project.id !== id);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    return { projects: updatedProjects };
  }),

  // Получение проектов с GitHub
  fetchProjects: async (username: string, token?: string) => {
    set({ status: 'loading' });
    try {
      const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
        headers: token ? { Authorization: `token ${token}` } : {},
      });

      const fetchedProjects: Project[] = response.data.map((repo: { id: string; name: string; description: string; owner: { avatar_url: string } }) => ({
        id: repo.id, 
        name: repo.name,
        description: repo.description || 'Нет описания',
        icon: repo.owner.avatar_url,
      }));

      // Обновляем список проектов с GitHub
      set({ projects: fetchedProjects, status: 'succeeded' });
    } catch (error) {
      set({ status: 'failed', error: error instanceof Error ? error.message : 'Неизвестная ошибка' });
    }
    },
}));


