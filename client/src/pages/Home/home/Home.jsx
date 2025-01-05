import React from "react";
import Banner from "../banner/Banner";
import FavoriteBook from "../favbook/FavoriteBook";
import BestSellersBooks from "../bestseller/BestSellersBooks";
import OthersBooks from "../OthersBooks";
import PromoBanner from "../promobanner/PromoBanner";
import ReviewSection from "../review/ReviewSection";

const Home = () => {
  return (
    <div
      // className="bg-gray-50"
    >
      <Banner />
      <BestSellersBooks />
      <FavoriteBook />
      <PromoBanner />
      <OthersBooks />
      <ReviewSection />
    </div>
  );
};

export default Home;
