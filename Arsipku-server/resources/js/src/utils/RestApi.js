import axios from "axios";

const __URL = "http://127.0.0.1:8000";

class API {
    // instance axios
    __instance = axios.create({
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
            let csrf = await this.__instance.get("/sanctum/csrf-cookie");
            return csrf;
        } catch (error) {
            throw error;
        }
    }
    //   headers
    async get(url) {
        try {
            let data = await this.__instance.get("/api" + url);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async post(url, input) {
        try {
            let data = await this.__instance.post("/api" + url, input);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async put(url, input) {
        try {
            let data = await this.__instance.put("/api" + url, input);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async delete(url) {
        try {
            let data = await this.__instance.delete("/api" + url);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default API;
