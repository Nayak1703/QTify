import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";
import Tooltip from "@mui/material/Tooltip";

const Card = ({ img, chipData, title, altName, totalSongNum, artist }) => {
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };
  return (
    <Tooltip
      title={artist ? `${artist}` : `${totalSongNum} Songs`}
      placement="top"
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current.getBoundingClientRect().y,
              0,
              0
            );
          },
        },
      }}
    >
      <div className={styles.card} ref={areaRef} onMouseMove={handleMouseMove}>
        <div className={styles.cardMedia}>
          <img className={styles.cardImg} src={img} alt={altName} />
          <div className={styles.cardInfo}>
            <Chip
              label={artist ? `${chipData} Likes` : `${chipData} Follows`}
              size="small"
              className={styles.cardChip}
            />
          </div>
        </div>
        <p className={styles.cardTitle}>{title}</p>
      </div>
    </Tooltip>
  );
};

export default Card;
