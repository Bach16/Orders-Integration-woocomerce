import axios from "axios";
import { defineStore } from "pinia";
import {
  TotalNbultosSum,
  TotalVariosSum,
  findIndexByKey,
  findValueByKey,
} from "../plugins/util";

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
    todaysOrders: [],
    pendingOrders: [],
    orderUpdateLoading: false,
    orderStatus: null,
    currentTab: "Pedidos de hoy",
    ordersArray: [],
    SearchOrder: [],
    file: {},
    fileIsLoading: false,
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
        if (
          response?.data[0]?.line_items[0] &&
          !response?.data[0]?.line_items[0]?.meta_data.length
        ) {
          response.data[0].line_items[0].meta_data = [
            {
              key: "nbultos",
              value: "",
            },
            {
              key: "unidbultos",
              value: "",
            },
            {
              key: "totalunidades",
              value: "",
            },
            {
              key: "varios",
              value: "",
            },
            {
              key: "supervised",
              value: "",
            },
            {
              key: "revisado",
              value: "",
            },
            {
              key: "subProducts",
              value: [],
            },
          ];
        }
        if (response.data[0]?.line_items) {
          response.data[0].line_items = response.data[0]?.line_items.map(
            (e) => {
              return { ...e, checked: false };
            }
          );
        }
        const todayDate = new Date(getCurrentFormattedDate());

        const arrayTodayOrders = response.data.filter((e) => {
          return new Date(e.date_created) > todayDate;
        });
        const arrayPendingOrders = response.data.filter((e) => {
          return new Date(e.date_created) < todayDate;
        });
        if (path === "searchOrder") {
          if (isSearch) {
            this.SearchOrder = response.data;
          } else {
            let filt;
            switch (rol) {
              case "logistica":
                filt = "preparado";
                break;
              case "conductor":
                filt = "despachado";
                break;
              default:
                filt = "completado";
            }
            const filterByState = (orders, state) => {
              return orders?.filter((e) => {
                if (state == "completado") {
                  return (
                    findValueByKey(e?.meta_data, "estado_orden") ===
                      "completado" ||
                    findValueByKey(e?.meta_data, "estado_orden") ===
                      "por despachar"
                  );
                } else {
                  return findValueByKey(e?.meta_data, "estado_orden") === state;
                }
              });
            };

            const filteredTodayOrders = filterByState(arrayTodayOrders, filt);
            const filteredPendingOrders = filterByState(
              arrayPendingOrders,
              filt
            );
            const ordersToRender = filterByState(response?.data, filt);
            this.todaysOrders = filteredTodayOrders;
            this.pendingOrders = filteredPendingOrders;

            this.ordersList = ordersToRender;
            this.ordersArray = ordersToRender;
          }
        }
          const arrayConSubproductos = processLineItems([
            {
              ...response.data[0],
              line_items: response?.data[0]?.line_items?.map((e) => {
                console.log(e);
                if(!e.meta_data.length){
                  e.meta_data = [
                    {
                        key: "nbultos",
                        value: ""
                    },
                    {
                        key: "unidbultos",
                        value: ""
                    },
                    {
                        key: "totalunidades",
                        value: ""
                    },
                    {
                        key: "varios",
                        value: ""
                    },
                    {
                        key: "supervised",
                        value: ""
                    },
                    {
                        key: "revisado",
                        value: false
                    },
                    {
                        key: "subProducts",
                        value: []
                    }
                ]
                }
                if (e.meta_data[5]) {
                  if (e.meta_data[5].value == "1") {
                    e.meta_data[5].value = true;
                  } else e.meta_data[5].value = false;
                }
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
          console.log("1", arrayConSubproductos);
          this.orders = arrayConSubproductos;
          this.orders[0].line_items = processLineItems(
            response.data[0].line_items
          );
        } else {
          console.log("2", arrayConSubproductos);
          this.orders = arrayConSubproductos;
          this.orders[0].line_items = processLineItems(
            arrayConSubproductos[0].line_items
          );
        }
        this.orders[0].meta_data[
          findIndexByKey(this.orders[0].meta_data, "total_bultos")
        ].value = TotalNbultosSum(
          processLineItems(arrayConSubproductos[0].line_items)
        );
        this.orders[0].meta_data[
          findIndexByKey(this.orders[0].meta_data, "total_caja_varios")
        ].value = TotalVariosSum(
          processLineItems(arrayConSubproductos[0].line_items)
        );
      } catch (error) {
      } finally {
        if (path === "searchOrder") this.orders = [];
        this.chanceTabOrder("Pedidos de hoy");
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
      if (
        this?.orders[0]?.meta_data[
          findIndexByKey(this?.orders[0]?.meta_data, "custom_order_comments")
        ]
      ) {
        this.orders[0].meta_data[
          findIndexByKey(this.orders[0].meta_data, "custom_order_comments")
        ].value = comments;
      } else {
        this.orders[0].meta_data.push({
          key: "custom_order_comments",
          value: comments,
        });
      }
    },
    async updateOrderTotalBoxes(id, totalNumber) {
      this.orders[0].meta_data[3] = {
        ...this.orders[0].meta_data[this.orders[0].meta_data.length - 1],
        value: parseInt(totalNumber),
      };
    },
    async updateTotalNBultos(array) {
      this.orders[0].meta_data[
        findIndexByKey(this.orders[0].meta_data, "total_bultos")
      ].value = TotalNbultosSum(array);
    },
    async updateTotalVarios(array) {
      this.orders[0].meta_data[
        findIndexByKey(this.orders[0].meta_data, "total_caja_varios")
      ].value = TotalVariosSum(array);
    },
    deleteSubproduct(id) {
      this.orders[0].line_items = this.orders[0]?.line_items.filter((e) => {
        return e.id !== id;
      });
    },
    cleanOrder() {
      this.orders = [];
      this.pendingOrders = [];
    },
    chanceTabOrder(tab) {
      this.currentTab = tab;
      const todayDate = new Date(getCurrentFormattedDate());
      const TodayOrders = this.ordersArray.filter((e) => {
        return new Date(e.date_created) > todayDate;
      });
      const APendingOrders = this.ordersArray.filter((e) => {
        return new Date(e.date_created) < todayDate;
      });
      if (tab == "Pedidos de hoy") {
        return (this.todaysOrders = TodayOrders);
      } else if (tab == "Pedidos pendientes") {
        this.pendingOrders = APendingOrders;
      }
    },

    updateFile(file) {
      this.file = file;
    },

    async uploadFile(file, id) {
      try {
        const BASE_URL_WP = import.meta.env.VITE_WORDPRESS_BASE_URL;
        const formData = new FormData();
        formData.append("file", file);

        /*         const formData = this.createFile(file);
         */

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
        this.fileIsLoading = true;
        const uploadResponse = await axios.post(
          `${BASE_URL_WP}/wp-json/custom/v1/upload`,
          formData,
          config
        );
        this.file = { id, uploadResponse };

        const dataToUpdate = {
          meta_data: [
            {
              key: "_doc_file_url",
              value: uploadResponse.data.file_url,
            },
          ],
        };

        const response = await axios.put(
          `${BASE_URL}/${id}`,
          dataToUpdate,
          AUTH_HEADER
        );

        console.log("Archivo subido con éxito:", response.data);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      } finally {
        this.fileIsLoading = false;
      }
    },
  },
});
