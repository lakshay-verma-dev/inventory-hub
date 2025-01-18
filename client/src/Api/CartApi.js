import axios from "axios";

import { CART_API } from "./index.js";



const saveCart = async (cartData) => {
  return axios.post(`${CART_API}/save-cart`, { cartData });
};

const getCart = async (email) => {
  return axios.get(`${CART_API}/get-cart/${email}`);
};

export { saveCart,getCart}