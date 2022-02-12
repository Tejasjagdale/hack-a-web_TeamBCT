import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/carousel.css";

import { EffectFade, Navigation, Pagination } from "swiper";

const ItemViewer = () => {
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
						src="https://swiperjs.com/demos/images/nature-1.jpg"
						alt="dhfkolj"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://swiperjs.com/demos/images/nature-2.jpg"
						alt="dhfkolj"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://swiperjs.com/demos/images/nature-3.jpg"
						alt="dhfkolj"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://swiperjs.com/demos/images/nature-4.jpg"
						alt="dhfkolj"
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
};

export default ItemViewer;
