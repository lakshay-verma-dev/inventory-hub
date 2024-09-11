import React, { useEffect, useState } from "react";
import BookCards from "./bookcard/BookCards";
import { getBook } from "../api";
import { Spinner } from "react-bootstrap";

const OthersBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBook();
        // Get books starting from the 11th book (index 10) to the end
        const othersBooks = response.data.slice(10);
        setBooks(othersBooks);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return loading ? (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div>
      <BookCards books={books} headline={"Other Books"} />
    </div>
  );
};

export default OthersBooks;
