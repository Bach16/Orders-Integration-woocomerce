import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";



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
    user: {},
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
          `${
            import.meta.env.VITE_JWT_URL
          }?username=${user}&password=${password}`
        );
        localStorage.setItem("token", tokenResponse.data.token);

        // Fetch user details
        const userResponse = await axios.get(
          `${import.meta.env.VITE_WORDPRESS_USER_URL}?context=edit`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.setItem("rol", userResponse.data.roles[0]);
        this.rol = userResponse.data.roles[0];
        this.user = userResponse.data;


        callback();
      } catch (error) {
        this.error = error.response.status;
      } finally {
        this.isLoading = false;
      }
    },

    async verifyToken(){
      // Fetch user details
      const userResponse = await axios.get(
        `${import.meta.env.VITE_WORDPRESS_USER_URL}?context=edit`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("rol", userResponse.data.roles[0]);
        this.rol = userResponse.data.roles[0];
        this.user = userResponse.data;
    },

    checkUser(user){

    const router = useRouter();
      

      if (Object.keys(user).length === 0 && user.constructor === Object){
        if(localStorage.getItem("token")){
          return this.verifyToken();
        } else {
          return router.push("/");
        }
      }
        return this.user;
    }
  },
});
