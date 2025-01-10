import axios from "axios";
import { base_url } from "./Api";

export const axiosInstance = axios.create({
    baseURL : base_url
})