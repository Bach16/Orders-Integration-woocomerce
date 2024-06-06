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

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
    ordersLoading: false,
    ordersList: [],
    orderUpdateLoading: false,
    orderStatus: null,
  }),
  actions: {
    async getOrders(id, path) {
      console.log(id);
      this.ordersLoading = true;
      function getCurrentFormattedDate() {
        const now = new Date();
        const Time = new Date(
          now.getTime()
        );
        return `${Time.toISOString().slice(0,-14)}T00:00:00Z`;
      }
      console.log(getCurrentFormattedDate());
      try {
        const localStorageParsed = JSON.parse(
          localStorage.getItem("order_line_items")
        );
        const url = id.length ? `${BASE_URL}?include=${id}` : `${BASE_URL}?per_page=100&after=${getCurrentFormattedDate()}&status=completed`;
        let response = await axios.get(url, AUTH_HEADER);

        if (response.data[0]?.line_items) {
          response.data[0].line_items = response.data[0]?.line_items.map(
            (e) => {
              return { ...e, checked: false };
            }
          );
        }

        if (path === "searchOrder") {
          this.ordersList = response.data;
        }

        if (localStorageParsed) {
          if (id in localStorageParsed) {
            response.data[0] = localStorageParsed[id];
          } else {
            if (!!id) {
              localStorage.setItem(
                "order_line_items",
                JSON.stringify({
                  ...localStorageParsed,
                  [id]: response.data[0],
                })
              );
            }
          }
          return (this.orders = response.data);
        } else {
          this.orders = response.data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.ordersLoading = false;
      }
    },
    async updateOrder(id, updatedData) {
      console.log(updatedData);
      this.orderUpdateLoading = true;
      try {
        const response = await axios.put(
          `${BASE_URL}/${id}`,
          updatedData,
          AUTH_HEADER
        );
        this.orderStatus = response.data.firstName;
      } catch (error) {
        console.error(error.message);
      } finally {
        this.orderUpdateLoading = false;
      }
    },
    async updateOrderComments(id, comments) {
      this.orders[0] = { ...this.orders[0], comments: comments };
    },
    async updateOrderTotalBoxes(id, totalNumber) {
      this.orders[0] = {
        ...this.orders[0],
        totalVariousBoxes: parseInt(totalNumber),
      };
    },
    deleteSubproduct(id) {
      this.orders[0].line_items = this.orders[0]?.line_items.filter((e) => {
        return e.id !== id;
      });
    },
  },
});
