import axios from "axios";

axios.interceptors.request.use(config => {
  const lang = localStorage.getItem("app_lang") || "uz";
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.headers["Accept-Language"] = lang;

  if (config.method === "patch") {
    config.headers["Content-Type"] =
      "application/merge-patch+json";
  } else {
    config.headers["Content-Type"] =
      "application/ld+json";
  }

  config.baseURL =
    import.meta.env.VITE_API_URL + "/api";

  return config;
});

export default axios;
