import axios from "axios";
import { logout } from "./auth";

const __URL = "http://127.0.0.1:8000";

class API {
    // instance axios
    api = axios.create({
        withCredentials: true,
        baseURL: __URL,
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    async csrf() {
        try {
            let csrf = await this.api.get("/sanctum/csrf-cookie");
            return csrf;
        } catch (error) {
            throw error;
        }
    }
    //   headers
    async get(url) {
        try {
            let data = await this.api.get("/api" + url);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async post(url, input, config = {}) {
        try {
            let data = await this.api.post("/api" + url, input, config);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async put(url, input) {
        try {
            let data = await this.api.put("/api" + url, input);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async delete(url) {
        try {
            let data = await this.api.delete("/api" + url);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default API;
