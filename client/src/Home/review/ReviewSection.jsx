import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// import "swiper/css/pagination";
// import "swiper/css/navigation";
import "swiper/css";
import profile from "./profile.jpg";
import { Avatar } from "flowbite-react";
import "./ReviewSection.css";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    review: "This platform is amazing! It can help me.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Data Scientist",
    review: "Great resource for connecting with like-minded individuals.",
    rating: 4,
  },
  {
    id: 3,
    name: "Alice Johnson",
    title: "Product Manager",
    review: "I love the flexibility and the user-friendly interface!",
    rating: 5,
  },
  {
    id: 4,
    name: "Alice Johnson",
    title: "Product Manager",
    review: "I love the flexibility and the user-friendly interface!",
    rating: 5,
  },
  {
    id: 5,
    name: "Alice Johnson",
    title: "Product Manager",
    review: "I love the flexibility and the user-friendly interface!",
    rating: 3,
  },
  {
    id: 6,
    name: "Alice Johnson",
    title: "Product Manager",
    review: "I love the flexibility and the user-friendly interface!",
    rating: 5,
  },
];

function ReviewSection() {
  return (
    <Container fluid className="review-section px-8">
      <Swiper
        spaceBetween={30}
        // slidesPerView={1}
        // slidesPerView={5}
        // cssMode={true}
        // navigation={true}
        pagination={true}
        mousewheel={true}
        // keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Card className="review-card">
              <Card.Body>
                <div className="review-stars flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} color="#ffc107" />
                  ))}
                </div>
                <Card.Text className="review-text mt-3">
                  {review.review}
                </Card.Text>
                <div className="reviewer-info flex gap-5 mt-3">
                  <Avatar
                    className="avatar-img"
                    img={profile}
                    alt="avatar of Jese"
                    rounded
                  />
                  <div>
                    <h5 className="reviewer-name font-semibold">
                      {review.name}
                    </h5>
                    <p className="reviewer-title">{review.title}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default ReviewSection;
