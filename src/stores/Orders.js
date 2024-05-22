import axios from "axios";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
    ordersLoading: false,
    orderDetails: {},
    orderUpdateLoading: false,
    orderStatus: null,
  }),
  actions: {
    getOrders(id) {
      this.ordersLoading = true;
        console.log(id);
        const url = id.length
          ? `https://bimwebsite.com/naturaeh/wp-json/wc/v3/orders?include=${id}`
          : "https://bimwebsite.com/naturaeh/wp-json/wc/v3/orders";
        const config = {
          headers: {
            Authorization:
              "Basic " +
              btoa(
                "ck_b381e199ec8ac5ca77257a5aeba21c62f8492ae2:cs_5378a078b9c6e78beca3d4ad6e1804fed3924d49"
              ),
          },
        };
        axios
          .get(url, config)
          .then((response) => {
            console.log(response.data);
            this.orders = response.data;
          })
          .then((response) => {
            this.ordersLoading = false;
          })
          .catch((error) => {
            console.error(error);
          });
      /* if (false) {
        this.orders.line_items = JSON.parse(localStorage.getItem("order_line_items"))
      } else {
        
      } */
    },
  },
  updateOrder(id, updatedData) {
    this.orderUpdateLoading = true;
    const url = `https://bimwebsite.com/naturaeh/wp-json/wc/v3/orders/${id}`;
    const config = {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            "ck_b381e199ec8ac5ca77257a5aeba21c62f8492ae2:cs_5378a078b9c6e78beca3d4ad6e1804fed3924d49"
          ),
      },
    };
    try {
      axios.put(url, updatedData, config).then((response) => {
        console.log(response.data);
        this.orderStatus = data.firstName;
      });
    } catch (error) {
      this.error = error.message;
    } finally {
      this.orderUpdateLoading = false;
    }
  },
});
