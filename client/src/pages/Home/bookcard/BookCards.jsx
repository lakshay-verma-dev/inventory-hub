import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BookCard.css";

const BookCards = ({ books, headline }) => {
   const truncateText = (text, maxLength) => {
     if (text.length > maxLength) {
       return text.slice(0, maxLength) + "...";
     }
     return text;
   };
  return (
    <div className="px-8">
      <h2 className="text-5xl text-center font-bold text-black py-8">
        {headline}
      </h2>
      <Swiper
        spaceBetween={8}
        navigation={true}
        pagination={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {books.map((item, index) => (
          <SwiperSlide key={item.id}>
            <Link to={`/book/${item.id}`}>
              <Col key={index} md={4} sm={6} xs={12} style={{ width: "23rem" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cart-card"
                >
                  <Card className="h-80 book-card-container">
                    {/* <div className="shopping-icon">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        variant="light"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div> */}
                    <Link to={`/book/${item.id}`}>
                      <Card.Img
                        variant="top"
                        className="h-96"
                        src={item.imageURL}
                      />
                    </Link>
                    <Card.Body className="text-black">
                      <Card.Title className="text-black mb-1">
                        {truncateText(item.title, 15)}
                      </Card.Title>
                      <Card.Text className="m-0 p-0">
                        <h4>
                          {" "}
                          By <b>{truncateText(item.author, 15)}</b>
                        </h4>
                      </Card.Text>
                      <Card.Text className="text-primary">
                        ${item.price}
                      </Card.Text>

                      <Link to={`/book/${item.id}`}>
                        <Button
                          className="explore-more-button w-full hover:bg-blue-1000 mt-0"
                          variant="primary"
                        >
                          Check Out
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCards;
