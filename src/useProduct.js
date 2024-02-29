import axios from "axios";
import { useQuery } from "react-query";

export function getData() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}
export function getProduct(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export function useProduct(key, fn) {
  return useQuery(key, fn, {
    select: (data) => data.data.data,
  });
}
