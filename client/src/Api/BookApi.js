import axios from "axios";

import { BOOK_API } from ".";

const uploadBook = async (newbookdata) => {
  return axios.post(`${BOOK_API}/upload-book`, newbookdata);
};

const getBook = async () => {
  return axios.get(`${BOOK_API}/all-books`);
};

const deleteBook = async (id) => {
  return axios.delete(`${BOOK_API}/delete-book/${id}`);
};

const getsingleBook = async (id) => {
  return axios.get(`${BOOK_API}/single-book/${id}`);
};

const UpdateBook = async (id, updateData) => {
  return axios.patch(`${BOOK_API}/update-book/${id}`, updateData);
};

export { uploadBook, getBook, deleteBook, getsingleBook, UpdateBook };
