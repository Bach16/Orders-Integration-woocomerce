import axios from "axios";
import { defineStore } from "pinia";

const BASE_URL = "https://bimwebsite.com/naturaeh/wp-json/wc/v3/orders";
const AUTH_HEADER = {
  headers: {
    Authorization:
      "Basic " +
      btoa(
        "ck_b381e199ec8ac5ca77257a5aeba21c62f8492ae2:cs_5378a078b9c6e78beca3d4ad6e1804fed3924d49"
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
      this.ordersLoading = true;
      try {
        const localStorageParsed = JSON.parse(
          localStorage.getItem("order_line_items")
        );
        const url = id.length ? `${BASE_URL}?include=${id}` : BASE_URL;
        let response = await axios.get(url, AUTH_HEADER);

        if (response.data[0]?.line_items) {
          response.data[0].line_items = response.data[0]?.line_items.map((e) => {return { ...e, checked: false };})
        }

        if (path === "searchOrder") {
          this.ordersList = response.data;
        }

        if (localStorageParsed) {
          if (id in localStorageParsed) {
            response.data[0] = localStorageParsed[id];
          } else {
            localStorage.setItem(
              "order_line_items",
              JSON.stringify({
                ...localStorageParsed,
                [id]: response.data[0],
              })
            );
          }
          return this.orders = response.data
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
      this.orderUpdateLoading = true;
      try {
        const response = await axios.put(
          `${BASE_URL}/${id}`,
          updatedData,
          AUTH_HEADER
        );
        console.log(response.data);
        this.orderStatus = response.data.firstName;
      } catch (error) {
        console.error(error.message);
      } finally {
        this.orderUpdateLoading = false;
      }
    },
    async updateOrderComments(id,comments) {
      this.orders[0] = {...this.orders[0],comments:comments};
      console.log(this.orders[0]);
    },
  },
});
