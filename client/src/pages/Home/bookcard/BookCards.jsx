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
            <Link to={`/book/${item._id}`}>
              <Col key={index} md={4} sm={6} xs={12} style={{ width: "23rem" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  // whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                >
                  <Card className="h-100 cart-card">
                    {/* <div className="shopping-icon">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        variant="light"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div> */}
                    <Link to={`/book/${item._id}`}>
                      <Card.Img
                        variant="top"
                        className="h-96"
                        src={item.imageUrl}
                      />
                    </Link>
                    <Card.Body className="text-black">
                      <Card.Title className="text-black mb-1">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="m-0 p-0">
                        <small className="text-muted">
                          by <b>{item.author}</b>
                        </small>
                      </Card.Text>
                      <Card.Text className="text-primary">
                        ${item.price}
                      </Card.Text>

                      <Link>
                        {" "}
                        <Button
                          className="explore-more-button w-full hover:bg-blue-1000"
                          variant="primary"
                        >
                          Buy Now{" "}
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
