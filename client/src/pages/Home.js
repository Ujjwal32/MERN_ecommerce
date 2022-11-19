import React from "react";
import Banner from "../components/Banner";
import Carousel from "../components/carousel/Carousel";
import CategoryOption from "../components/CategoryOption";
import Navigation from "../components/Navigation";
import Products from "../components/Products";
import sweatshirtBanner from "../image/Optimized-sweatshirt-banner.jpg";
import menImage from "../image/menCategory.webp";
import womenImage from "../image/womenCategory.webp";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

function Home() {
  const products = useSelector((state) => state.product.products);

  return (
    <>
      <Navigation />
      <Carousel />
      <CategoryOption
        left={{ image: menImage, title: "Men" }}
        right={{ image: womenImage, title: "Women" }}
      />
      <Banner title="Winter Shopping" image={sweatshirtBanner} />
      {products.length !== 0 ? (
        <Products products={products} title="Our Products" />
      ) : (
        <Skeleton number={8} />
      )}
      <Footer />
    </>
  );
}

export default Home;
