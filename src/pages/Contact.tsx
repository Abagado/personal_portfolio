import React, { useReducer } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

interface FormState {
  name: string;
  email: string;
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

interface FormAction {
  type: "SET_FIELD" | "SET_ERRORS" | "RESET";
  payload?: {
    field?: keyof Omit<FormState, "errors">;
    value?: string;
    errors?: FormState["errors"];
  };
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  errors: {},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      if (action.payload?.field && action.payload.value !== undefined) {
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      }
      return state;
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload?.errors || {},
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};


const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const ERROR_MESSAGES = {
  REQUIRED_NAME: "Введите ваше имя.",
  REQUIRED_EMAIL: "Введите ваш email.",
  INVALID_EMAIL: "Введите корректный email.",
  REQUIRED_MESSAGE: "Введите сообщение.",
};

export const Contact = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { name, email, message, errors } = state;

  const validateForm = (): FormState["errors"] => {
    const newErrors: FormState["errors"] = {};
    if (!name.trim()) newErrors.name = ERROR_MESSAGES.REQUIRED_NAME;
    if (!email.trim()) {
      newErrors.email = ERROR_MESSAGES.REQUIRED_EMAIL;
    } else if (!validateEmail(email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }
    if (!message.trim()) newErrors.message = ERROR_MESSAGES.REQUIRED_MESSAGE;
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: { errors: validationErrors } });
      return;
    }

    dispatch({ type: "RESET" });
  };

  const handleFieldChange = (field: keyof Omit<FormState, "errors">, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center w-full min-h-screen ${theme === "light" ? "light-gradient" : "dark-gradient"} px-5 py-12`}>
      <h1 className="text-5xl font-extrabold text-green-600 mb-8">Связаться со мной</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-10 leading-relaxed">
        Если у вас есть вопросы, предложения или просто хотите поздороваться, я всегда рада общению!
        Используйте любой удобный способ связи.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
          <FaEnvelope className="text-4xl text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Электронная почта</h2>
          <p className="text-gray-600">sokirkina.dv@dvfu.ru</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
          <FaPhoneAlt className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Телефон</h2>
          <p className="text-gray-600">+7 (950) 907-46-08</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
          <FaMapMarkerAlt className="text-4xl text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Местоположение</h2>
          <p className="text-gray-600">Владивосток, Россия</p>
        </div>
      </div>

      <div className="mt-12 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Или отправьте форму</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Имя
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className={`w-full mt-1 p-2 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={`w-full mt-1 p-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Сообщение
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => handleFieldChange("message", e.target.value)}
              className={`w-full mt-1 p-2 border rounded-lg ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};


