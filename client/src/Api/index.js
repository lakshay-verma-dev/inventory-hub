const API_BASE_URL = import.meta.env.VITE_API_URL;

const USER_API = `${API_BASE_URL}/v1/api/auth`;
const BOOK_API = `${API_BASE_URL}/v1/api/book`;
const PAYMENT_API = `${API_BASE_URL}/v1/api/payment`;

export { USER_API, BOOK_API, PAYMENT_API };