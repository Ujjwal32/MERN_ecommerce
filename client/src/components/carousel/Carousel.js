import React from 'react'
import Slider from "react-slick";
import styles from './carousel.module.css'
import tshirt from '../../image/tshirt.jpg'
import hoodieBack from '../../image/hoodieBack.jpg'

function Carousel() {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        dotsClass: 'slick-dots dots',
      };

    return (
        <Slider {...settings}>
            <div className={styles.banner}>
            <div
              className={styles.img}
              style={{ backgroundImage: `url(${tshirt})` }}
            ></div>
          </div>
          <div className={styles.banner}>
            <div
              className={styles.img}
              style={{ backgroundImage: `url(${hoodieBack})` }}
            ></div>
          </div>
        </Slider>
    )
}

export default Carousel
