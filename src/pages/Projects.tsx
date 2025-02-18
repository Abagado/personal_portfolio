import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSync } from "react-icons/fa";
import { useProjectStore, StatusEnum } from "../store/useProjectStore";
import { loadProjectsFromStorage } from "../utils/localStorageService";
import { Spinner } from "../components/Spinner";
import { FALLBACK_IMAGE_URL } from "../constants";
import { useTheme } from "../context/ThemeContext";

interface ProjectFormState {
  name: string;
  description: string;
  icon: string;
  error: string;
  id?: string;
}

export const Projects = () => {
  const projects = useProjectStore((state) => state.projects);
  const status = useProjectStore((state) => state.status) as StatusEnum;
  const error = useProjectStore((state) => state.error);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const [formState, setFormState] = useState<ProjectFormState>({
    name: import.meta.env.VITE_DEFAULT_NAME || "",
    description: import.meta.env.VITE_DEFAULT_DESCRIPTION || "",
    icon: import.meta.env.VITE_DEFAULT_ICON || "",
    error: import.meta.env.VITE_DEFAULT_ERROR || "",
    id: undefined,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const githubUsername = "";
  const githubToken = "";
  const { theme } = useTheme();

  useEffect(() => {
    const storedProjects = loadProjectsFromStorage();
    useProjectStore.getState().setProjects(storedProjects);
    fetchProjects(githubUsername, githubToken);
  }, [fetchProjects]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value, error: "" });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, icon, id } = formState;

    if (!name || !description || !icon) {
      setFormState((prev) => ({ ...prev, error: "Заполните все поля!" }));
      return;
    }

    if (id) {
      updateProject(id, { name, description, icon });
    } else {
      addProject({ name, description, icon });
    }

    setFormState({
      name: "",
      description: "",
      icon: "",
      id: undefined,
      error: "",
    });
    setIsFormVisible(false);
  };

  const handleFetchProjects = () => {
    fetchProjects(githubUsername, githubToken);
  };

  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen ${
        theme === "light" ? "light-gradient" : "dark-gradient"
      } px-5 py-12 relative`}
    >
      <h1 className="text-5xl font-extrabold text-green-600 mb-10">
        Мои проекты
      </h1>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6 flex items-center justify-center"
        onClick={handleFetchProjects}
      >
        <FaSync className="mr-2" />
        Обновить проекты
      </button>

      {status === StatusEnum.LOADING && <Spinner />}
      {status === StatusEnum.FAILED && (
        <div className="text-red-500">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={project.icon}
              alt="Project Icon"
              className="w-16 h-16 mb-4 rounded-full object-cover"
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {project.name}
            </h2>
            <p className="mt-2 text-center text-gray-600">
              {project.description}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                onClick={() => {
                  setFormState({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    icon: project.icon,
                    error: "",
                  });
                  setIsFormVisible(true);
                }}
              >
                <FaEdit className="mr-2" /> Редактировать
              </button>
              <button
                className="flex items-center px-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => deleteProject(project.id)}
              >
                <FaTrash className="mr-2" /> Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-10 right-10">
        <button
          className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition"
          onClick={() => {
            setFormState({
              name: "",
              description: "",
              icon: "",
              error: "",
              id: undefined,
            });
            setIsFormVisible(true);
          }}
        >
          <FaPlus size={24} />
        </button>
      </div>

      {isFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <form
            className={`p-6 rounded-lg shadow-lg w-96 transition-colors ${
              theme === "light"
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
            }`}
            onSubmit={handleSaveProject}
          >
            <h3 className="text-2xl font-bold mb-4">
              {formState.id ? "Редактировать проект" : "Добавить проект"}
            </h3>
            {formState.error && (
              <p className="text-red-500">{formState.error}</p>
            )}
            <input
              type="text"
              name="name"
              placeholder="Название"
              value={formState.name}
              onChange={handleInputChange}
              className={`w-full mb-4 p-2 border rounded ${
                theme === "light"
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-800 text-white"
              }`}
            />
            <textarea
              name="description"
              placeholder="Описание"
              value={formState.description}
              onChange={handleInputChange}
              className={`w-full mb-4 p-2 border rounded ${
                theme === "light"
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-800 text-white"
              }`}
            />
            <input
              type="text"
              name="icon"
              placeholder="Ссылка на иконку"
              value={formState.icon}
              onChange={handleInputChange}
              className={`w-full mb-4 p-2 border rounded ${
                theme === "light"
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-800 text-white"
              }`}
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  theme === "light"
                    ? "bg-gray-300 text-black"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => setIsFormVisible(false)}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
