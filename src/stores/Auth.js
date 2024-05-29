import axios from "axios";
import { defineStore } from "pinia";

const BASE_URL = import.meta.env.VITE_ECOMMERCE_URL;
const AUTH_HEADER = {
  headers: {
    Authorization:
      "Basic " +
      btoa(
        `${import.meta.env.VITE_ECOMMERCE_USERNAME}:${
          import.meta.env.VITE_ECOMMERCE_PASSWORD
        }`
      ),
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    rol: "",
    error: 0,
    isLoading: false,
  }),
  actions: {
    async login(user, password, callback) {
      this.isLoading = true;
      try {
        // Request for the JWT token
        const tokenResponse = await axios.post(
          `http://test.local/wp-json/jwt-auth/v1/token?username=${user}&password=${password}`
        );
        localStorage.setItem("token", tokenResponse.data.token);

        // Fetch user details
        const userResponse = await axios.get(
          "http://test.local/wp-json/wp/v2/users/me?context=edit",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        localStorage.setItem("rol", userResponse.data.roles[0]);
        this.rol = userResponse.data.roles[0];

        callback();
      } catch (error) {
        this.error = error.response.status
          console.error("An error occurred:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
