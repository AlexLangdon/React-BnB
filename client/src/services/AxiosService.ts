import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class AxiosService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = this.initAxiosInstance();
    }

    private initAxiosInstance() {
        const newAxios = axios.create({
            baseURL: "/api",
            timeout: 3000
        });

        newAxios.interceptors.request.use((config: AxiosRequestConfig) => {
            const token = localStorage.getItem("bwm_user_token");

            if(token) {
                config.headers.authorization = `Bearer ${token}`;
            }

            return config;
        });

        return newAxios;
    }

    get reactBnBAxios() {
        return this.axiosInstance;
    }
}

// Shared singleton instance
export const axiosService = new AxiosService();