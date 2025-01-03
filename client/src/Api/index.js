const API_BASE_URL = import.meta.env.VITE_API_URL;

const USER_API = `${API_BASE_URL}/auth`;
const BOOK_API = `${API_BASE_URL}/book`;

export { USER_API, BOOK_API };