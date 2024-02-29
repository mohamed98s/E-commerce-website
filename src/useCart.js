import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

let baseURL = "https://ecommerce.routemisr.com/api/v1";
let token = localStorage.getItem("userToken");
export function addToCart(productId) {
  return axios.post(
    `${baseURL}/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export async function getCart() {
  return await axios.get(`${baseURL}/cart`, {
    headers: {
      token,
    },
  });
}

export function deleteFromCart(id) {
  return axios.delete(`${baseURL}/cart/${id}`, {
    headers: {
      token,
    },
  });
}
export function updateCart({ id, count }) {
  return axios.put(
    `${baseURL}/cart/${id}`,
    { count },
    {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    }
  );
}
export function checkOut({ id, shippingAddress }) {
  return axios.post(
    `${baseURL}/orders/checkout-session/${id}?url=http://localhost:3000`,
    { shippingAddress },
    {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    }
  );
}

export async function clearCart() {
  return await axios.delete(`${baseURL}/cart`, {
    headers: {
      token,
    },
  });
}

export function useCartDel(fn) {
  const queryClient = useQueryClient();

  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success("Cart deleted successfully");
      queryClient.invalidateQueries("getcart");

    },
    onError: (data) => {
      // toast.error(data);
    },
  });
}
export function useCartCrud(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("getcart");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });
}

export function useCart(key, fn) {
  return useQuery(key, fn, {
    // enabled:false
  });
}
