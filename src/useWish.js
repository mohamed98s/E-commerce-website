import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

let baseURL = "https://ecommerce.routemisr.com/api/v1";
let token = localStorage.getItem("userToken");


export function addToWish(productId) {
    return axios.post(
      `${baseURL}/wishlist`,
      { productId },
      {
        headers: {
          token,
        },
      }
    );
  }

  export function getWish() {
    return axios.get(`${baseURL}/wishlist`, {
      headers: {
        token,
      },
    });
  }

  export function deleteFromWish(id) {
    return axios.delete(`${baseURL}/wishlist/${id}`, {
      headers: {
        token,
      },
    });
  }



  export function useWishCrud(fn) {
    const queryClient = useQueryClient();
    return useMutation(fn, {
      onSuccess: (data) => {
        // toast.success(data?.data?.message);
        queryClient.invalidateQueries("getwish");
      },
      onError: (data) => {
        // toast.error(data?.message);
      },
    });
  }
  
  export function useWish(key, fn) {
    return useQuery(key, fn);
  }
  