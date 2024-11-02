import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Carousel.module.css";
import { Navigation } from "swiper/modules";
import Card from "../Card/Card";
import CarouselLeftBtn from "../CarouselLeftBtn/CarouselLeftBtn.jsx";
import CarouselRightBtn from "../CarouselRightBtn/CarouselRightBtn";

const Carousel = ({ albumData, albumType }) => {
  return (
    <Swiper
      modules={{ Navigation }}
      slidesPerView={"auto"}
      spaceBetween={40}
      allowTouchMove
      initialSlide={0}
    >
      <CarouselLeftBtn />
      <CarouselRightBtn />

      {albumData.map((song) => (
        <SwiperSlide key={song.id} className={styles.customSlideSize}>
          {albumType === "Songs" ? (
            <Card
              img={song.image}
              chipData={song.likes}
              title={song.title}
              altName={song.title}
              totalSongNum=""
              artist={
                song.artists.length > 1
                  ? song.artists.join(", ")
                  : song.artists[0]
              }
            />
          ) : (
            <Card
              img={song.image}
              chipData={song.follows}
              title={song.title}
              altName={song.slug}
              totalSongNum={song.songs.length}
              artist=""
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
    // </div>
  );
};

export default Carousel;
