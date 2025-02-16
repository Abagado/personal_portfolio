import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useProjectStore } from "../store/useProjectStore";
import { loadProjectsFromStorage, saveProjectsToStorage } from "../utils/localStorageService";


interface ProjectFormState {
  name: string;
  description: string;
  icon: string;
  id?: string;
  error: string;
}

export const Projects = () => {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const loadProjects = useProjectStore((state) => state.loadProjects);

  const [formState, setFormState] = useState<ProjectFormState>({
    name: "",
    description: "",
    icon: "",
    error: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const storedProjects = loadProjectsFromStorage();
    if (storedProjects) {
      loadProjects(storedProjects);
    }
  }, [loadProjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    saveProjectsToStorage(projects);
    setFormState({ name: "", description: "", icon: "", id: undefined, error: "" });
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-white to-green-100 px-5 py-12 relative">
      <h1 className="text-5xl font-extrabold text-green-600 mb-10">Мои проекты</h1>

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
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/64?text=No+Image")}
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800">{project.name}</h2>
            <p className="mt-2 text-center text-gray-600">{project.description}</p>
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
            setFormState({ name: "", description: "", icon: "", error: "" });
            setIsFormVisible(true);
          }}
        >
          <FaPlus size={24} />
        </button>
      </div>

      {isFormVisible && (
        <form
          onSubmit={handleSaveProject}
          className="fixed bottom-20 right-10 bg-white p-6 shadow-lg rounded-lg w-80"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {formState.id ? "Редактировать проект" : "Добавить проект"}
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Название проекта"
            value={formState.name}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="description"
            placeholder="Описание проекта"
            value={formState.description}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <input
            type="text"
            name="icon"
            placeholder="Ссылка на изображение"
            value={formState.icon}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {formState.error && <p className="text-red-500 mb-2">{formState.error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
          >
            {formState.id ? "Сохранить изменения" : "Добавить"}
          </button>
        </form>
      )}
    </div>
  );
};

