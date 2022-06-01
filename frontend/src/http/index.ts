import axios, { AxiosRequestConfig } from "axios";

const API_URL = `http://localhost:3333/api/v1/`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
