import axios from "axios";

import { PAYMENT_API } from "./index.js";

const paymentSession = async (item) => {
  return axios.post(`${PAYMENT_API}/Payment-checkout`, item);
};
export {paymentSession}