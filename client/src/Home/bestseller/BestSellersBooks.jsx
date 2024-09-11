import React, { useEffect, useState } from "react";
import BookCards from "../bookcard/BookCards";
import { getBook } from "../../api";
import { Spinner } from "react-bootstrap";

const BestSellersBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBook();
        // Get only the first 10 books
        const bestSellers = response.data.slice(0, 10);
        setBooks(bestSellers);
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
      <BookCards books={books} headline={"Best Seller Books"} />
    </div>
  );
};

export default BestSellersBooks;
