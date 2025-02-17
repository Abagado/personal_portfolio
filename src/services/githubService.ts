import axios from "axios";
import { Project } from "../store/useProjectStore";
import { delay } from "../utils/delay";

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  timeout: 5000,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  owner: { avatar_url: string };
}

export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await githubAPI.get<GitHubRepo[]>(`/users/${username}/repos`, {
        headers: token ? { Authorization: `token ${token}` } : {},
      });

      return response.data.map((repo) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || "Нет описания",
        icon: repo.owner.avatar_url || "https://via.placeholder.com/64?text=No+Image",
      }));
    } catch (error) {
      attempt++;
      console.error(`Ошибка запроса к GitHub API. Попытка ${attempt} из ${MAX_RETRIES}`, error);

      if (attempt >= MAX_RETRIES) {
        throw new Error("Не удалось загрузить репозитории после нескольких попыток.");
      }

      await delay(500 * attempt);
    }
  }

  return [];
};


