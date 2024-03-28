import pkg from "../../package.json";
import axios from "axios";

const { baseURL } = pkg;

export const Instance = axios.create({
  baseURL,
});
