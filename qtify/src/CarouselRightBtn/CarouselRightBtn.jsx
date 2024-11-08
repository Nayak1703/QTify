import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { ReactComponent as RightArrow } from "../assets/right-navigation.svg";
import styles from "./CarouselRightBtn.module.css";

const CarouselRightBtn = () => {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  useEffect(() => {
    swiper.on("slideChange", () => setIsEnd(swiper.isEnd));
  }, [swiper]);

  return (
    <div className={styles.rightArrowNav}>
      {!isEnd && (
        <RightArrow
          onClick={() => swiper.slideNext()}
          style={{ width: "27px", height: "27px" }}
        />
      )}
    </div>
  );
};

export default React.memo(CarouselRightBtn);
