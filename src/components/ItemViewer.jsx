import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/carousel.css";

import { EffectFade, Navigation, Pagination } from "swiper";
import { EventContext } from "../pages/AuctionRoom";

const ItemViewer = (props) => {
	const [currentItem, setCurrentItem] = useContext(EventContext);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={currentItem ? currentItem.photos[0] : ""}
            alt="dhfkolj"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={currentItem ? currentItem.photos[1] : ""}
            alt="dhfkolj"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={currentItem ? currentItem.photos[2] : ""}
            alt="dhfkolj"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={currentItem ? currentItem.photos[3] : ""}
            alt="dhfkolj"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ItemViewer;
