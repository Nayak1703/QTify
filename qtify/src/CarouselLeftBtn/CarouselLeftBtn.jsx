import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ReactComponent as LeftArrow } from "../assets/left-navigation.svg";
import styles from "./CarouselLeftBtn.module.css";

const CarouselLeftBtn = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

  useEffect(() => {
    swiper.on("slideChange", () => setIsBeginning(swiper.isBeginning));
  }, [swiper]);

  return (
    <div className={styles.leftArrowNav}>
      {!isBeginning && (
        <LeftArrow
          onClick={() => swiper.slidePrev()}
          style={{ width: "27px", height: "27px" }}
        />
      )}
    </div>
  );
};

export default CarouselLeftBtn;
