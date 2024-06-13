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

function TotalNbultosSum(array) {
  const result = array?.reduce((total, item) => {
    if (parseInt(item.meta_data[0].value)) {
      return total + parseInt(item.meta_data[0].value);
    }
    return total + 0;
  }, 0);
  return result;
}

function processLineItems(lineItems) {
  // Resultado final
  const result = [];

  // Mapa para almacenar los productos por su id
  const itemMap = new Map();

  // Conjunto para rastrear los IDs de los productos ya agregados a result
  const addedProductIds = new Set();

  // Recorremos los line_items para crear un mapa y colocar los productos en el resultado
  lineItems.forEach((item) => {
    itemMap.set(item.id, item);
    result.push(item);
    addedProductIds.add(item.id); // Agregamos el ID del producto al conjunto
  });

  // Recorremos nuevamente para buscar los subProducts y reubicarlos
  lineItems.forEach((item) => {
    const metaData = item.meta_data || [];
    metaData.forEach((meta) => {
      if (meta.key === "subProducts" && Array.isArray(meta.value)) {
        const subProducts = meta.value;
        subProducts.forEach((subProduct) => {
          if (!addedProductIds.has(subProduct.id)) {
            const parent = itemMap.get(subProduct.idParent);
            if (parent) {
              // Encontramos el producto padre y lo agregamos después de este
              const parentIndex = result.indexOf(parent);
              if (parentIndex !== -1) {
                result.splice(parentIndex + 1, 0, subProduct);
                addedProductIds.add(subProduct.id); // Marcamos el subproducto como agregado
              }
            }
          }
        });
      }
    });
  });

  return result;
}

function getCurrentFormattedDate() {
  const now = new Date();
  const Time = new Date(now.getTime());
  return `${Time.toISOString().slice(0, -14)}T00:00:00`;
}
export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
    ordersLoading: false,
    ordersList: [],
    orderUpdateLoading: false,
    orderStatus: null,
    currentTab: "Pedidos de hoy",
    ordersArray: [],
    SearchOrder: [],
  }),
  actions: {
    async getOrders(id, path, rol, isSearch) {
      this.ordersLoading = true;
      try {
        const localStorageParsed = JSON.parse(
          localStorage.getItem("order_line_items")
        );
        const url = id.length
          ? `${BASE_URL}?include=${id}`
          : isSearch
          ? `${BASE_URL}?per_page=100&status=completed`
          : `${BASE_URL}?per_page=100&status=completed`;

        let response = await axios.get(url, AUTH_HEADER);
        if (response.data[0]?.line_items) {
          response.data[0].line_items = response.data[0]?.line_items.map(
            (e) => {
              return { ...e, checked: false };
            }
          );
        }

        if (path === "searchOrder") {
          if (isSearch) {
            this.SearchOrder = response.data;
          } else {
            let filt = "completado";
            if (rol == "logistica") filt = "preparado";
            if (rol == "conductor") filt = "despachado";

            const ordersToRender = response?.data?.filter((e) => {
              return !!e.meta_data[1] && e.meta_data[1].value == filt;
            });
            this.ordersList = ordersToRender;
            this.ordersArray = ordersToRender;
          }
        }

        const asddsa = processLineItems([
          {
            ...response.data[0],
            line_items: response?.data[0]?.line_items?.map((e) => {
              if (e.meta_data[5].value == "1") e.meta_data[5].value = true;
              return {
                ...e,
                meta_data: e.meta_data.map((i) => {
                  if (i.value == "1") {
                    return { ...i };
                  } else return i;
                }),
              };
            }),
          },
        ]);

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
          this.orders = asddsa;
          this.orders[0].line_items = processLineItems(
            response.data[0].line_items
          );
        } else {
          this.orders = asddsa;
          this.orders[0].line_items = processLineItems(asddsa[0].line_items);
        }
        this.orders[0].meta_data[2].value = TotalNbultosSum(
          processLineItems(asddsa[0].line_items)
        );
        } catch (error) {
          } finally {
        this.chanceTabOrder("Pedidos de hoy")
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
        this.orderStatus = response.data.firstName;
      } catch (error) {
      } finally {
        this.orderUpdateLoading = false;
      }
    },
    async updateOrderComments(id, comments) {
      this.orders[0] = { ...this.orders[0], comments: comments };
    },
    async updateOrderTotalBoxes(id, totalNumber) {
      this.orders[0].meta_data[3] = {
        ...this.orders[0].meta_data[3],
        value: parseInt(totalNumber),
      };
    },
    deleteSubproduct(id) {
      this.orders[0].line_items = this.orders[0]?.line_items.filter((e) => {
        return e.id !== id;
      });
    },
    chanceTabOrder(tab) {
      this.currentTab = tab;
      const todayDate = new Date(getCurrentFormattedDate());
      const ajasj = this.ordersArray.filter((e) => {
        return new Date(e.date_created) > todayDate;
      });
      const jsaja = this.ordersArray.filter((e) => {
        return new Date(e.date_created) < todayDate;
      });
      if (tab == "Pedidos de hoy") {
       return this.ordersList = ajasj
        } else if(tab == "Pedidos pendientes") {
        this.ordersList = jsaja

      }
    },
    async uploadFile(file) {
      try {
        const BASE_URL_WP = import.meta.env.VITE_WORDPRESS_BASE_URL;
        const formData = new FormData();
        formData.append("file", file);

        // Usa el token JWT para enviar la solicitud al endpoint de WordPress
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token JWT no encontrado");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const uploadResponse = await axios.post(
          `${BASE_URL_WP}/wp-json/custom/v1/upload`,
          formData,
          config
        );
        
        console.log("Archivo subido con éxito:", uploadResponse.data);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    },
  },
});
