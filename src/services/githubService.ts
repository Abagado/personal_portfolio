import axios from 'axios';
import { Project } from '../store/useProjectStore';


const GITHUB_API_URL = 'https://api.github.com';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  owner: { avatar_url: string };
}

export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
  const response = await axios.get<GitHubRepo[]>(`${GITHUB_API_URL}/users/${username}/repos`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });

  return response.data.map((repo) => ({
    id: repo.id.toString(), 
    name: repo.name,
    description: repo.description || 'Нет описания', 
    icon: repo.owner.avatar_url || 'https://via.placeholder.com/64?text=No+Image', 
  }));
};
