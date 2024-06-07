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
function processLineItems(lineItems) {
  // Resultado final
  const result = [];
  
  // Mapa para almacenar los productos por su id
  const itemMap = new Map();
  
  // Conjunto para rastrear los IDs de los productos ya añadidos
  const addedIds = new Set();

  // Recorremos los line_items para crear un mapa y colocar los productos en el resultado
  lineItems.forEach(item => {
      itemMap.set(item.id, item);
      if (!addedIds.has(item.id)) {
          result.push(item);
          addedIds.add(item.id);
      }
  });

  // Recorremos nuevamente para buscar los subProducts y reubicarlos
  lineItems.forEach(item => {
      const metaData = item.meta_data || [];
      metaData.forEach(meta => {
          if (meta.key === 'subProducts' && Array.isArray(meta.value)) {
              const subProducts = meta.value;
              subProducts.forEach(subProduct => {
                  const parent = itemMap.get(subProduct.idParent);
                  if (parent) {
                      // Verificar si el subproducto ya ha sido añadido
                      if (!addedIds.has(subProduct.id)) {
                          // Encontramos el producto padre y lo agregamos después de este
                          const parentIndex = result.indexOf(parent);
                          if (parentIndex !== -1) {
                              result.splice(parentIndex + 1, 0, subProduct);
                              // Marcar el subproducto como añadido
                              addedIds.add(subProduct.id);
                          }
                      }
                  }
              });
          }
      });
  });

  return result;
}

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
              return { ...e, meta_data: {...e.meta_data,6:{...e.meta_data[6],value:!!e.meta_data[6].value
                }} };
            }
          );
          console.log(response.data[0].line_items);
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
            this.orders = response.data
          return this.orders[0].line_items = processLineItems(response.data[0].line_items)
        } else {
          this.orders = response.data;
          this.orders[0].line_items = processLineItems(response.data[0].line_items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.ordersLoading = false;
      }
    },
    async updateOrder(id, updatedData) {
/*       console.log(updatedData);
 */      this.orderUpdateLoading = true;
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
