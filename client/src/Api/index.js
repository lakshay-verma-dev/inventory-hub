const API_BASE_URL = import.meta.env.VITE_API_URL;

const USER_API = `${API_BASE_URL}/auth`;
const BOOK_API = `${API_BASE_URL}/book`;
const CART_API = `${API_BASE_URL}/cart`;
const PAYMENT_API = `${API_BASE_URL}/payment`;

export { USER_API, BOOK_API,CART_API, PAYMENT_API };